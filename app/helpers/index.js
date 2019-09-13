import { connect as connector } from "react-redux";

const connect = (
  mapStateToProps,
  mapDispatchToProps
) => (MainComponent) => connector(
  mapStateToProps,
  mapDispatchToProps
)(MainComponent);


export {
  // eslint-disable-next-line import/prefer-default-export
  connect
};
