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

const EmployeeInfo = (props) => {
  const { loading, onSubmit } = props;
  const [data, setData] = useState(initialState);
  return (
    <Form onSubmit={(e) => onSubmit(e, data)}>
      <FormGroup>
        <Label for="name">Nombre</Label>
        <Input
          type="name"
          name="name"
          id="name"
          placeholder="Nombre"
          autoComplete="off"
          onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
          disabled={loading}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for="firstName">Apellido Paterno</Label>
        <Input
          type="firstName"
          name="firstName"
          id="firstName"
          placeholder="Apellido Paterno"
          autoComplete="off"
          onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
          disabled={loading}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for="lastName">Apellido Materno</Label>
        <Input
          type="lastName"
          name="lastName"
          id="lastName"
          placeholder="Apellido Materno"
          autoComplete="off"
          onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
          disabled={loading}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for="rfc">RFC</Label>
        <Input
          type="rfc"
          name="rfc"
          id="rfc"
          placeholder="RFC"
          autoComplete="off"
          onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
          disabled={loading}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for="email">Email</Label>
        <Input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          type="email"
          autoComplete="off"
          onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
          disabled={loading}
          required
        />
      </FormGroup>
      <Button color="primary" size="lg" block>Ingresar</Button>
    </Form>
  );
};

EmployeeInfo.defaultProps = {
  onSubmit() {},
  loading: false,
};

EmployeeInfo.propTypes = {
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
)(EmployeeInfo);
