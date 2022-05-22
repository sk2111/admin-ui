//libs
import PropTypes from "prop-types";
import { useEffect } from "react";
//styles
import styles from "./ToastMessage.module.css";

const ToastMessage = ({ message, clearAfterMs, updateToastMessage }) => {
  useEffect(() => {
    const timerId = setTimeout(() => {
      if (message.trim()) {
        updateToastMessage("");
      }
    }, clearAfterMs);
    return () => clearTimeout(timerId);
  }, [message, clearAfterMs, updateToastMessage]);

  return <p className={styles.toast}>{message}</p>;
};

ToastMessage.propTypes = {
  message: PropTypes.string.isRequired,
  clearAfterMs: PropTypes.number.isRequired,
  updateToastMessage: PropTypes.func.isRequired,
};

export default ToastMessage;
