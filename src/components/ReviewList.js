import { Rating } from "./Rating";
import { ReviewForm } from "./ReviewForm";
import { useState } from "react";
import useTranslate from "../hooks/useTranslate";

function formatDate(value) {
  const date = new Date(value);
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
}

function ReviewListItem({ item, onDelete, onEdit }) {
  const handleDeleteClick = () => onDelete(item.id);
  const handleEditClick = () => onEdit(item.id);
  const t = useTranslate();
  //console.log(item);
  return (
    <div className="reviewListItem">
      <img className="reviewListItem-img" src={item.imgUrl} alt={item.title} />
      <div className="reviewListItem-content">
        <h1 className="review-title">{item.title}</h1>
        <Rating value={item.rating} className="review-stars" />
        <p className="review-date">{formatDate(item.createdAt)}</p>
        <p className="review-content">{item.content}</p>
        <div className="review-buttons">
          <button onClick={handleEditClick}>{t("edit button")}</button>
          <button onClick={handleDeleteClick}>{t("delete button")}</button>
        </div>
      </div>
    </div>
  );
}

function ReviewList({ items, onDelete, onUpdate, onUpdateSuccess }) {
  const [editingId, setEditingId] = useState(null);

  function handleCancel() {
    setEditingId(null);
  }

  return (
    <ul>
      {items.map((item) => {
        if (item.id === editingId) {
          const { id, title, rating, content, imgUrl } = item;
          const initialValues = { title, rating, content, imgUrl };
          const handleSubmit = (formData) => onUpdate(id, formData);
          const handleSubmitSuccess = (review) => {
            onUpdateSuccess(review);
            setEditingId(null);
          };
          return (
            <li key={item.id}>
              <ReviewForm
                initialValues={initialValues}
                initialPreview={imgUrl}
                onCancel={handleCancel}
                onSubmit={handleSubmit}
                onSubmitSuccess={handleSubmitSuccess}
                className="app-form"
              />
            </li>
          );
        }
        return (
          <li key={item.id}>
            <ReviewListItem
              item={item}
              onDelete={onDelete}
              onEdit={setEditingId}
            />
          </li>
        );
      })}
    </ul>
  );
}

export default ReviewList;
