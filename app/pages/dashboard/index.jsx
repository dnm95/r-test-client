import React from "react";
import PropTypes from "prop-types";
import {
  Container, Row, Col, Button
} from "reactstrap";
import HOC from "HOC";
import actions from "actions";
import SearchBar from "components/commons/SearchBar";
import Header from "./components/Header";
import EmployeeList from "./components/EmployeeList";

const Dashboard = (props) => {
  const { onDisplayModal } = props;
  return (
    <>
      <Header />
      <Container>
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
            <EmployeeList />
          </Col>
        </Row>
      </Container>
    </>
  );
};

Dashboard.propTypes = {
  onDisplayModal: PropTypes.func.isRequired,
};

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
  }
});

export default HOC(
  null,
  mapDispatchToProps
)(Dashboard);
