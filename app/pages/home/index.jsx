import React from "react";
import HOC from "HOC";
import { Container, Row, Col } from "reactstrap";
import PropTypes from "prop-types";
import Login from "components/forms/Login";

const Home = (props) => (
  <Container>
    <Row>
      <Col sm="12" md={{ size: 6, offset: 3 }}>
        <Login next={props.router.query.next} csrfToken={props.csrfToken} />
      </Col>
    </Row>
  </Container>
);

Home.propTypes = {
  router: PropTypes.object,
  csrfToken: PropTypes.string
};

export default HOC()(Home);
