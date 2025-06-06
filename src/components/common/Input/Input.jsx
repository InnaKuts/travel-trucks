import styles from "./Input.module.css";

const Input = ({
  type = "text",
  placeholder,
  value,
  onChange,
  multiline = false,
  rows = 4,
  className = "",
  ...props
}) => {
  const Component = multiline ? "textarea" : "input";

  return (
    <Component
      className={`${styles.input} ${className}`}
      type={multiline ? undefined : type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows={multiline ? rows : undefined}
      {...props}
    />
  );
};

export default Input;
