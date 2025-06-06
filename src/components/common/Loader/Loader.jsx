import { ClipLoader } from "react-spinners";
import styles from "./Loader.module.css";

const Loader = ({
  size = 40,
  color = "var(--color-button)",
  loading = true,
  text = "",
  className = "",
}) => {
  if (!loading) return null;

  return (
    <div className={`${styles.loader} ${className}`}>
      <ClipLoader
        loading={loading}
        size={size}
        color={color}
        aria-label="Loading"
        data-testid="loader"
      />
      {text && <p className={styles.text}>{text}</p>}
    </div>
  );
};

export default Loader;
