import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, FormGroup, Label, Input, Button, Row, Col } from 'reactstrap';
import { connect } from "helpers";
import actions from "actions";
import selectors from "selectors";

const EmployeeInfo = (props) => {
  const { loading, employee, onSubmit } = props;
  const [data, setData] = useState({});
  const [edit, setEdit] = useState(false);
  return (
    <>
      <Row>
        <Col sm="12" style={{ padding: "1em 15px" }}>
          <Button color="info" onClick={() => setEdit(!edit)} disabled={loading || edit}>
            Editar Información
          </Button>
        </Col>
      </Row>
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
            disabled={loading || !edit}
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
            disabled={loading || !edit}
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
            disabled={loading || !edit}
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
            disabled={loading || !edit}
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
            disabled={loading || !edit}
            required
          />
        </FormGroup>
        <Button color="success" disabled={loading || !edit}>
          Guardar
        </Button>
        <Button className="float-right" color="danger" disabled={loading || !edit} onClick={() => setEdit(!edit)}>
          Cancelar
        </Button>
      </Form>
    </>
  );
};

EmployeeInfo.defaultProps = {
  onSubmit() {},
  employee: {},
};

EmployeeInfo.propTypes = {
  employee: PropTypes.object,
  onSubmit: PropTypes.func,
};

const mapStateToProps = state => ({
  employee: selectors.employee(state).employee,
});

const mapDispatchToProps = dispatch => ({
  onSubmit(e, data) {
    e.preventDefault();
    dispatch({ type: actions.employee.REQUEST_EMPLOYEE_UPDATE, payload: { ...data } });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeInfo);
