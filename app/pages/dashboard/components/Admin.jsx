import React, { useEffect } from "react";
import PropTypes from "prop-types";
import {
  Button, Row, Col
} from "reactstrap";
import actions from "actions";
import selectors from "selectors";
import { connect } from "helpers";
import SearchBar from "components/commons/SearchBar";
import EmployeeList from "./EmployeeList";

const Admin = (props) => {
  const { employees, onDisplayModal, onGetEmployees } = props;
  useEffect(() => {
    onGetEmployees();
  }, [onGetEmployees])
  return (
    <Row>
      <Col xs="12" style={{ padding: "1em 0px 1.5em 0px" }}>
        <Button
          outline
          className="float-right"
          color="info"
          onClick={() => onDisplayModal({ title: "Añadir empleado", edit: false }, "EMPLOYEE")}
        >
          Agregar empleado
        </Button>
      </Col>
      <Col xs="12" style={{ padding: "0px" }}>
        <SearchBar />
      </Col>
      <Col xs="12" style={{ padding: "0.5em 0px" }}>
        <EmployeeList employees={employees} />
      </Col>
    </Row>
  );
};

Admin.propTypes = {
  employees: PropTypes.array,
  onDisplayModal: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  employees: selectors.employee(state).employee.employees,
});

const mapDispatchToProps = (dispatch) => ({
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

  onGetEmployees() {
    dispatch({
      type: actions.employee.REQUEST_EMPLOYEES_DATA,
      payload: {},
    });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Admin);
