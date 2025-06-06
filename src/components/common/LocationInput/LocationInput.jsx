import { useState } from "react";
import Icon from "../Icon/Icon";
import styles from "./LocationInput.module.css";

const LocationInput = ({
  value,
  onChange,
  placeholder = "City",
  className = "",
  ...props
}) => {
  const [focused, setFocused] = useState(false);

  const handleChange = (e) => {
    if (onChange) {
      onChange(e);
    }
  };

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  // Check if input has a value
  const hasValue = value && value.trim() !== "";

  return (
    <div className={`${styles.locationInput} ${className}`}>
      <div className={styles.inputContainer}>
        <Icon
          name="map"
          size="sm"
          className={`${styles.icon} ${
            hasValue ? styles.iconActive : styles.iconPlaceholder
          }`}
        />
        <input
          type="text"
          value={value || ""}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          className={`${styles.input} ${focused ? styles.focused : ""}`}
          {...props}
        />
      </div>
    </div>
  );
};

export default LocationInput;
