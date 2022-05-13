//libs
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
//styles
import styles from "./SearchBar.module.css";
//hooks
import useDebounce from "hooks/useDebounce";

const SearchBar = ({ placeholder, debounceTimeInMs, value, handleChange }) => {
  const [searchTerm, setSearchTerm] = useState(value);
  const debouncedSearchTerm = useDebounce(searchTerm, debounceTimeInMs);

  useEffect(() => {
    if (debouncedSearchTerm !== value) {
      handleChange(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, value, handleChange]);

  return (
    <input
      aria-label={placeholder}
      className={styles.search}
      type="text"
      placeholder={placeholder}
      value={searchTerm}
      onChange={({ target }) => setSearchTerm(target.value)}
    />
  );
};

SearchBar.propTypes = {
  placeholder: PropTypes.string.isRequired,
  debounceTimeInMs: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default SearchBar;
