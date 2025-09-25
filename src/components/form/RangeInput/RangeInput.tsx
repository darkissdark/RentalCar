import { useState, useEffect } from "react";
import styles from "./RangeInput.module.css";
import { formatThousandsSeparator } from "../../../utils/formatters";

interface RangeInputProps {
  fromLabel?: string;
  toLabel?: string;
  initialFrom?: number;
  initialTo?: number;
  onChange?: (range: { from: number | null; to: number | null }) => void;
}

const MIN_VALUE = 1;
const MAX_VALUE = 999999;

const displayValue = (value: number | null) =>
  value !== null ? formatThousandsSeparator(value, ",") : "";

export default function RangeInput({
  fromLabel = "From",
  toLabel = "To",
  initialFrom,
  initialTo,
  onChange,
}: RangeInputProps) {
  const [from, setFrom] = useState<number | null>(
    initialFrom && initialFrom >= MIN_VALUE ? initialFrom : null
  );
  const [to, setTo] = useState<number | null>(
    initialTo && initialTo >= MIN_VALUE ? initialTo : null
  );

  const [fromDisplay, setFromDisplay] = useState<string>("");
  const [toDisplay, setToDisplay] = useState<string>("");

  const [isError, setIsError] = useState<string>("");

  useEffect(() => {
    setFromDisplay(displayValue(from));
  }, [from]);

  useEffect(() => {
    setToDisplay(displayValue(to));
  }, [to]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "from" | "to"
  ) => {
    const inputValue = e.target.value;

    if (!/^[\d,]*$/.test(inputValue)) return;

    const raw = inputValue.replace(/,/g, "");

    if (raw === "") {
      if (type === "from") {
        setFrom(null);
        setFromDisplay("");
        onChange?.({ from: null, to });
      } else {
        setTo(null);
        setToDisplay("");
        onChange?.({ from, to: null });
      }
      return;
    }

    if (!/^\d+$/.test(raw)) return;

    const numValue = Number(raw);
    if (numValue < MIN_VALUE || numValue > MAX_VALUE) return;

    if (type === "from") {
      setFrom(numValue);
      setFromDisplay(inputValue);
      onChange?.({ from: numValue, to });
    } else {
      setTo(numValue);
      setToDisplay(inputValue);
      onChange?.({ from, to: numValue });
    }
  };

  const handleBlur = (type: "from" | "to") => {
    if (type === "from" && from && to && from >= to) {
      setIsError("The 'from' value must be less than the 'to' value");
    } else if (type === "to" && from && to && to <= from) {
      setIsError("The 'to' value must be greater than the 'from' value");
    } else {
      setIsError("");
    }
  };

  return (
    <div className={styles.wrapper}>
      <label
        className={`${styles.inputWrapper} ${isError ? styles.error : ""}`}
      >
        <span className={styles.label}>{fromLabel}</span>
        <input
          type="text"
          name="from"
          value={fromDisplay}
          onChange={(e) => handleChange(e, "from")}
          onBlur={() => handleBlur("from")}
          className={styles.input}
          inputMode="numeric"
          autoComplete="off"
        />
      </label>

      <label
        className={`${styles.inputWrapper} ${isError ? styles.error : ""}`}
      >
        <span className={styles.label}>{toLabel}</span>
        <input
          type="text"
          name="to"
          value={toDisplay}
          onChange={(e) => handleChange(e, "to")}
          onBlur={() => handleBlur("to")}
          className={styles.input}
          inputMode="numeric"
          autoComplete="off"
        />
      </label>
      {isError && <span className={styles.errorText}>{isError}</span>}
    </div>
  );
}
