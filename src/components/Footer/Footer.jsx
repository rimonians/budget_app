import React from "react";
import classes from "./Footer.module.css";
import { FaRegCopyright } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className={classes.footer}>
      <p>
        Copyright <FaRegCopyright /> <Link to="/">Budget App</Link>
      </p>
    </div>
  );
};

export default Footer;
