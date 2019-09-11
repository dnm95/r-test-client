import React from "react";
import PropTypes from "prop-types";
import { Link } from "routes";
import {
  Button, Row, Col
} from "reactstrap";
import moment from "moment";

const EmployeeList = (props) => {
  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Última Entrada</th>
          <th>Última Salida</th>
          <th>Acción</th>
        </tr>
      </thead>
      <tbody>
        {props.employees.length > 0 && props.employees.map((emp) => (
          <tr key={emp.entry_date}>
            <td>{`${emp.name} ${emp.first_name} ${emp.last_name}`}</td>
            <td>
              {emp.entry_date ? `${moment(emp.entry_date).format("MM-DD-YYYY")} ${moment(emp.entry_hour, "HH:mm:ss").format("hh:mm A")}` : "Sin registro"}
            </td>
            <td>
              {emp.departure_date ? `${moment(emp.departure_date).format("MM-DD-YYYY")} ${moment(emp.departure_hour, "HH:mm:ss").format("hh:mm A")}` : "Sin registro"}
            </td>
            <td>
            <Row style={{ marginLeft: "0px", marginRight: "0px" }}>
              <Col xs="6" style={{ padding: "0px" }}>
                <Link route="secure.employee.detail" params={{ id: emp.id }}>
                  <a>
                    <Button style={{ borderRadius: "0px", textDecoration: "none" }} color="success" block>Ver</Button>
                  </a>
                </Link>
              </Col>
              <Col xs="6" style={{ padding: "0px" }}>
                <Button style={{ borderRadius: "0px" }} color="danger" block>Eliminar</Button>
              </Col>
            </Row>
          </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

EmployeeList.defaultProps = {
  employees: [],
};

EmployeeList.propTypes = {
  employees: PropTypes.array,
};

export default EmployeeList;
