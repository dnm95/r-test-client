import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Form, FormGroup, Label, Input, Button
} from "reactstrap";
import { connect } from "helpers";
import DateTimePicker from "react-datetime-picker/dist/entry.nostyle";
import actions from "actions";

import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";

const initialState = {
  dateTime: new Date(),
  type: "entry_time",
};

const RegisterAttendance = (props) => {
  const { onSetAttendance } = props;
  const [data, setData] = useState(initialState);
  return (
    <Form onSubmit={(e) => onSetAttendance(e, data)}>
      <FormGroup>
        <Label for="attendanceType">Tipo de registro:</Label>
        <Input
          type="select"
          name="attendanceType"
          id="attendanceType"
          value={data.type}
          onChange={(e) => setData({ ...data, type: e.target.value })}
          required
        >
          <option value="entry_time">Entrada</option>
          <option value="departure_time">Salida</option>
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="dateTime">Hora y fecha:</Label>
        <DateTimePicker
          onChange={(date) => setData({ ...data, dateTime: date })}
          value={data.dateTime}
          required
        />
      </FormGroup>
      <Button style={{ marginTop: "0.5em" }} className="float-right" color="success" block>
        Guardar
      </Button>
    </Form>
  );
};

RegisterAttendance.propTypes = {
  onSetAttendance: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onSetAttendance(e, data) {
    e.preventDefault();
    dispatch({
      type: actions.employee.CREATE_EMPLOYEE_ATTENDANCE,
      payload: { ...data },
    });
  }
});

export default connect(
  null,
  mapDispatchToProps
)(RegisterAttendance);
