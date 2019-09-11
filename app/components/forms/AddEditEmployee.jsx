import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Form, FormGroup, Label, Input, Button
} from "reactstrap";
import omit from "lodash/omit";
import { connect } from "helpers";
import actions from "actions";

const AddEditEmployee = (props) => {
  const {
    employee, readOnly, edit, onSubmit
  } = props;
  const [data, setData] = useState({ ...omit(employee.data, ["attendance"]) });
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
          disabled={employee.loading || readOnly}
          value={data.name}
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
          disabled={employee.loading || readOnly}
          value={data.first_name}
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
          disabled={employee.loading || readOnly}
          value={data.last_name}
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
          disabled={employee.loading || readOnly}
          value={data.rfc}
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
          autoComplete="off"
          onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
          disabled={employee.loading || readOnly}
          value={data.email}
          required
        />
      </FormGroup>
      {!readOnly && (
        <Button color="success" disabled={employee.loading} block>
          {edit ? "Actualizar" : "Guardar"}
        </Button>
      )}
    </Form>
  );
};

AddEditEmployee.defaultProps = {
  employee: {},
  readOnly: false,
  edit: false,
};

AddEditEmployee.propTypes = {
  employee: PropTypes.object,
  readOnly: PropTypes.bool,
  edit: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onSubmit(e, data) {
    e.preventDefault();
    dispatch({ type: actions.employee.REQUEST_EMPLOYEE_UPDATE, payload: { ...data } });
  }
});

export default connect(
  null,
  mapDispatchToProps
)(AddEditEmployee);
