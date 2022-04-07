import * as actions from "./authTypes";

const initialAuthState = {
  loading: true,
  user: {},
  err: "",
};

const authReducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case actions.AUTH_SIGNUP_REQUEST:
    case actions.AUTH_SIGNIN_REQUEST:
    case actions.AUTH_SIGNOUT_REQUEST:
    case actions.AUTH_EXISTS_REQUEST:
      return { ...state, user: {}, err: "" };
    case actions.AUTH_SIGNUP_SUCCESS:
    case actions.AUTH_SIGNIN_SUCCESS:
    case actions.AUTH_EXISTS:
      return { ...state, loading: false, user: action.payload, err: "" };
    case actions.AUTH_SIGNUP_FAILURE:
    case actions.AUTH_SIGNIN_FAILURE:
    case actions.AUTH_SIGNOUT_FAILURE:
      return { ...state, loading: false, user: {}, err: action.payload };
    case actions.AUTH_SIGNOUT_SUCCESS:
    case actions.AUTH_NOT_EXISTS:
      return { ...state, loading: false, user: {}, err: "" };
    default:
      return state;
  }
};

export default authReducer;
