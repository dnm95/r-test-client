import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Row, Col } from "reactstrap";
import { CSVLink } from "react-csv";
import actions from "actions";
import selectors from "selectors";
import { connect } from "helpers";
import SearchBar from "components/commons/SearchBar";
import EmployeeList from "./EmployeeList";
import Filters from "./Filters";

const Admin = (props) => {
  const { employees, onDisplayModal, onGetEmployeesOrAttendances } = props;
  useEffect(() => {
    onGetEmployeesOrAttendances(false, false);
  }, [onGetEmployeesOrAttendances]);
  return (
    <Row>
      <Col style={{ padding: "3rem 0px 0px" }} xs={12}>
        <h2>Dashboard Empleados</h2>
      </Col>
      <Col style={{ padding: "1em 0px" }} xs={12}>
        <Filters
          onDisplayModal={onDisplayModal}
          onGetEmployeesOrAttendances={onGetEmployeesOrAttendances}
        />
      </Col>
      <Col xs="12" style={{ padding: "0px" }}>
        <SearchBar />
      </Col>
      <Col xs="12" style={{ padding: "0.5em 0px 0px" }}>
        <EmployeeList employees={employees} />
      </Col>
      <Col xs={12} style={{ padding: "0px 0px 3rem" }}>
        <CSVLink
          data={employees}
          filename="attendances.csv"
          className={`btn btn-success btn-block btn-lg ${employees[0] ? "" : "disabled"}`}
          target="_blank"
        >
          Descargar registro CSV
        </CSVLink>
      </Col>
    </Row>
  );
};

Admin.propTypes = {
  employees: PropTypes.array,
  onDisplayModal: PropTypes.func.isRequired,
  onGetEmployeesOrAttendances: PropTypes.func.isRequired,
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

  onGetEmployeesOrAttendances(attendances, today) {
    dispatch({
      type: actions.employee.REQUEST_EMPLOYEES_DATA,
      payload: { attendances, today },
    });
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Admin);
