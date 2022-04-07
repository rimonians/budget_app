import React from "react";
import classes from "./Header.module.css";
import { Link } from "react-router-dom";
import {
  RiMoneyDollarCircleFill,
  RiLoginBoxLine,
  RiAccountPinBoxLine,
  RiLogoutBoxLine,
  RiMoneyPoundCircleFill,
} from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { authSignoutInitiate } from "../../redux/auth/authActions";
import { budgetGetSuccess } from "../../redux/budget/budgetActions";
import { toast } from "react-toastify";

const Header = () => {
  const authState = useSelector((state) => state.auth);
  const { user } = authState;
  const dispatch = useDispatch();

  const handleSignout = () => {
    dispatch(
      authSignoutInitiate((status, info) => {
        if (status === 200) {
          dispatch(budgetGetSuccess([]));
          toast.success("Signout successfull");
        } else {
          toast.error(info);
        }
      })
    );
  };

  return (
    <div className={classes.header}>
      <div className={classes.logo}>
        <Link to="/">
          <RiMoneyDollarCircleFill />
          <span>Budget App</span>
        </Link>
      </div>
      <div className={classes.links}>
        {Object.keys(user).length === 0 ? (
          <>
            <Link to="/signin">
              <RiLoginBoxLine />
              Signin
            </Link>
            <Link to="/signup">
              <RiAccountPinBoxLine />
              Signup
            </Link>
          </>
        ) : (
          <>
            <Link to="/budget">
              <RiMoneyPoundCircleFill />
              Budget
            </Link>
            <button onClick={handleSignout}>
              <RiLogoutBoxLine /> Signout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
