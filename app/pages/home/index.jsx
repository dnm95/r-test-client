import React from "react";
import HOC from "HOC";
import { Container, Row, Col } from "reactstrap";
import PropTypes from "prop-types";
import Login from "components/forms/Login";

const Home = (props) => (
  <Container style={{ padding: "100px 0px 200px" }}>
    <Row>
      <Col sm="12" md={{ size: 6, offset: 3 }}>
        <Login next={props.router.query.next} />
      </Col>
    </Row>
  </Container>
);

Home.propTypes = {
  router: PropTypes.object,
};

export default HOC()(Home);
