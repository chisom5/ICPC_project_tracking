import { createSlice } from "@reduxjs/toolkit";
import FORGOTPASSWORD_CONSTANT from "./type";
import update from "immutability-helper";

const initialState = {
  error: null,
  success: null,
  page: "forgetP1",
};

const requestingHome = (state, loading) =>
  update(state, {
    [loading]: {
      $set: true,
    },
  });

const setErrorAction = (state, action) => {
  return update(state, {
    error: {
      $set: action.error,
    },
  });
};
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

const handleError = (state, { error }) => {
  return update(state, {
    error: {
      $set: error,
    },
  });
};

export const forgotPasswordSlice = createSlice({
  name: "forgotPasswordReducer",
  initialState,

  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(FORGOTPASSWORD_CONSTANT.setPageSuccess, (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    });
    //
    // builder.addCase(
    //   FORGOTPASSWORD_CONSTANT.EmbassyRequestRequested,
    //   (state, action) => {
    //     return requestingHome(state, "isCreating");
    //   }
    // );
    // builder.addCase(
    //   FORGOTPASSWORD_CONSTANT.EmbassyRequestError,
    //   (state, action) => {
    //     return handleError(state, action);
    //   }
    // );

    // builder.addCase(
    //   FORGOTPASSWORD_CONSTANT.EmbassyRequestSuccess,
    //   (state, action) => {
    //     return handledCreatedRequest(state, action);
    //   }
    // );

    builder.addCase(FORGOTPASSWORD_CONSTANT.setError, (state, action) => {
      return setErrorAction(state, action);
    });

    builder.addCase(FORGOTPASSWORD_CONSTANT.clearErrorMessageSuccess, (state) => {
      return clearError(state);
    });

    builder.addCase(
      FORGOTPASSWORD_CONSTANT.clearSuccessMessageSuccess,
      (state) => {
        return clearSuccessMessage(state);
      }
    );
  },
});

export default forgotPasswordSlice.reducer;
