import React from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

const Header = () => {
  return (
    <Navbar color="light" light expand="md">
      <NavbarBrand href="/">RUNA</NavbarBrand>
      <NavbarToggler />
      <Collapse navbar>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink href="/logout">Salir</NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

Header.defaultProps = {};

Header.propTypes = {};

export default Header;
