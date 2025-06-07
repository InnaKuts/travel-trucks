import Icon from "../Icon/Icon";
import styles from "./Tag.module.css";

const Tag = ({ children, icon, className = "", ...props }) => {
  return (
    <span className={`${styles.tag} ${className}`} {...props}>
      {icon && <Icon name={icon} />}
      {children}
    </span>
  );
};

export default Tag;
