import { useState } from "react";

export const ReviewForm = () => {
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleRatingChange = (e) => {
    const newRating = Number(e.target.value) || 0;
    setRating(newRating);
  };
  const handleContentChange = (e) => {
    setContent(e.target.value);
  };
  return (
    <form className="reviewForm">
      <input type="text" value={title} onChange={handleTitleChange} />
      <input type="number" value={rating} onChange={handleRatingChange} />
      <textarea value={content} onChange={handleContentChange} />
    </form>
  );
};
export default ReviewForm;
