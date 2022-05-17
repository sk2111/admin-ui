//libs
import React from "react";
import PropTypes from "prop-types";
//css
import styles from "./EditableInput.module.css";
//components
import RenderView from "../RenderView/RenderView";

const EditableInput = React.forwardRef(({ editable, value }, ref) => {
  return (
    <>
      <RenderView renderIftrue={!editable}>{value}</RenderView>
      <RenderView renderIftrue={editable}>
        <input
          aria-label="editable-input"
          className={styles.input}
          ref={ref}
          type="text"
          defaultValue={value}
        />
      </RenderView>
    </>
  );
});

EditableInput.propTypes = {
  editable: PropTypes.bool.isRequired,
  value: PropTypes.string,
};

export default EditableInput;
