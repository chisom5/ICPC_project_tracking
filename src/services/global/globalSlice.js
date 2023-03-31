import { createSlice } from "@reduxjs/toolkit";
import GLOBAL_CONSTANT from "./type";
import update from "immutability-helper";

const initialState = {
  isAuthenticating: false,
  loggingOut: false,
  successModal: false,
  isFetching: false,
  logout: false,
  logoutIcon: false,
  globalError: null,
  globalSuccess: null,
  authUser: null,
  trackingId: null,
  storedTrackingYear: null,
  trackingStatus: null,
};

const requestingHome = (state, loading) =>
  update(state, {
    [loading]: {
      $set: true,
    },
  });

const userAuthenticated = (state, { payload }) => {
  return update(state, {
    isAuthenticating: {
      $set: false,
    },
    authUser: {
      $set: payload,
    },
    globalSuccess: {
      $set: payload ? "User authenticated" : null,
    },
  });
};

const handleSetTrackingStatus = (state, { payload }) => {
  return update(state, {
    isFetching: {
      $set: false,
    },
    trackingStatus: {
      $set: payload,
    },
  });
};

const clearError = (state) => {
  return update(state, {
    globalError: {
      $set: null,
    },
  });
};

const clearSuccessMessage = (state) =>
  update(state, {
    globalSuccess: {
      $set: null,
    },
  });

const setErrorAction = (state, { payload }) =>
  update(state, {
    globalError: {
      $set: payload,
    },
  });

const handleError = (state, { error }) => {
  return update(state, {
    isFetching: {
      $set: false,
    },
    isAuthenticating: {
      $set: false,
    },
    globalError: {
      $set: error,
    },
  });
};

export const globalSlice = createSlice({
  name: "globalReducer",
  initialState,

  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GLOBAL_CONSTANT.setError, (state, action) => {
      return setErrorAction(state, action);
    });

    builder.addCase(GLOBAL_CONSTANT.setTrackingIdSuccess, (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    });
    builder.addCase(
      GLOBAL_CONSTANT.inititateNewProjectSuccess,
      (state, action) => {
        return {
          ...state,
          ...action.payload,
        };
      }
    );

    builder.addCase(
      GLOBAL_CONSTANT.authenticateUserRequested,
      (state, action) => {
        return requestingHome(state, "isAuthenticating");
      }
    );
    builder.addCase(GLOBAL_CONSTANT.authenticateUserError, (state, action) => {
      return handleError(state, action);
    });

    builder.addCase(
      GLOBAL_CONSTANT.authenticateUserSuccess,
      (state, action) => {
        return userAuthenticated(state, action);
      }
    );

    builder.addCase(
      GLOBAL_CONSTANT.TrackingStatusRequested,
      (state, action) => {
        return requestingHome(state, "isFetching");
      }
    );
    builder.addCase(GLOBAL_CONSTANT.TrackingStatusError, (state, action) => {
      return handleError(state, action);
    });

    builder.addCase(GLOBAL_CONSTANT.TrackingStatusSuccess, (state, action) => {
      return handleSetTrackingStatus(state, action);
    });

    builder.addCase(GLOBAL_CONSTANT.clearErrorMessageSuccess, (state) => {
      return clearError(state);
    });

    builder.addCase(GLOBAL_CONSTANT.clearSuccessMessageSuccess, (state) => {
      return clearSuccessMessage(state);
    });

    builder.addCase(GLOBAL_CONSTANT.logoutSuccess, (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    });

    builder.addCase(GLOBAL_CONSTANT.closeLogoutSuccess, (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    });
  },
});

export default globalSlice.reducer;
