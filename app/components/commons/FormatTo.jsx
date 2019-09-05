import React from "react";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";


const Formatter = props => (
  <NumberFormat
    decimalScale={props.decimalScale}
    thousandSeparator=","
    value={props.value}
    type={props.type}
    displayType={props.displayType}
    prefix={props.prefix}
    suffix={props.suffix}
    fixedDecimalScale
  />
);

Formatter.defaultProps = {
  value: "",
  type: "text",
  displayType: "text",
  prefix: "",
  suffix: "",
  decimalScale: 2
};

Formatter.propTypes = {
  displayType: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  type: PropTypes.string,
  prefix: PropTypes.string,
  suffix: PropTypes.string,
  decimalScale: PropTypes.number
};

const FormatTo = () => (
  <div>
    <div>FormatTo.Pesos</div>
    <div>FormatTo.Percent</div>
    <div>FormatTo.Number</div>
  </div>
);

FormatTo.Pesos = props => (
  <Formatter
    prefix="$"
    {...props}
  />
);

FormatTo.Percent = props => (
  <Formatter
    suffix="%"
    {...props}
  />
);

FormatTo.Number = props => (
  <Formatter
    displayType="input"
    decimalScale={props.decimalScale}
    className={props.className}
    {...props}
  />
);

FormatTo.Number.defaultProps = {
  className: "",
  decimalScale: 0
};

FormatTo.Number.propTypes = {
  className: PropTypes.string,
  decimalScale: PropTypes.number
};


export default FormatTo;
