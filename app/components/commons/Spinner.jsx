import React from "react";
import PropTypes from "prop-types";

const Spinner = ({ loading }) => (loading ? (
  <div className="d-flex justify-content-center">
    <div className="spinner-border" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </div>
) : null);

Spinner.defaultProps = {
  loading: false,
};

Spinner.propTypes = {
  loading: PropTypes.bool,
};

export default Spinner;
