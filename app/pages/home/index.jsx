import React from "react";
import HOC from "HOC";
import { Container, Row, Col } from "reactstrap";
import Login from "components/forms/Login";

const Home = () => (
  <Container>
    <Row>
      <Col sm="12" md={{ size: 6, offset: 3 }}>
        <Login />
      </Col>
    </Row>
  </Container>
);

export default HOC()(Home);
