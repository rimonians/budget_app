import React from "react";
import classes from "./Card.module.css";
import numbering from "../../utils/numbering";

const Card = ({ info, icon, ...rest }) => {
  return (
    <div className={classes.card} {...rest}>
      <h1>{icon}</h1>
      <h3>{info.text}</h3>
      <p>{numbering(info.totalAmount)} ৳</p>
    </div>
  );
};

export default Card;
