import Icon from "../../common/Icon/Icon";
import styles from "./ReviewSummary.module.css";

const ReviewSummary = ({
  rating,
  reviewCount,
  showLink = true,
  className = "",
}) => {
  return (
    <div className={`${styles.summary} ${className}`}>
      <Icon name="star" variant="filled" className={styles.star} />
      {showLink ? (
        <a href="#reviews" className={styles.link}>
          {rating} ({reviewCount} Reviews)
        </a>
      ) : (
        <span className={styles.count}>
          {rating} ({reviewCount} Reviews)
        </span>
      )}
    </div>
  );
};

export default ReviewSummary;
