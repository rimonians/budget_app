import React from "react";
import classes from "./NotFound.module.css";

const NotFound = () => {
  return (
    <div className={classes.notFound}>
      <h3>Your requested page wasn't found</h3>
    </div>
  );
};

export default NotFound;
