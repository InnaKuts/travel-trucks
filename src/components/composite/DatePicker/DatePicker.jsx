import { useState, useRef } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import styles from "./DatePicker.module.css";

const DatePicker = ({
  selectedDate,
  onDateChange,
  placeholder = "Booking date*",
  className = "",
  ...props
}) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const inputRef = useRef(null);

  const handleFocus = () => {
    setShowCalendar(true);
  };

  const handleBlur = (e) => {
    if (e.relatedTarget && e.relatedTarget.closest(`.${styles.calendar}`)) {
      return;
    }
    setShowCalendar(false);
  };

  const handleDateSelect = (date) => {
    if (date) {
      onDateChange?.(date);
      setShowCalendar(false);
      inputRef.current?.blur();
    }
  };

  const today = new Date();
  const value = selectedDate ? selectedDate.toLocaleDateString() : "";

  return (
    <div className={`${styles.datePicker} ${className}`}>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onFocus={handleFocus}
        onBlur={handleBlur}
        min={today}
        placeholder={placeholder}
        className={`${styles.input}`}
        readOnly={true}
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
            disabled={{ before: today }}
            showOutsideDays
            weekStartsOn={1}
            navLayout="around"
            formatters={{
              formatWeekdayName: (date) => {
                const weekdays = [
                  "SUN",
                  "MON",
                  "TUE",
                  "WED",
                  "THU",
                  "FRI",
                  "SAT",
                ];
                return weekdays[date.getDay()];
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default DatePicker;
