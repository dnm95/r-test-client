import React from "react";
import PropTypes from "prop-types";
import { Table } from 'reactstrap';

const Attendance = (props) => {
  return (
    <Table bordered>
      <thead>
        <tr>
          <th>Entrada</th>
          <th>Salida</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>05/09/2019 08:30</td>
          <td>05/09/2019 18:30</td>
        </tr>
      </tbody>
    </Table>
  );
};

Attendance.defaultProps = {};

Attendance.propTypes = {};

export default Attendance;
