import React from "react";
import PropTypes from "prop-types";
import { Container } from "reactstrap";
import HOC from "HOC";
import selectors from "selectors";
import Header from "./components/Header";
import Admin from "./components/Admin";

const Dashboard = (props) => {
  const { user } = props;
  return (
    <>
      <Header />
      <Container>
        {user.role === "admin" ? <Admin /> :  null}
      </Container>
    </>
  );
};

Dashboard.propTypes = {
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  user: selectors.user(state).user,
});

export default HOC(
  mapStateToProps,
  null,
)(Dashboard);
