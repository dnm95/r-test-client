import React from "react";
import PropTypes from "prop-types";
import {
  Button, Col
} from "reactstrap";

const Filters = (props) => {
  const { loading, onDisplayModal, onGetEmployeesOrAttendances } = props;
  return (
    <>
      <Col xs="3" style={{ paddingRight: "15px", paddingLeft: "0px", display: "inline-block" }}>
        <Button
          color="primary"
          block
          onClick={() => onGetEmployeesOrAttendances(false, false)}
          disabled={loading}
        >
          {loading ? (
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
          ) : "Ver todos los empleados"}
        </Button>
      </Col>
      <Col xs="3" style={{ paddingRight: "15px", paddingLeft: "0px", display: "inline-block" }}>
        <Button
          color="primary"
          block
          onClick={() => onGetEmployeesOrAttendances(true, true)}
          disabled={loading}
        >
          {loading ? (
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
          ) : "Entradas/salidas de hoy"}
        </Button>
      </Col>
      <Col xs="3" style={{ paddingRight: "15px", paddingLeft: "0px", display: "inline-block" }}>
        <Button
          color="primary"
          block
          onClick={() => onGetEmployeesOrAttendances(true, false)}
          disabled={loading}
        >
          {loading ? (
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
          ) : "Todas las entradas/salidas"}
        </Button>
      </Col>
      <Col xs="3" style={{ paddingRight: "0px", paddingLeft: "0px", display: "inline-block" }}>
        <Button
          color="primary"
          block
          onClick={() => onDisplayModal({ title: "Añadir empleado", edit: false }, "EMPLOYEE")}
          disabled={loading}
        >
          {loading ? (
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
          ) : "Agregar empleado"}
        </Button>
      </Col>
    </>
  );
};

Filters.propTypes = {
  loading: PropTypes.bool.isRequired,
  onDisplayModal: PropTypes.func.isRequired,
  onGetEmployeesOrAttendances: PropTypes.func.isRequired,
};

export default Filters;
