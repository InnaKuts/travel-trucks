import styles from "./Button.module.css";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  onClick,
  type = "button",
  className = "",
  ...props
}) => {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${styles[size]} ${className}`}
      onClick={onClick}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
