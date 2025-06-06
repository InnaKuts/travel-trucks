import RatingStars from "../RatingStars/RatingStars";
import styles from "./ReviewCard.module.css";

const ReviewCard = ({ reviewerName, rating, comment, className = "" }) => {
  // Get first letter of name for avatar
  const avatarInitial = reviewerName
    ? reviewerName.charAt(0).toUpperCase()
    : "?";

  return (
    <div className={`${styles.card} ${className}`}>
      <div className={styles.header}>
        <div className={styles.avatar}>{avatarInitial}</div>
        <div className={styles.reviewerInfo}>
          <h4 className={styles.name}>{reviewerName}</h4>
          <RatingStars rating={rating} size="sm" />
        </div>
      </div>
      <p className={styles.comment}>{comment}</p>
    </div>
  );
};

export default ReviewCard;
