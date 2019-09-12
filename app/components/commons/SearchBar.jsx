import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  InputGroup, InputGroupAddon, Button, Input
} from "reactstrap";
import { connect } from "helpers";
import actions from "actions";

const SearchBar = (props) => {
  const { onSearchAttendances } = props;
  const [query, setQuery] = useState("");
  return (
    <InputGroup>
      <Input
        placeholder="Buscar nombre o email..."
        name="search"
        id="search"
        autoComplete="off"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <InputGroupAddon addonType="append">
        <Button color="success" onClick={() => onSearchAttendances(query)}>
          Buscar
        </Button>
      </InputGroupAddon>
    </InputGroup>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func,
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

