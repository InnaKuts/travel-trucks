import Icon from "../Icon/Icon";
import styles from "./Favourite.module.css";

const Favourite = ({
  isActive = false,
  onClick,
  size = "md",
  className = "",
  ...props
}) => {
  return (
    <button
      className={`${styles.favourite} ${
        isActive ? styles.active : ""
      } ${className}`}
      onClick={onClick}
      type="button"
      {...props}
    >
      <Icon
        name="heart"
        variant={isActive ? "filled" : "default"}
        size={size}
      />
    </button>
  );
};

export default Favourite;
