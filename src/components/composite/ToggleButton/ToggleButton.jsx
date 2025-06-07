import Icon from "../../common/Icon/Icon";
import styles from "./ToggleButton.module.css";

const ToggleButton = ({
  children,
  isSelected = false,
  onClick,
  icon,
  className = "",
  ...props
}) => {
  return (
    <button
      className={`${styles.button} ${
        isSelected ? styles.selected : ""
      } ${className}`}
      onClick={onClick}
      type="button"
      {...props}
    >
      <div className={styles.content}>
        {icon && <Icon name={icon} size="lg" />}
        <span className={styles.text}>{children}</span>
      </div>
    </button>
  );
};

export default ToggleButton;
