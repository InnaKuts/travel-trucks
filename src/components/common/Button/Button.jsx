import styles from "./Button.module.css";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  onClick,
  type = "button",
  ...props
}) => {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${styles[size]}`}
      onClick={onClick}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
