import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { connect } from "helpers";
import actions from "actions";
import selectors from "selectors";

const initialState = {
  email: "",
  password: "",
};

const Login = (props) => {
  const { loading, onSubmit } = props;
  const [data, setData] = useState(initialState);
  return (
    <Form onSubmit={(e) => onSubmit(e, data)}>
      <FormGroup>
        <Label for="email">Email</Label>
        <Input
          type="email"
          name="email"
          id="email"
          placeholder="usuario@email.com"
          autoComplete="off"
          onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
          disabled={loading}
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
          onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
          disabled={loading}
          required
        />
      </FormGroup>
      <Button color="primary" size="lg" block>Ingresar</Button>
    </Form>
  );
};

Login.defaultProps = {
  onSubmit() {},
  loading: false,
};

Login.propTypes = {
  loading: PropTypes.bool,
  onSubmit: PropTypes.func,
};

const mapStateToProps = state => ({
  loading: selectors.user(state).loading,
});

const mapDispatchToProps = dispatch => ({
  onSubmit(e, data) {
    e.preventDefault();
    dispatch({ type: actions.user.REQUEST_LOGIN, payload: { ...data } });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
