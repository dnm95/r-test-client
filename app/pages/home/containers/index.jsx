import React from "react";
import HOC from "HOC";
import PropTypes from "prop-types";
import actions from "actions";
import selectors from "selectors";

const Home = props => (
  <div>
    <div>
      <button type="button" onClick={props.onAdd}>
          Click Me!
      </button>
      {" "}
      <a href="/account">
        Account
      </a>
      {" "}
      <a href="/account/orders/1900">
        Go an order
      </a>
    </div>
    <span>
      Click times:
      {props.test.clicks}
    </span>
  </div>
);

Home.defaultProps = {
  onAdd() {}
};

Home.propTypes = {
  test: PropTypes.object,
  onAdd: PropTypes.func
};

const mapStateToProps = state => ({
  test: selectors.test(state).test
});

const mapDispatchToProps = dispatch => ({
  onAdd() {
    dispatch({ type: actions.test.ADD_CLICK });
  }
});

export default HOC(
  mapStateToProps,
  mapDispatchToProps
)(Home);
