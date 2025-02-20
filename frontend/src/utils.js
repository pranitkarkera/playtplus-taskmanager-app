import { toast } from "react-toastify";

// Success toast with automatic closing after 1 second
export const handleSuccess = (msg) => {
  toast.success(msg, {
    position: "top-right",
    autoClose: 1000, // Closes after 1000 milliseconds (1 second)
  });
};

// Error toast with automatic closing after 1 second
export const handleError = (msg) => {
  toast.error(msg, {
    position: "top-right",
    autoClose: 1000, // Closes after 1000 milliseconds (1 second)
  });
};
