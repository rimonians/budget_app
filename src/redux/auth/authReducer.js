import * as actions from "./authTypes";

const initialAuthState = {
  loading: true,
  user: {},
  err: "",
};

const authReducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case actions.AUTH_EXISTS_REQUEST:
      return { ...state, loading: true, user: {}, err: "" };
    case actions.AUTH_EXISTS:
      return { ...state, loading: false, user: action.payload, err: "" };
    case actions.AUTH_NOT_EXISTS:
      return { ...state, loading: false, user: {}, err: "" };
    default:
      return state;
  }
};

export default authReducer;
