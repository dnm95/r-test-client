import React from "react";
import PropTypes from "prop-types";
import AddEditEmployee from "components/forms/AddEditEmployee";

const AttendanceModal = (props) => (<AddEditEmployee edit={props.edit} />);

AttendanceModal.defaultProps = {
  edit: false,
};

AttendanceModal.propTypes = {
  edit: PropTypes.bool,
};

export default AttendanceModal;
