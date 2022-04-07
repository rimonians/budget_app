import React from "react";

const Input = ({ ...rest }) => {
  return <input {...rest} spellCheck="false" autoComplete="off" />;
};

export default Input;
