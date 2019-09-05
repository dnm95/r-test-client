import React from "react";
import PropTypes from "prop-types";
import { connect } from "helpers";

const Unknown = props => (`Hey, dude! That modal name <<${props.modalName}>> doesn't exists.`);

const MODALS = {
  "": ""
};

const Root = (props) => {
  if (!props.modalName) return null;
  const Node = MODALS[props.modalName] || Unknown;

  return (
    <div>
      <Node />
    </div>
  );
};

Root.defaultProps = {
  open: false,
  onClose() {}
};

Root.propTypes = {
  modalName: PropTypes.string,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  props: PropTypes.shape({
    title: PropTypes.string,
    info: PropTypes.object
  })
};


export default connect()(Root);
