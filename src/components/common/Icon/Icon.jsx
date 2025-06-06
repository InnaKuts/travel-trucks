import styles from "./Icon.module.css";

const Icon = ({
  name,
  variant = "default",
  size = "md",
  color,
  className = "",
  ...props
}) => {
  const getIconId = (iconName, iconVariant) => {
    if (iconName === "star") {
      return `icon-star-${iconVariant === "filled" ? "pressed" : "default"}`;
    }
    if (iconName === "heart" || iconName === "fav") {
      return `icon-fav-${iconVariant === "filled" ? "pressed" : "default"}`;
    }
    return `icon-${iconName}`;
  };

  const iconId = getIconId(name, variant);

  return (
    <svg
      className={`${styles.icon} ${styles[size]} ${className}`}
      style={color ? { color } : {}}
      {...props}
    >
      <use href={`/icons.svg#${iconId}`} />
    </svg>
  );
};

export default Icon;
