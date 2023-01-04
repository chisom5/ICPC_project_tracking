import { createSlice } from "@reduxjs/toolkit";
import BUDGET_CONSTANT from "./type";
import update from "immutability-helper";

const initialState = {
  error: null,
  success: null,
  isFetching: false,
};

const requestingHome = (state, loading) =>
  update(state, {
    [loading]: {
      $set: true,
    },
  });

const clearError = (state) => {
  return update(state, {
    error: {
      $set: null,
    },
  });
};

const clearSuccessMessage = (state) =>
  update(state, {
    success: {
      $set: null,
    },
  });

const setErrorAction = (state, { payload }) =>
  update(state, {
    error: {
      $set: payload,
    },
  });

const handleError = (state, { error }) => {
  return update(state, {
    isFetching: {
      $set: false,
    },

    error: {
      $set: error,
    },
  });
};

export const budgetPageSlice = createSlice({
  name: "budgetReducer",
  initialState,

  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(BUDGET_CONSTANT.setError, (state, action) => {
      return setErrorAction(state, action);
    });

    // builder.addCase(BUDGET_CONSTANT.getCountriesRequested, (state, action) => {
    //   return requestingHome(state, "isFetching");
    // });
    // builder.addCase(BUDGET_CONSTANT.getCountriesError, (state, action) => {
    //   return handleError(state, action);
    // });

    // builder.addCase(BUDGET_CONSTANT.getCountriesSuccess, (state, action) => {
    //   return handledCountriesFeteched(state, action);
    // });

    builder.addCase(BUDGET_CONSTANT.clearErrorMessageSuccess, (state) => {
      return clearError(state);
    });

    builder.addCase(BUDGET_CONSTANT.clearSuccessMessageSuccess, (state) => {
      return clearSuccessMessage(state);
    });
  },
});

export default budgetPageSlice.reducer;
