import React from "react";
import PropTypes from "prop-types";
import {
  Button, Col
} from "reactstrap";

const Filters = (props) => {
  const { onDisplayModal, onGetEmployeesOrAttendances } = props;
  return (
    <>
      <Col xs="3" style={{ paddingRight: "15px", paddingLeft: "0px", display: "inline-block" }}>
        <Button
          color="primary"
          block
          onClick={() => onGetEmployeesOrAttendances(false, false)}
        >
          Ver todos los empleados
        </Button>
      </Col>
      <Col xs="3" style={{ paddingRight: "15px", paddingLeft: "0px", display: "inline-block" }}>
        <Button
          color="primary"
          block
          onClick={() => onGetEmployeesOrAttendances(true, true)}
        >
          Entradas/salidas de hoy
        </Button>
      </Col>
      <Col xs="3" style={{ paddingRight: "15px", paddingLeft: "0px", display: "inline-block" }}>
        <Button
          color="primary"
          block
          onClick={() => onGetEmployeesOrAttendances(true, false)}
        >
          Todas las entradas/salidas
        </Button>
      </Col>
      <Col xs="3" style={{ paddingRight: "0px", paddingLeft: "0px", display: "inline-block" }}>
        <Button
          color="primary"
          block
          onClick={() => onDisplayModal({ title: "Añadir empleado", edit: false }, "EMPLOYEE")}
        >
          Agregar empleado
        </Button>
      </Col>
    </>
  );
};

Filters.propTypes = {
  onDisplayModal: PropTypes.func.isRequired,
  onGetEmployeesOrAttendances: PropTypes.func.isRequired,
};

export default Filters;