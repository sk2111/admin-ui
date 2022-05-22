//libs
import PropTypes from "prop-types";
import { useEffect } from "react";
//styles
import styles from "./ToastMessage.module.css";

const ToastMessage = ({ message, clearAfterMs, updateToastMessage }) => {
  useEffect(() => {
    const timerId = setTimeout(() => {
      updateToastMessage("");
    }, clearAfterMs);
    return () => clearTimeout(timerId);
  }, [clearAfterMs, updateToastMessage]);

  return <p className={styles.toast}>{message}</p>;
};

ToastMessage.propTypes = {
  message: PropTypes.string.isRequired,
  clearAfterMs: PropTypes.number.isRequired,
  updateToastMessage: PropTypes.func.isRequired,
};

export default ToastMessage;
