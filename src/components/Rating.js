import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
const RATING = [1, 2, 3, 4, 5];

const Star = ({ selected = false, rating, onSelect, onHover }) => {
  const className = `rating-star ${selected ? "selected" : ""}`;
  const handleClick = onSelect ? () => onSelect(rating) : undefined;
  const handleMouseOver = onHover ? () => onHover(rating) : undefined;
  return (
    <span
      className={className}
      onClick={handleClick}
      onMouseOver={handleMouseOver}
    >
      <FontAwesomeIcon icon={faStar} />
    </span>
  );
};

export const Rating = ({
  value = 0,
  onSelect,
  onHover,
  onMouseOut,
  className = "",
}) => {
  return (
    <div onMouseOut={onMouseOut} className={className}>
      {RATING.map((rating) => (
        <Star
          key={rating}
          selected={value >= rating}
          rating={rating}
          onSelect={onSelect}
          onHover={onHover}
        />
      ))}
    </div>
  );
};

export default Rating;
