import { useState } from "react";
import { FileInput } from "./FileInput";
import { RatingInput } from "./RatingInput";
export const ReviewForm = () => {
  const [values, setValues] = useState({
    title: "",
    rating: 0,
    content: "",
    imgFile: null,
  });
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

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };

  return (
    <form className="reviewForm" onSubmit={handleOnSubmit}>
      <FileInput
        onChange={handleChange}
        name="imgFile"
        value={values.imgFile}
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
      <button type="submit">제출</button>
    </form>
  );
};
export default ReviewForm;
