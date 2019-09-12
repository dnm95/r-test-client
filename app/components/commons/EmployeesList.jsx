import React from "react";
import PropTypes from "prop-types";

const EmployeesList = (props) => {
  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th scope="col">Nombre</th>
          <th scope="col">Email</th>
          <th scope="col">RFC</th>
        </tr>
      </thead>
      <tbody>
        {props.employees.length > 0 && props.employees.map((emp) => (
          <tr key={emp.id}>
            <td>
              {`${emp.name} ${emp.first_name} ${emp.last_name}`}
            </td>
            <td>
              {emp.email}
            </td>
            <td>
              {emp.rfc}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

EmployeesList.defaultProps = {
  employees: [],
};

EmployeesList.propTypes = {
  employees: PropTypes.array,
};

export default AttendanceList;
