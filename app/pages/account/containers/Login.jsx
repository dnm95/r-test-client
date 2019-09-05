import React from "react";
import HOC from "HOC";

const Login = (props) => {
  // eslint-disable-next-line react/prop-types
  const { next } = props.router.query;
  return (
    <div>
      <div>
        <form method="post" action="/authentication">
          {/* eslint-disable-next-line react/prop-types */}
          <input type="hidden" name="_csrf" value={props.csrfToken} />
          <input type="hidden" name="next" value={next} />
          <input type="text" name="email" />
          <br />
          <input type="password" name="password" />
          <br />
          <button type="submit">Go</button>
          {" "}
          <a href="/">Go home</a>
        </form>
      </div>
    </div>
  );
};


export default HOC()(Login);
