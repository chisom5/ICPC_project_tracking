import { createSlice } from "@reduxjs/toolkit";
import FORGOTPASSWORD_CONSTANT from "./type";
import update from "immutability-helper";

const initialState = {
  isLoading: false,
  error: null,
  success: null,
  page: "forgetP1",
  resetPLink: null,
  successResetP: null,
};

const requestingHome = (state, loading) =>
  update(state, {
    [loading]: {
      $set: true,
    },
  });

const resetLinkSentToMail = (state, { payload }) => {
  return update(state, {
    isLoading: {
      $set: false,
    },
    resetPLink: {
      $set: payload.data,
    },
    success: {
      $set: payload ? payload.message : null,
    },
  });
};

const handleSuccessResetP = (state, { payload }) => {
  return update(state, {
    isLoading: {
      $set: false,
    },
    successResetP: {
      $set: payload,
    },
    success: {
      $set: payload ? "Your password has been successfully reset" : null,
    },
  });
};
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
    isLoading: {
      $set: false,
    },
    // isAuthenticating: {
    //   $set: false
    // },
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
    builder.addCase(
      FORGOTPASSWORD_CONSTANT.forgotPasswordRequested,
      (state, action) => {
        return requestingHome(state, "isLoading");
      }
    );
    builder.addCase(
      FORGOTPASSWORD_CONSTANT.forgotPasswordError,
      (state, action) => {
        return handleError(state, action);
      }
    );

    builder.addCase(
      FORGOTPASSWORD_CONSTANT.forgotPasswordSuccess,
      (state, action) => {
        return resetLinkSentToMail(state, action);
      }
    );

    builder.addCase(
      FORGOTPASSWORD_CONSTANT.resetPasswordRequested,
      (state, action) => {
        return requestingHome(state, "isLoading");
      }
    );
    builder.addCase(
      FORGOTPASSWORD_CONSTANT.resetPasswordError,
      (state, action) => {
        return handleError(state, action);
      }
    );

    builder.addCase(
      FORGOTPASSWORD_CONSTANT.resetPasswordSuccess,
      (state, action) => {
        return handleSuccessResetP(state, action);
      }
    );

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

    builder.addCase(
      FORGOTPASSWORD_CONSTANT.clearErrorMessageSuccess,
      (state) => {
        return clearError(state);
      }
    );

    builder.addCase(
      FORGOTPASSWORD_CONSTANT.clearSuccessMessageSuccess,
      (state) => {
        return clearSuccessMessage(state);
      }
    );
  },
});

export default forgotPasswordSlice.reducer;
