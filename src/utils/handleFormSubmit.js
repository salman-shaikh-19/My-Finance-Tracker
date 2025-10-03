import { toast } from "react-toastify";

export const handleFormSubmit = ({
  action,
  payload,
  resetForm,
  setSubmitting,
  modalRef,
  successMessage = "Operation successful",
  errorMessage = "Error occurred",
}) => {
  action(payload)
    .then(() => {
      toast.success(successMessage);
      if (resetForm) resetForm();
      if (modalRef?.current) modalRef.current.close();
    })
    .catch((err) => {
      toast.error(`${errorMessage}: ${err}`);
    })
    .finally(() => setSubmitting(false));
};
