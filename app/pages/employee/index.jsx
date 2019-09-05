import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from 'reactstrap';
import HOC from "HOC";
import EmployeeInfo from "components/forms/EmployeeInfo";
import Attendance from "./components/Attendance";

const EmployeeDetail = (props) => {
  return (
    <Container>
      <h2>Detalle del Empleado</h2>
      <Row>
        <Col sm="6">
          <h3 style={{ padding: "1em 0px" }}>Información</h3>
          <EmployeeInfo />
        </Col>
        <Col sm="6">
          <h3 style={{ padding: "1em 0px" }}>Registro</h3>
          <Attendance />
        </Col>
      </Row>
    </Container>
  );
};

EmployeeDetail.defaultProps = {};

EmployeeDetail.propTypes = {};

export default HOC()(EmployeeDetail);
