import { useState } from "react";
import { FileInput } from "./FileInput";
import { RatingInput } from "./RatingInput";

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
}) => {
  const [istSubmitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [values, setValues] = useState(initialValues);
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

    let result;

    try {
      setSubmitting(true);
      setSubmitError(null);
      result = await onSubmit(formData);
    } catch (e) {
      setSubmitError(e);
      return;
    } finally {
      setSubmitting(false);
    }
    const { review } = result;
    onSubmitSuccess(review);
    setValues(INITIAL_VALUES);
  };

  return (
    <form className="reviewForm" onSubmit={handleOnSubmit}>
      <FileInput
        onChange={handleChange}
        name="imgFile"
        value={values.imgFile}
        initialPreview={initialPreview}
      />
      <input
        name="title"
        type="text"
        value={values.title}
        onChange={handleInputChange}
      />
      <RatingInput
        name="rating"
        value={values.rating}
        onChange={handleChange}
      />
      <textarea
        name="content"
        value={values.content}
        onChange={handleInputChange}
      />
      <button type="submit" disabled={istSubmitting}>
        제출
      </button>
      {onCancel && <button onClick={onCancel}>취소</button>}
      {submitError?.message && <div>{submitError.message}</div>}
    </form>
  );
};
export default ReviewForm;
