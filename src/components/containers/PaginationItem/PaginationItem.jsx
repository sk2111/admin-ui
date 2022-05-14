//libs
import React from "react";
import PropTypes from "prop-types";
//css
import styles from "./PaginationItem.module.css";

const PaginationItem = ({ children, state, handleClick }) => {
  const btnClass = `${styles.button} ${styles[state]}`;

  return (
    <li className={styles.item} onClick={handleClick}>
      <button className={btnClass}>{children}</button>
    </li>
  );
};

PaginationItem.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  state: PropTypes.string,
  handleClick: PropTypes.func.isRequired,
};

export default PaginationItem;
