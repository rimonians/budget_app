import React from "react";
import classes from "./Layout.module.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className={classes.main}>{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
