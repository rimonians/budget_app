import * as actions from "./budgetTypes";

const initialBudgetState = {
  loading: true,
  budget: [],
  totalIncome: 0,
  totalExpense: 0,
  err: "",
};

const budgetReducer = (state = initialBudgetState, action) => {
  switch (action.type) {
    case actions.BUDGET_GET_REQUEST:
      return { ...state, loading: true };
    case actions.BUDGET_GET_SUCCESS:
      const totalAmount = action.payload.reduce(
        (acc, el) => {
          if (el.type === "income") {
            return [(acc[0] += el.amount), acc[1]];
          } else {
            return [acc[0], (acc[1] += el.amount)];
          }
        },
        [0, 0]
      );

      return {
        ...state,
        loading: false,
        budget: action.payload,
        totalIncome: totalAmount[0],
        totalExpense: totalAmount[1],
        err: "",
      };
    case actions.BUDGET_GET_FAILURE:
      return {
        ...state,
        loading: false,
        budget: [],
        totalIncome: 0,
        totalExpense: 0,
        err: action.payload,
      };
    default:
      return state;
  }
};

export default budgetReducer;
