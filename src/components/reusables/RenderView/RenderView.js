//libs
import React from "react";
import PropTypes from "prop-types";

const RenderView = ({ children, renderIftrue }) => {
  if (renderIftrue) {
    return <>{children}</>;
  }
  return null;
};

RenderView.propTypes = {
  children: PropTypes.any,
  renderIftrue: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
};

export default RenderView;
