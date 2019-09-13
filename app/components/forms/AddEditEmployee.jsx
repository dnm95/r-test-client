import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Form, FormGroup, Label, Input, Button
} from "reactstrap";
import omit from "lodash/omit";
import { connect } from "helpers";
import actions from "actions";
import selectors from "selectors";

const AddEditEmployee = (props) => {
  const {
    employee, readOnly, edit, onSubmit
  } = props;
  const [data, setData] = useState({});
  useEffect(() => {
    setData({ ...omit(employee.active, ["attendance"]) });
  }, [employee]);
  return (
    <Form onSubmit={(e) => onSubmit(e, data)}>
      <FormGroup>
        <Label for="name">Nombre</Label>
        <Input
          type="text"
          name="name"
          id="name"
          placeholder="Nombre"
          autoComplete="off"
          onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
          disabled={employee.loading || readOnly}
          value={data.name || ""}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for="firstName">Apellido Paterno</Label>
        <Input
          type="text"
          name="first_name"
          id="first_name"
          placeholder="Apellido Paterno"
          autoComplete="off"
          onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
          disabled={employee.loading || readOnly}
          value={data.first_name || ""}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for="lastName">Apellido Materno</Label>
        <Input
          type="text"
          name="last_name"
          id="last_name"
          placeholder="Apellido Materno"
          autoComplete="off"
          onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
          disabled={employee.loading || readOnly}
          value={data.last_name || ""}
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
          value={data.rfc || ""}
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
          value={data.email || ""}
          required
        />
      </FormGroup>
      {!edit && !readOnly && (
        <>
          <FormGroup>
            <Label for="password">Contraseña</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Contraseña"
              autoComplete="off"
              onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
              disabled={employee.loading || readOnly}
              value={data.password || ""}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="role">Rol:</Label>
            <Input
              type="select"
              name="role"
              id="role"
              value={data.role || ""}
              onChange={(e) => setData({ ...data, role: e.target.value })}
              required
            >
              <option disabled value="">Selecciona una opción</option>
              <option value="user">Usuario</option>
              <option value="admin">Administrador</option>
            </Input>
          </FormGroup>
        </>
      )}
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

const mapStateToProps = (state) => ({
  employee: selectors.employee(state).employee,
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit(e, data) {
    e.preventDefault();
    dispatch({ type: actions.employee.REQUEST_EMPLOYEE_UPDATE, payload: { data } });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddEditEmployee);
