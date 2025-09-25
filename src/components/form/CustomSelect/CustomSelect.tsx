import { useState } from "react";
import styles from "./CustomSelect.module.css";

interface CustomSelectProps {
  options: string[];
  placeholder?: string;
  textBeforeValue?: string;
  onChange?: (value: string) => void;
}

export default function CustomSelect({
  options,
  placeholder = "Choose a option",
  textBeforeValue,
  onChange,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleToggle = () => setIsOpen((prev) => !prev);

  const handleClose = () => setIsOpen(false);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    handleClose();
    if (onChange) {
      onChange(option);
    }
  };

  return (
    <div
      className={styles.wrapper}
      tabIndex={0}
      onBlur={handleClose}
      aria-haspopup="listbox"
      aria-expanded={isOpen}
    >
      <div className={styles.select} onClick={handleToggle}>
        <span className={styles.value}>
          {textBeforeValue && selectedOption && <>{textBeforeValue}</>}
          {selectedOption || placeholder}
        </span>

        <svg
          width="16"
          height="16"
          className={`${styles.arrow} ${isOpen ? styles.open : ""}`}
        >
          <use xlinkHref="/src/assets/sprite.svg#icon-chevron-down"></use>
        </svg>
      </div>

      {isOpen && (
        <div className={styles.options}>
          <ul className={styles.scrollBar} role="listbox">
            {options.map((option) => (
              <li
                key={option}
                role="option"
                aria-selected={selectedOption === option}
                className={`${styles.option} ${
                  selectedOption === option ? styles.selected : ""
                }`}
                onClick={() => handleSelect(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
