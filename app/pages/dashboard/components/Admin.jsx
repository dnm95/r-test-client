import React from "react";
import PropTypes from "prop-types";
import {
  Button, Row, Col
} from "reactstrap";
import actions from "actions";
import { connect } from "helpers";
import SearchBar from "components/commons/SearchBar";
import EmployeeList from "./EmployeeList";

const Admin = (props) => {
  const { onDisplayModal } = props;
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
        <EmployeeList />
      </Col>
    </Row>
  );
};

Admin.propTypes = {
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

export default connect(
  null,
  mapDispatchToProps
)(Admin);
