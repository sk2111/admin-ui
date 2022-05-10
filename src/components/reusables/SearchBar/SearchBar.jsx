//libs
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
//styles
import styles from "./SearchBar.module.css";
//hooks
import useDebounce from "hooks/useDebounce";

const SearchBar = ({
  id,
  placeholder,
  debounceTimeInMs,
  value,
  handleChange,
}) => {
  const [searchTerm, setSearchTerm] = useState(value);
  const debouncedSearchTerm = useDebounce(searchTerm, debounceTimeInMs);

  useEffect(() => {
    if (debouncedSearchTerm !== value) {
      handleChange(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, value, handleChange]);

  return (
    <label htmlFor={id} className={styles.label}>
      <input
        id={id}
        className={styles.search}
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </label>
  );
};

SearchBar.propTypes = {
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  debounceTimeInMs: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default SearchBar;
