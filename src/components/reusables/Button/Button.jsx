//libs
import React from "react";
import PropTypes from "prop-types";
//css
import styles from "./Button.module.css";

export const buttonThemes = {
  danger: "danger",
  dangerDisabled: "dangerDisabled",
};

const Button = ({ children, theme, handleClick }) => {
  return (
    <button
      aria-label={children}
      className={styles.button}
      data-theme={theme}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.element,
  ]).isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Button;
