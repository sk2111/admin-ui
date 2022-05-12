//libs
import PropTypes from "prop-types";
//styles
import styles from "./CheckBox.module.css";

const CheckBox = ({ checked, handleChange }) => {
  return (
    <input
      data-testid="checkbox"
      className={styles.checkBox}
      type="checkbox"
      checked={checked}
      onChange={(e) => handleChange(e.target.checked)}
    />
  );
};

CheckBox.propTypes = {
  checked: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default CheckBox;
