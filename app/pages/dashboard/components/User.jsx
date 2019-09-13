import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Row, Col } from "reactstrap";
import moment from "moment";
import { CSVLink } from "react-csv";
import actions from "actions";
import selectors from "selectors";
import { connect } from "helpers";
import AttendanceList from "components/commons/AttendanceList";

const User = (props) => {
  const { employee, loading, onGetEmployee } = props;
  useEffect(() => {
    onGetEmployee();
  }, [onGetEmployee]);
  return (
    <Row>
      <Col xs={12}>
        <h2 style={{ paddingTop: "3rem", paddingBottom: "1rem" }}>Hola {employee.name}!</h2>
      </Col>
      <Col xs={12}>
        <div className="card">
          <div className="card-body">
            <h4>Información Personal</h4>
            <h6>Nombre: {`${employee.name} ${employee.first_name} ${employee.last_name}`}</h6>
            <h6>Email: {employee.email}</h6>
            <h6>RFC: {employee.rfc}</h6>
            {employee.attendance[0] ? (
              <>
                <h6>Último ingreso: {employee.attendance[0].entry_date ? `${moment(employee.attendance[0].entry_date).format("MM-DD-YYYY")} ${moment(employee.attendance[0].entry_hour, "HH:mm:ss").format("hh:mm A")}` : "Sin registro"}</h6>
                <h6>Última salida: {employee.attendance[0].departure_date ? `${moment(employee.attendance[0].departure_date).format("MM-DD-YYYY")} ${moment(employee.attendance[0].departure_hour, "HH:mm:ss").format("hh:mm A")}` : "Sin registro"}</h6>
              </>
            ) : <h6>Ops! parece que no tienes registros de entrada/salida</h6>}
          </div>
        </div>
      </Col>
      <Col xs={12}>
        <AttendanceList attendances={employee.attendance} />
      </Col>
      <Col xs={12} style={{ paddingBottom: "3rem" }}>
        <CSVLink
          data={employee.attendance}
          filename={`${employee.name}-${employee.first_name}-attendance.csv`}
          className={`btn btn-success btn-block btn-lg ${employee.attendance[0] && !loading ? "" : "disabled"}`}
          target="_blank"
        >
          Descargar registro CSV
        </CSVLink>
      </Col>
    </Row>
  );
};

User.propTypes = {
  employee: PropTypes.object,
  loading: PropTypes.bool,
  onGetEmployee: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  employee: selectors.employee(state).employee.active,
  loading: selectors.employee(state).employee.loading,
});

const mapDispatchToProps = (dispatch) => ({
  onGetEmployee() {
    dispatch({
      type: actions.employee.REQUEST_EMPLOYEE_DATA,
      payload: {},
    });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User);
