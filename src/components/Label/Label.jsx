import React from "react";
import classes from "./Label.module.css";

const Label = ({ children, ...rest }) => {
  return (
    <label {...rest} className={classes.label}>
      {children}
    </label>
  );
};

export default Label;
