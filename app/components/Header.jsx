import React from "react";
import PropTypes from "prop-types";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import { Link } from "routes";
import { connect } from "helpers";
import selectors from "selectors";

const Header = (props) => (
  <Navbar color="light" light expand="md">
    <NavbarBrand href="/">RUNA</NavbarBrand>
    <NavbarToggler />
    {props.accessToken && (
      <Collapse navbar>
        <Nav className="" navbar>
          <NavItem>
            <Link route="secure.dashboard">
              <a className="nav-link">
                Dashboard
              </a>
            </Link>
          </NavItem>
          <NavItem>
            <NavLink href="/logout">Salir</NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    )}
  </Navbar>
);

Header.defaultProps = {
  accessToken: null,
};

Header.propTypes = {
  accessToken: PropTypes.string,
};

const mapStateToProps = (state) => ({
  accessToken: selectors.globals(state).accessToken,
});

export default connect(
  mapStateToProps,
  null,
)(Header);
