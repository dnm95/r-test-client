import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Button } from 'reactstrap';
import HOC from "HOC";
import actions from "actions";
import EmployeeInfo from "components/forms/EmployeeInfo";
import Attendance from "./components/Attendance";

const EmployeeDetail = (props) => {
  const { onDisplayModal } = props;
  return (
    <Container>
      <h2>Detalle del Empleado</h2>
      <Row>
        <Col sm="6">
          <h3 style={{ padding: "0.5em 0px" }}>Información</h3>
          <EmployeeInfo />
        </Col>
        <Col sm="6">
          <h3 style={{ padding: "0.5em 0px" }}>Registro</h3>
          <Row>
            <Col sm="12" style={{ padding: "1em 15px" }}>
              <Button
                color="primary"
                onClick={() => onDisplayModal("Registrar entrada del empleado", "entry_time")}
              >
                Registrar Entrada
              </Button>
              <Button
                color="primary"
                className="float-right"
                onClick={() => onDisplayModal("Registrar salida del empleado", "departure_time")}
              >
                Registrar Salida
              </Button>
            </Col>
          </Row>
          <Attendance />
        </Col>
      </Row>
    </Container>
  );
};

EmployeeDetail.propTypes = {
  onDisplayModal: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  onDisplayModal(title, type) {
    dispatch({
      type: actions.modal.OPEN_MODAL,
      payload: {
        name: actions.modal.TYPE.ATTENDANCE,
        confirm: true,
        props: { title, type },
      }
    });
  }
});

export default HOC(null, mapDispatchToProps)(EmployeeDetail);
