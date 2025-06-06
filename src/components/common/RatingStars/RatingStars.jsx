import Icon from "../Icon/Icon";
import styles from "./RatingStars.module.css";

const RatingStars = ({ rating = 0, size = "md", className = "" }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    stars.push(
      <Icon
        key={i}
        name="star"
        variant={i <= rating ? "filled" : "default"}
        size={size}
        color={i <= rating ? "var(--color-rating)" : "var(--color-gray-light)"}
      />
    );
  }

  return <div className={`${styles.stars} ${className}`}>{stars}</div>;
};

export default RatingStars;
