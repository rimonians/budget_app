import * as actions from "./budgetTypes";
import { colRef } from "../../firebase.config";
import { onSnapshot, query, where, orderBy } from "firebase/firestore";

export const budgetGetRequest = () => {
  return {
    type: actions.BUDGET_GET_REQUEST,
  };
};

export const budgetGetSuccess = (payload) => {
  return {
    type: actions.BUDGET_GET_SUCCESS,
    payload,
  };
};

export const budgetGetFailure = () => {
  return {
    type: actions.BUDGET_GET_FAILURE,
  };
};

export const budgetGetInitiate = (uid) => {
  return (dispatch) => {
    const q = query(colRef, where("userId", "==", uid), orderBy("createAt"));
    dispatch(budgetGetRequest());
    onSnapshot(q, (snapshot) => {
      const budget = [];
      snapshot.docs.map((item) => {
        budget.push({ ...item.data(), id: item.id });
      });
      dispatch(budgetGetSuccess(budget));
    });
  };
};
