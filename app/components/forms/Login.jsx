import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  FormGroup, Label, Input
} from "reactstrap";
import SecureForm from "./SecureForm";

const Login = (props) => {
  const { next } = props;
  return (
    <SecureForm
      action="/authentication"
      onSubmit={() => {}}
      next={next}
      buttonProps={{ copy: "Entrar" }}
    >
      <FormGroup>
        <Label for="email">Email</Label>
        <Input
          type="email"
          name="email"
          id="email"
          placeholder="usuario@email.com"
          autoComplete="off"
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for="password">Password</Label>
        <Input
          type="password"
          name="password"
          id="password"
          placeholder="contraseña"
          required
        />
      </FormGroup>
    </SecureForm>
  );
};

Login.defaultProps = {
  next: "",
};

Login.propTypes = {
  next: PropTypes.string
};

export default Login;
