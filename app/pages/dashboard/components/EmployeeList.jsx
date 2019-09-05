import React from "react";
import PropTypes from "prop-types";
import { Link } from "routes";
import { Button, ButtonGroup, ButtonToolbar, Table } from 'reactstrap';

const EmployeeList = (props) => {
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
            <ButtonToolbar>
              <ButtonGroup>
                <Link route="employee.detail" params={{ id: 1 }}>
                  <a>
                    <Button color="success">Ver</Button>
                  </a>
                </Link>
                <Button color="warning">Editar</Button>
                <Button color="danger">Eliminar</Button>
              </ButtonGroup>
            </ButtonToolbar>
          </td>
        </tr>
      </tbody>
    </Table>
  );
};

EmployeeList.defaultProps = {};

EmployeeList.propTypes = {};

export default EmployeeList;
