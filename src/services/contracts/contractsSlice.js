import { createSlice } from "@reduxjs/toolkit";
import CONTRACTS_CONSTANT from "./type";
import update from "immutability-helper";

const initialState = {
  error: null,
  success: null,
  isFetching: false,
  isUploading: false,
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

export const contractsPageSlice = createSlice({
  name: "contractsReducer",
  initialState,

  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(CONTRACTS_CONSTANT.setError, (state, action) => {
      return setErrorAction(state, action);
    });

    // builder.addCase(CONTRACTS_CONSTANT.getCountriesRequested, (state, action) => {
    //   return requestingHome(state, "isFetching");
    // });
    // builder.addCase(CONTRACTS_CONSTANT.getCountriesError, (state, action) => {
    //   return handleError(state, action);
    // });

    // builder.addCase(CONTRACTS_CONSTANT.getCountriesSuccess, (state, action) => {
    //   return handledCountriesFeteched(state, action);
    // });

    builder.addCase(CONTRACTS_CONSTANT.clearErrorMessageSuccess, (state) => {
      return clearError(state);
    });

    builder.addCase(CONTRACTS_CONSTANT.clearSuccessMessageSuccess, (state) => {
      return clearSuccessMessage(state);
    });
  },
});

export default contractsPageSlice.reducer;
