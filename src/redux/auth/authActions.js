import * as actions from "./authTypes";
import { auth } from "../../firebase/firebase.config";
import { onAuthStateChanged } from "firebase/auth";

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

// Auth existence initate functionality
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
