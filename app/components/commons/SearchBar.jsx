import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Form, InputGroup, InputGroupAddon, Button, Input
} from "reactstrap";
import { connect } from "helpers";
import actions from "actions";

const SearchBar = (props) => {
  const { loading, onSearchAttendances } = props;
  const [query, setQuery] = useState("");
  return (
    <Form onSubmit={(e) => { e.preventDefault(); onSearchAttendances(query); }}>
      <InputGroup>
        <Input
          placeholder="Buscar por nombre o email..."
          name="search"
          id="search"
          autoComplete="off"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={loading}
        />
        <InputGroupAddon addonType="append">
          <Button color="success" onClick={() => onSearchAttendances(query)}>
            {loading ? (
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
            ) : "Buscar"}
          </Button>
        </InputGroupAddon>
      </InputGroup>
    </Form>
  );
};

SearchBar.propTypes = {
  onSearchAttendances: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapDispatchToProps = (dispatch) => ({
  onSearchAttendances(query) {
    dispatch({
      type: actions.employee.SEARCH_EMPLOYEES_ATTENDANCES,
      payload: { query },
    });
  }
});

export default connect(
  null,
  mapDispatchToProps
)(SearchBar);
