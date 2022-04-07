import * as actions from "./authTypes";
import { auth } from "../../firebase.config";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

export const authSignupRequest = () => {
  return {
    type: actions.AUTH_SIGNUP_REQUEST,
  };
};

export const authSignupSuccess = (payload) => {
  return {
    type: actions.AUTH_SIGNUP_SUCCESS,
    payload: payload,
  };
};

export const authSignupFailure = (payload) => {
  return {
    type: actions.AUTH_SIGNUP_FAILURE,
    payload: payload,
  };
};

export const authSigninRequest = () => {
  return {
    type: actions.AUTH_SIGNIN_REQUEST,
  };
};

export const authSigninSuccess = (payload) => {
  return {
    type: actions.AUTH_SIGNIN_SUCCESS,
    payload: payload,
  };
};

export const authSigninFailure = (payload) => {
  return {
    type: actions.AUTH_SIGNIN_FAILURE,
    payload: payload,
  };
};

export const authSignoutRequest = () => {
  return {
    type: actions.AUTH_SIGNOUT_REQUEST,
  };
};

export const authSignoutSuccess = () => {
  return {
    type: actions.AUTH_SIGNOUT_SUCCESS,
  };
};

export const authSignoutFailure = (payload) => {
  return {
    type: actions.AUTH_SIGNOUT_FAILURE,
    payload: payload,
  };
};

export const authExistsRequest = () => {
  return {
    type: actions.AUTH_EXISTS_REQUEST,
  };
};

export const authExists = (payload) => {
  return {
    type: actions.AUTH_EXISTS,
    payload: payload,
  };
};

export const authNotExists = () => {
  return {
    type: actions.AUTH_NOT_EXISTS,
  };
};

export const authSignupInitiate = (username, email, password, cb) => {
  return async (dispatch) => {
    dispatch(authSignupRequest());
    try {
      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(credential.user, { displayName: username });
      const user = credential.user;
      dispatch(
        authSignupSuccess({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        })
      );
      cb(user, "সাইন আপ সফল হয়েছে");
    } catch (err) {
      dispatch(authSignupFailure(err.message));
      cb(null, err.message);
    }
  };
};

export const authSigninInitiate = (email, password, cb) => {
  return async (dispatch) => {
    dispatch(authSigninRequest());
    try {
      const credential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = credential.user;
      dispatch(
        authSigninSuccess({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        })
      );
      cb(user, "সাইন ইন সফল হয়েছে");
    } catch (err) {
      dispatch(authSigninFailure(err.message));
      cb(null, err.message);
    }
  };
};

export const authSignoutInitiate = (cb) => {
  return async (dispatch) => {
    dispatch(authSignoutRequest());
    try {
      await signOut(auth);
      dispatch(authSignoutSuccess());
      cb(200, "সাইন আউট সফল হয়েছে");
    } catch (err) {
      dispatch(authSignoutFailure(err.message));
      cb(500, "সাইন আউট করতে সমস্যা হয়েছে");
    }
  };
};

export const authExistenceInitiate = () => {
  return (dispatch) => {
    dispatch(authExistsRequest());
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          authExists({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
          })
        );
      } else {
        dispatch(authNotExists());
      }
    });
  };
};
