import { useState } from "react";
import { FileInput } from "./FileInput";
import useAsync from "../hooks/useAsync";
import { RatingInput } from "./RatingInput";
import useTranslate from "../hooks/useTranslate";

const INITIAL_VALUES = {
  title: "",
  rating: 0,
  content: "",
  imgFile: null,
};

export const ReviewForm = ({
  initialValues = INITIAL_VALUES,
  initialPreview = "",
  onSubmitSuccess,
  onCancel,
  onSubmit,
  className = "",
}) => {
  const [istSubmitting, submitError, onSubmitAsync] = useAsync(onSubmit);

  const [values, setValues] = useState(initialValues);
  const t = useTranslate();
  const handleChange = (name, value) => {
    setValues((current) => ({
      ...current,
      [name]: value,
    }));
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("rating", values.rating);
    formData.append("content", values.content);
    formData.append("imgFile", values.imgFile);

    let result = await onSubmitAsync(formData);
    if (!result) return;

    const { review } = result;
    onSubmitSuccess(review);
    setValues(INITIAL_VALUES);
  };

  return (
    <form className={className} onSubmit={handleOnSubmit}>
      <div className="app-form__imgFile">
        <FileInput
          onChange={handleChange}
          name="imgFile"
          value={values.imgFile}
          initialPreview={initialPreview}
        />
      </div>
      <div className="app-form__input">
        <div className="app-form__titleRating">
          <input
            name="title"
            type="text"
            value={values.title}
            onChange={handleInputChange}
            placeholder="제목을 입력하세요"
          />
          <RatingInput
            name="rating"
            value={values.rating}
            onChange={handleChange}
          />
        </div>
        <textarea
          name="content"
          value={values.content}
          onChange={handleInputChange}
          className="app-form__textarea"
          placeholder="내용을 입력해주세요"
          cols="33"
          rows="10"
        />
        <div className="app-form__btn">
          <button type="submit" disabled={istSubmitting}>
            {t("confirm button")}
          </button>
        </div>
      </div>

      {onCancel && (
        <button className="cancel-button" onClick={onCancel}>
          {t("cancel button")}
        </button>
      )}
      {submitError?.message && <div>{submitError.message}</div>}
    </form>
  );
};
export default ReviewForm;
