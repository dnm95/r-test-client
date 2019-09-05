import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "reactstrap";
import { connect } from "helpers";
import DateTimePicker from "react-datetime-picker/dist/entry.nostyle";
import actions from "actions";

import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";

const AttendanceModal = (props) => {
  const { onSetAttendance } = props;
  const [dateTime, setDateTime] = useState(new Date());
  return (
    <>
      <DateTimePicker
        onChange={(date) => setDateTime(date)}
        value={dateTime}
      />
      <Button className="float-right" color="success" onClick={() => onSetAttendance(dateTime, props.type)}>
        Guardar
      </Button>
    </>
  );
};

AttendanceModal.propTypes = {
  onSetAttendance: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  onSetAttendance(dateTime, type) {
    dispatch({
      type: actions.employee.SET_EMPLOYEE_ATTENDANCE,
      payload: {
        dateTime,
        type,
      },
    });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AttendanceModal);
