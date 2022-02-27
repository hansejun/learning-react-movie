import ReviewList from "./ReviewList";
import { useState, useEffect } from "react";
import getReviews, { createReview, deleteReview, updateReview } from "./api";
import ReviewForm from "./ReviewForm";
import useAsync from "../hooks/useAsync";
import LocaleSelect from "./LocaleSelect";
import { LocaleProvider } from "../ contexts/LocaleContext";

const LIMIT = 6;

function App() {
  const [order, setOrder] = useState("createdAt");
  const [items, setItems] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [isLoading, loadingError, getReviewsAsync] = useAsync(getReviews);
  const sortedItems = items.sort((a, b) => b[order] - a[order]);

  const handleRecentlyClick = () => {
    setOrder("createdAt");
  };

  const handleBestClick = () => setOrder("rating");

  const handleDelete = async (id) => {
    const result = await deleteReview(id);
    if (!result) return;
    setItems((current) => current.filter((item) => item.id !== id));
  };

  const handleLoad = async (options) => {
    let result = await getReviewsAsync(options);
    if (!result) return;

    const { reviews, paging } = result;
    if (options.offset === 0) {
      setItems(reviews);
    } else {
      setItems([...items, ...reviews]);
    }
    setOffset((current) => current + options.limit);
    setHasNext(paging.hasNext);
  };

  const handleLoadMore = () => {
    handleLoad({ order, offset, limit: LIMIT });
  };

  const handleCreateSuccess = (review) => {
    setItems((current) => [review, ...current]);
  };

  const handleUpdateSuccess = (review) => {
    setItems((current) => {
      const splitIndex = current.findIndex((item) => item.id === review.id);
      return [
        ...current.slice(0, splitIndex),
        review,
        ...current.slice(splitIndex + 1),
      ];
    });
  };

  useEffect(() => {
    handleLoad({ order, offset: 0, limit: LIMIT });
  }, [order]);

  return (
    <LocaleProvider defaultValue="ko">
      <div className="app-main">
        <header className="app-header">
          <div className="app-header__title">
            <span>MOVIE</span>
            <span>MORE</span>
          </div>
          <div>
            <LocaleSelect className="app-header__selector" />
          </div>
        </header>
        <div className="app-formContainer">
          <ReviewForm
            onSubmit={createReview}
            onSubmitSuccess={handleCreateSuccess}
            className="app-form"
          />
        </div>

        <div className="app-buttons">
          {order === "createdAt" ? (
            <button
              onClick={handleRecentlyClick}
              className="app-buttons__recently black-button"
            >
              최신순
            </button>
          ) : (
            <button
              onClick={handleRecentlyClick}
              className="app-buttons__recently"
            >
              최신순
            </button>
          )}

          {order === "rating" ? (
            <button
              onClick={handleBestClick}
              className="app-buttons__best black-button"
            >
              평점순
            </button>
          ) : (
            <button onClick={handleBestClick} className="app-buttons__best">
              평점순
            </button>
          )}
        </div>
        <div className="app-content">
          <ReviewList
            items={sortedItems}
            onDelete={handleDelete}
            onUpdate={updateReview}
            onUpdateSuccess={handleUpdateSuccess}
          />
          {hasNext && (
            <div className="app-content__more">
              <button disabled={isLoading} onClick={handleLoadMore}>
                더보기
              </button>
            </div>
          )}
        </div>

        {loadingError?.message && <span>{loadingError.message}</span>}
      </div>
    </LocaleProvider>
  );
}
export default App;
