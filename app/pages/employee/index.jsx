import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Button } from 'reactstrap';
import HOC from "HOC";
import actions from "actions";
import selectors from "selectors";
import AddEditEmployee from "components/forms/AddEditEmployee";
import AttendanceList from "components/commons/AttendanceList";

const EmployeeDetail = (props) => {
  const { employee, onDisplayModal, onRequestEmployee } = props;
  const { id } = props.router.query;
  useEffect(() => {
    onRequestEmployee(id);
  }, [onRequestEmployee]);
  return (
    <Container>
      <h2 style={{ paddingTop: "3rem", paddingBottom: "2rem" }}>Detalle del Empleado</h2>
      <Row>
        <Col sm="5">
          <h3 style={{ paddingTop: "0.5em" }}>Información Personal</h3>
          <AddEditEmployee readOnly />
          <Row>
            <Col sm="12" style={{ padding: "1em 15px 3rem" }}>
              <Button
                color="success"
                onClick={() => onDisplayModal({ title: "Editar empleado", edit: true }, "EMPLOYEE")}
              >
                Editar Información
              </Button>
              <Button
                color="danger"
                className="float-right"
                onClick={() => onDisplayModal({ title: "Editar empleado", edit: true }, "EMPLOYEE")}
              >
                Elminar Empleado
              </Button>
            </Col>
          </Row>
        </Col>
        <Col sm="7">
          <h3 style={{ paddingTop: "0.5em" }}>Registros</h3>
          <Row>
            <Col sm="12" style={{ padding: "1em 15px" }}>
              <Button
                color="primary"
                onClick={() => onDisplayModal({ title: "Registrar hora" }, "ATTENDANCE")}
                block
              >
                Registrar hora de entrada / salida
              </Button>
            </Col>
          </Row>
          <AttendanceList attendances={employee.active.attendance} />
        </Col>
      </Row>
    </Container>
  );
};

EmployeeDetail.propTypes = {
  onDisplayModal: PropTypes.func.isRequired,
  onRequestEmployee: PropTypes.func.isRequired,
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
  },

  onRequestEmployee(id) {
    dispatch({
      type: actions.employee.REQUEST_EMPLOYEE_DATA,
      payload: { id },
    })
  }
});

export default HOC(mapStateToProps, mapDispatchToProps)(EmployeeDetail);
