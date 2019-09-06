import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  InputGroup, InputGroupAddon, Button, Input
} from "reactstrap";

const SearchBar = (props) => {
  const { onSearch } = props;
  const [query, setQuery] = useState("");
  return (
    <InputGroup>
      <Input
        placeholder="Buscar empleado..."
        name="search"
        id="search"
        autoComplete="off"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <InputGroupAddon addonType="append">
        <Button color="success" onClick={() => onSearch(query)}>
          Buscar
        </Button>
      </InputGroupAddon>
    </InputGroup>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func,
};

export default SearchBar;
