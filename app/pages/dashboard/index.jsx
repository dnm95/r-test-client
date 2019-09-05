import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Button } from 'reactstrap';
import HOC from "HOC";
import actions from "actions";
import selectors from "selectors";
import SearchBar from "components/commons/SearchBar";
import Header from "./components/Header";
import EmployeeList from "./components/EmployeeList";

const Dashboard = (props) => {
  return (
    <>
      <Header />
      <Container>
        <Row>
          <Col xs="12" style={{ padding: "1em 0px 1.5em 0px" }}>
            <Button outline className="float-right" color="info">Agregar empleado</Button>
          </Col>
          <Col xs="12" style={{ padding: "0px" }}>
            <SearchBar />
          </Col>
          <Col xs="12" style={{ padding: "0.5em 0px" }}>
            <EmployeeList />
          </Col>
        </Row>
      </Container>
    </>
  );
};

Dashboard.defaultProps = {
  onSubmit() {},
  loading: false,
};

Dashboard.propTypes = {
  loading: PropTypes.bool,
  onSubmit: PropTypes.func,
};

const mapStateToProps = state => ({
  loading: selectors.user(state).loading,
});

const mapDispatchToProps = dispatch => ({
  onSubmit(e, data) {
    e.preventDefault();
    dispatch({ type: actions.user.REQUEST_LOGIN, payload: { ...data } });
  }
});

export default HOC(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
