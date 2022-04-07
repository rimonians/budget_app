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
          toast.success(info);
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
          <span>বাজেট অ্যাপ</span>
        </Link>
      </div>
      <div className={classes.links}>
        {Object.keys(user).length === 0 ? (
          <>
            <Link to="/signin">
              <RiLoginBoxLine />
              সাইন ইন
            </Link>
            <Link to="/signup">
              <RiAccountPinBoxLine />
              সাইন আপ
            </Link>
          </>
        ) : (
          <>
            <Link to="/budget">
              <RiMoneyPoundCircleFill />
              বাজেট
            </Link>
            <button onClick={handleSignout}>
              <RiLogoutBoxLine /> সাইন আউট
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
