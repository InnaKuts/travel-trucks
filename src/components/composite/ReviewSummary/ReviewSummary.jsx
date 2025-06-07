import Icon from "../../common/Icon/Icon";
import styles from "./ReviewSummary.module.css";

const ReviewSummary = ({
  rating,
  reviewCount,
  showLink = true,
  onReviewsClick,
  className = "",
}) => {
  return (
    <div className={`${styles.summary} ${className}`}>
      <Icon name="star" variant="filled" className={styles.star} />
      {showLink ? (
        <button type="button" className={styles.link} onClick={onReviewsClick}>
          {rating} ({reviewCount} Reviews)
        </button>
      ) : (
        <span className={styles.count}>
          {rating} ({reviewCount} Reviews)
        </span>
      )}
    </div>
  );
};

export default ReviewSummary;
