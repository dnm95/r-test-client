import React from "react";
import HOC from "HOC";
import PropTypes from "prop-types";
import { Container, Row, Col } from 'reactstrap';
import actions from "actions";
import selectors from "selectors";
import Login from "components/forms/Login";

const Home = (props) => (
  <Container>
    <Row>
    <Col sm="12" md={{ size: 6, offset: 3 }}>
      <Login />
    </Col>
    </Row>
  </Container>
);

Home.defaultProps = {
  onAdd() {}
};

Home.propTypes = {
  test: PropTypes.object,
  onAdd: PropTypes.func
};

const mapStateToProps = state => ({
  // test: selectors.test(state).test
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
