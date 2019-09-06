import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Button } from 'reactstrap';
import HOC from "HOC";
import actions from "actions";
import AddEditEmployee from "components/forms/AddEditEmployee";
import AttendanceList from "./components/AttendanceList";

const EmployeeDetail = (props) => {
  const { onDisplayModal } = props;
  return (
    <Container>
      <h2>Detalle del Empleado</h2>
      <Row>
        <Col sm="5">
          <h3 style={{ paddingTop: "0.5em" }}>Información Personal</h3>
          <Row>
            <Col sm="12" style={{ padding: "1em 15px" }}>
              <Button
                color="success"
                onClick={() => onDisplayModal({ title: "Editar empleado", edit: true }, "EMPLOYEE")}
              >
                Editar Información
              </Button>
            </Col>
          </Row>
          <AddEditEmployee readOnly />
        </Col>
        <Col sm="7">
          <h3 style={{ paddingTop: "0.5em" }}>Registro</h3>
          <Row>
            <Col sm="12" style={{ padding: "1em 15px" }}>
              <Button
                color="primary"
                onClick={() => onDisplayModal({ title: "Registrar hora" }, "ATTENDANCE")}
              >
                Registrar hora de entrada / salida
              </Button>
            </Col>
          </Row>
          <AttendanceList />
        </Col>
      </Row>
    </Container>
  );
};

EmployeeDetail.propTypes = {
  onDisplayModal: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  onDisplayModal(modalProps, type) {
    dispatch({
      type: actions.modal.OPEN_MODAL,
      payload: {
        name: actions.modal.TYPE[type],
        confirm: true,
        props: { ...modalProps },
      }
    });
  }
});

export default HOC(null, mapDispatchToProps)(EmployeeDetail);
