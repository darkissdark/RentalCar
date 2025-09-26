import { useEffect, useRef } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import styles from "./DatePicker.module.css";

interface DatePickerProps {
  value: string;
  onChange: (isoDate: string) => void;
  error?: boolean;
  disabled?: boolean;
  placeholder?: string;
}

const DatePicker = ({
  value,
  onChange,
  error,
  disabled,
  placeholder,
}: DatePickerProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const fpRef = useRef<flatpickr.Instance | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      fpRef.current = flatpickr(inputRef.current, {
        dateFormat: "d.m.Y",
        minDate: "today",
        disableMobile: true,
        allowInput: false,
        clickOpens: true,
        animate: false,
        onChange: (selectedDates) => {
          const isoDate = selectedDates[0]
            ? selectedDates[0].toISOString().split("T")[0]
            : "";
          onChange(isoDate);
        },
        onOpen: () => {
          const calendarContainer = document.querySelector(
            ".flatpickr-calendar"
          );
          if (calendarContainer) {
            calendarContainer.classList.add(styles.customFlatpickr);
          }
        },
      });
    }

    return () => {
      if (fpRef.current) fpRef.current.destroy();
    };
  }, [onChange]);

  return (
    <input
      ref={inputRef}
      type="text"
      value={value}
      readOnly
      placeholder={placeholder}
      disabled={disabled}
      className={`${styles.dateInput} ${error ? styles.inputError : ""}`}
    />
  );
};

export default DatePicker;
