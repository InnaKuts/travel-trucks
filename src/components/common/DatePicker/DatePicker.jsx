import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import styles from "./DatePicker.module.css";

const DatePicker = ({
  value,
  onChange,
  placeholder = "Booking date*",
  className = "",
  minDate,
  ...props
}) => {
  const [focused, setFocused] = useState(false);
  const [inputType, setInputType] = useState("text");
  const [showCalendar, setShowCalendar] = useState(false);

  const handleChange = (e) => {
    if (onChange) {
      onChange(e);
    }
  };

  const handleFocus = () => {
    setFocused(true);
    setShowCalendar(true);
  };

  const handleBlur = (e) => {
    // Don't close if clicking inside calendar
    if (e.relatedTarget && e.relatedTarget.closest(`.${styles.calendar}`)) {
      return;
    }
    setFocused(false);
    setShowCalendar(false);
    if (!value) {
      setInputType("text");
    }
  };

  const handleDateSelect = (date) => {
    if (date) {
      const dateString = date.toISOString().split("T")[0];
      const event = {
        target: {
          value: dateString,
        },
      };
      handleChange(event);
      setShowCalendar(false);
      setFocused(false);
    }
  };

  const today = new Date();
  const minDateObj = minDate ? new Date(minDate) : today;
  const selectedDate = value ? new Date(value) : undefined;

  // Check if input has a value
  const hasValue = value && value !== "";

  // Format display value for text input
  const displayValue =
    hasValue && inputType === "text"
      ? new Date(value).toLocaleDateString()
      : value || "";

  return (
    <div className={`${styles.datePicker} ${className}`}>
      <input
        type={inputType}
        value={inputType === "date" ? value || "" : displayValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        min={
          inputType === "date"
            ? minDate || today.toISOString().split("T")[0]
            : undefined
        }
        placeholder={inputType === "text" ? placeholder : undefined}
        className={`${styles.input} ${focused ? styles.focused : ""}`}
        readOnly={inputType === "text" && !focused}
        {...props}
      />
      {showCalendar && (
        <div
          className={styles.calendar}
          onMouseDown={(e) => e.preventDefault()}
        >
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            disabled={{ before: minDateObj }}
            showOutsideDays
          />
        </div>
      )}
    </div>
  );
};

export default DatePicker;
