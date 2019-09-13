import React from "react";
import PropTypes from "prop-types";
import { Link } from "routes";
import moment from "moment";

const EmployeeAttendanceList = (props) => (
  <table className="table table-bordered">
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Última Entrada</th>
        <th>Última Salida</th>
      </tr>
    </thead>
    <tbody>
      {props.employees.length > 0 && props.employees.map((emp) => (
        <tr key={emp.entry_date}>
          <td>
            <Link route="secure.employee.detail" params={{ id: emp.id }}>
              <a>
                {`${emp.name} ${emp.first_name} ${emp.last_name}`}
              </a>
            </Link>
          </td>
          <td>
            {emp.entry_date ? `${moment(emp.entry_date).format("MM-DD-YYYY")} ${moment(emp.entry_hour, "HH:mm:ss").format("hh:mm A")}` : "Sin registro"}
          </td>
          <td>
            {emp.departure_date ? `${moment(emp.departure_date).format("MM-DD-YYYY")} ${moment(emp.departure_hour, "HH:mm:ss").format("hh:mm A")}` : "Sin registro"}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

EmployeeAttendanceList.defaultProps = {
  employees: [],
};

EmployeeAttendanceList.propTypes = {
  employees: PropTypes.array,
};

export default EmployeeAttendanceList;
