import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Button } from 'reactstrap';
import HOC from "HOC";
import actions from "actions";
import selectors from "selectors";
import AddEditEmployee from "components/forms/AddEditEmployee";
import AttendanceList from "./components/AttendanceList";

const EmployeeDetail = (props) => {
  const { employee, onDisplayModal } = props;
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
          <AddEditEmployee employee={employee} readOnly />
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
          <AttendanceList attendances={employee.data.attendance} />
        </Col>
      </Row>
    </Container>
  );
};

EmployeeDetail.propTypes = {
  onDisplayModal: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  employee: selectors.employee(state).employee,
});

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

export default HOC(mapStateToProps, mapDispatchToProps)(EmployeeDetail, {
  type: actions.employee.REQUEST_EMPLOYEE_DATA,
  payload: {}
});
