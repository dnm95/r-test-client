import React from "react";
import { Link } from "routes";
import {
  Button, Table, Row, Col
} from "reactstrap";

const EmployeeList = () => {
  return (
    <Table bordered>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Última Entrada</th>
          <th>Última Salida</th>
          <th>Acción</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Daniel Nava Martinez</td>
          <td>05/09/2019 08:30</td>
          <td>05/09/2019 18:30</td>
          <td>
            <Row style={{ marginLeft: "0px", marginRight: "0px" }}>
              <Col xs="4" style={{ padding: "0px" }}>
                <Link route="employee.detail" params={{ id: 1 }}>
                  <a>
                    <Button style={{ borderRadius: "0px" }} color="success" block>Ver</Button>
                  </a>
                </Link>
              </Col>
              <Col xs="4" style={{ padding: "0px" }}>
                <Button style={{ borderRadius: "0px" }} color="warning" block>Editar</Button>
              </Col>
              <Col xs="4" style={{ padding: "0px" }}>
                <Button style={{ borderRadius: "0px" }} color="danger" block>Eliminar</Button>
              </Col>
            </Row>
          </td>
        </tr>
      </tbody>
    </Table>
  );
};

EmployeeList.defaultProps = {};

EmployeeList.propTypes = {};

export default EmployeeList;
