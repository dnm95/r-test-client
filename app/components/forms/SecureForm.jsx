import React from "react";
import { Form, Button } from "reactstrap";
import PropTypes from "prop-types";


const Login = ({
  children, next, action, buttonProps
}) => (
  <Form method="post" action={action} onSubmit={() => {}}>
    <input type="hidden" name="next" value={next} />
    { children }
    <Button type="submit" color="primary" size="lg" block>
      { buttonProps.copy }
    </Button>
  </Form>
);

Login.defaultProps = {
  next: "",
  action: "",
  buttonProps: {
    copy: "Login",
    classNames: "",
  },
  children: ""
};

Login.propTypes = {
  next: PropTypes.string,
  children: PropTypes.node,
  action: PropTypes.string,
  buttonProps: PropTypes.objectOf(PropTypes.string),
};

export default Login;
