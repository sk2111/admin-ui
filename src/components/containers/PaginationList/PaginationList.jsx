//libs
import React from "react";
import PropTypes from "prop-types";
//css
import styles from "./PaginationList.module.css";
//components
import PaginationItem from "../PaginationItem/PaginationItem";
//constants
import { pagination } from "config/constants";

const {
  firstPageText,
  previousPageText,
  nextPageText,
  lastPageText,
  pageOffset,
  firstPage,
  state,
} = pagination;

const PaginationList = ({ currentPage, totalPages, handlePageChange }) => {
  const getBtnState = (page, matchClass = state.disabled) => {
    return currentPage === page ? matchClass : state.none;
  };

  const getPaginationItems = () => {
    return Array.from(Array(totalPages).keys()).map((idx) => {
      const pageNumber = idx + pageOffset;
      return (
        <PaginationItem
          key={pageNumber}
          state={getBtnState(pageNumber, state.active)}
          handleClick={() => handlePageChange(pageNumber)}
        >
          {pageNumber}
        </PaginationItem>
      );
    });
  };

  return (
    <ul className={styles.list}>
      <PaginationItem
        state={getBtnState(firstPage)}
        handleClick={() => handlePageChange(pageOffset)}
      >
        {firstPageText}
      </PaginationItem>
      <PaginationItem
        state={getBtnState(firstPage)}
        handleClick={() => handlePageChange(currentPage - pageOffset)}
      >
        {previousPageText}
      </PaginationItem>
      {getPaginationItems()}
      <PaginationItem
        state={getBtnState(totalPages)}
        handleClick={() => handlePageChange(currentPage + pageOffset)}
      >
        {nextPageText}
      </PaginationItem>
      <PaginationItem
        state={getBtnState(totalPages)}
        handleClick={() => handlePageChange(totalPages)}
      >
        {lastPageText}
      </PaginationItem>
    </ul>
  );
};

PaginationList.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  handlePageChange: PropTypes.func.isRequired,
};

export default PaginationList;
