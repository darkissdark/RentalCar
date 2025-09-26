import { useState } from "react";
import styles from "./BookingForm.module.css";
import Button from "../../../../components/ui/Button/Button";

interface BookingFormProps {
  carId: string;
}

interface BookingFormData {
  name: string;
  email: string;
  bookingDate: string;
  comment: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SUCCESS_MESSAGE_DURATION = 7000;

export default function BookingForm({ carId }: BookingFormProps) {
  const [formData, setFormData] = useState<BookingFormData>({
    name: "",
    email: "",
    bookingDate: "",
    comment: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<BookingFormData>>({});
  const [showBookingSuccess, setShowBookingSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<BookingFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!EMAIL_REGEX.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.bookingDate) {
      newErrors.bookingDate = "Booking date is required";
    } else {
      const selectedDate = new Date(formData.bookingDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        newErrors.bookingDate = "Booking date cannot be in the past";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof BookingFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Booking submitted:", {
        carId,
        ...formData,
      });

      setFormData({
        name: "",
        email: "",
        bookingDate: "",
        comment: "",
      });

      setShowBookingSuccess(true);
      setTimeout(() => setShowBookingSuccess(false), SUCCESS_MESSAGE_DURATION);
    } catch (error) {
      console.error("Failed to submit booking:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.bookingFormContainer}>
      <div className={styles.bookingFormHeader}>
        <h2 className={styles.bookingFormTitle}>Book your car now</h2>
        <p className={styles.bookingFormSubtitle}>
          Stay connected! We are always ready to help you.
        </p>
      </div>

      <form onSubmit={handleSubmit} className={styles.bookingForm}>
        <div className={styles.formGroup}>
          <input
            type="text"
            name="name"
            placeholder="Name*"
            value={formData.name}
            onChange={handleInputChange}
            className={`${styles.formInput} ${
              errors.name ? styles.inputError : ""
            }`}
            disabled={isSubmitting}
          />
          {errors.name && (
            <span className={styles.errorMessage}>{errors.name}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <input
            type="email"
            name="email"
            placeholder="Email*"
            value={formData.email}
            onChange={handleInputChange}
            className={`${styles.formInput} ${
              errors.email ? styles.inputError : ""
            }`}
            disabled={isSubmitting}
          />
          {errors.email && (
            <span className={styles.errorMessage}>{errors.email}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <input
            type="date"
            name="bookingDate"
            value={formData.bookingDate}
            onChange={handleInputChange}
            className={`${styles.formInput} ${
              errors.bookingDate ? styles.inputError : ""
            }`}
            disabled={isSubmitting}
          />
          {errors.bookingDate && (
            <span className={styles.errorMessage}>{errors.bookingDate}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <textarea
            name="comment"
            placeholder="Comment"
            value={formData.comment}
            onChange={handleInputChange}
            className={`${styles.formTextarea} ${
              errors.comment ? styles.inputError : ""
            }`}
            rows={4}
            disabled={isSubmitting}
          />
          {errors.comment && (
            <span className={styles.errorMessage}>{errors.comment}</span>
          )}
        </div>
        {showBookingSuccess ? (
          <div className={styles.successMessage}>
            Booking successful! We will contact you soon.
          </div>
        ) : (
          <Button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send"}
          </Button>
        )}
      </form>
    </div>
  );
}
