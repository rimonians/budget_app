import React from "react";
import classes from "./Footer.module.css";
import { FaRegCopyright } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className={classes.footer}>
      <p>
        কপিরাইট <FaRegCopyright /> <Link to="/">বাজেট অ্যাপ</Link>
      </p>
    </div>
  );
};

export default Footer;
