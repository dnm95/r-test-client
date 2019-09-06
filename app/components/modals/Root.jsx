import React from "react";
import PropTypes from "prop-types";
import { connect } from "helpers";
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter
} from "reactstrap";
import actions from "actions/modal";
import Attendance from "./Attendance";
import Employee from "./Employee";

const Unknown = (props) => (`El modal <<${props.modalName}>> no existe.`);

const MODALS = {
  [actions.TYPE.ATTENDANCE]: Attendance,
  [actions.TYPE.EMPLOYEE]: Employee,
};

const Root = (props) => {
  if (!props.name) return null;
  const Node = MODALS[props.name] || Unknown;

  return (
    <Modal
      isOpen={props.open}
      toggle={props.onClose}
      style={props.props.style || {}}
      className={props.props.className || ""}
    >
      <ModalHeader toggle={props.onClose}>
        {props.props.title}
      </ModalHeader>
      <ModalBody>
        <Node onClose={props.onClose} {...props.props} />
      </ModalBody>
      <ModalFooter>
        <Button onClick={props.onClose}>
          Cancelar
        </Button>
      </ModalFooter>
    </Modal>
  );
};

Root.defaultProps = {
  open: false,
  onClose() {}
};

Root.propTypes = {
  name: PropTypes.string,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  props: PropTypes.shape({
    title: PropTypes.string,
    info: PropTypes.object,
    style: PropTypes.object,
    className: PropTypes.string,
  })
};

const mapStateToProps = (state) => ({
  ...state.get("modal").toJS()
});

const mapDispatchToProps = (dispatch) => ({
  onClose() {
    dispatch({
      type: actions.HIDE_MODAL
    });
  }
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Root);
