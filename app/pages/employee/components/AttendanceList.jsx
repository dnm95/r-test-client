import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

const Attendance = (props) => {
  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th scope="col">Ingreso</th>
          <th scope="col">Salida</th>
        </tr>
      </thead>
      <tbody>
        {props.attendances.length > 0 && props.attendances.map((att) => (
          <tr key={att.entry_date}>
            <td>
              {att.entry_date ? `${moment(att.entry_date).format("MM-DD-YYYY")} ${moment(att.entry_hour, "HH:mm:ss").format("hh:mm A")}` : "Sin registro"}
            </td>
            <td>
              {att.departure_date ? `${moment(att.departure_date).format("MM-DD-YYYY")} ${moment(att.departure_hour, "HH:mm:ss").format("hh:mm A")}` : "Sin registro"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

Attendance.defaultProps = {
  attendances: [],
};

Attendance.propTypes = {
  attendances: PropTypes.array,
};

export default Attendance;
