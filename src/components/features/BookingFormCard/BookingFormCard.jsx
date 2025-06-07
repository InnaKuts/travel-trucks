import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useEffect } from "react";
import Input from "../../common/Input/Input";
import DatePicker from "../../composite/DatePicker/DatePicker";
import Button from "../../common/Button/Button";
import styles from "./BookingFormCard.module.css";

const BookingFormCard = ({ onSubmit, className = "" }) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      bookingDate: null,
      comment: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .trim()
        .min(2, "Name must be at least 2 characters")
        .required("Name is required"),
      email: Yup.string()
        .email("Please enter a valid email address")
        .required("Email is required"),
      bookingDate: Yup.date()
        .nullable()
        .required("Booking date is required")
        .min(new Date(), "Booking date cannot be in the past"),
      comment: Yup.string().trim(),
    }),
    onSubmit: (values, { setSubmitting, resetForm }) => {
      toast.dismiss();
      try {
        onSubmit?.(values);
        toast.success("Booking request sent successfully!");
        resetForm();
      } catch (error) {
        toast.error(
          error.message || "Failed to send booking request. Please try again."
        );
      } finally {
        setSubmitting(false);
      }
    },
    validateOnBlur: false,
    validateOnChange: false,
  });

  useEffect(() => {
    const errors = Object.values(formik.errors);
    if (errors.length > 0) {
      toast.dismiss();
      toast.error(errors[0]);
    }
  }, [formik.errors]);

  const handleDateChange = (date) => {
    formik.setFieldValue("bookingDate", date);
  };

  return (
    <div className={`${styles.card} ${className}`}>
      <div className={styles.header}>
        <h3 className={styles.title}>Book your campervan now</h3>
        <p className={styles.subtitle}>
          Stay connected! We are always ready to help you.
        </p>
      </div>

      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <div className={styles.inputs}>
          <Input
            name="name"
            placeholder="Name*"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          <Input
            name="email"
            type="email"
            placeholder="Email*"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          <DatePicker
            placeholder="Booking date*"
            selectedDate={formik.values.bookingDate}
            onDateChange={handleDateChange}
          />

          <Input
            name="comment"
            placeholder="Comment"
            multiline
            rows={4}
            value={formik.values.comment}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>

        <Button type="submit" variant="primary" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? "Sending..." : "Send"}
        </Button>
      </form>
    </div>
  );
};

export default BookingFormCard;
