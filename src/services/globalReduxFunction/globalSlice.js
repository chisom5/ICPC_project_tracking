import { createSlice } from "@reduxjs/toolkit";
import GLOBAL_CONSTANT from "./type";
import update from "immutability-helper";

const initialState = {
  globalError: null,
  globalSuccess: null,
  successModal: false,
  countries: [],
  locations: [],
  isFetching: false,
  logout: false,
  currentView: "budget",
};

const requestingHome = (state, loading) =>
  update(state, {
    [loading]: {
      $set: true,
    },
  });

const handledCountriesFeteched = (state, { payload }) => {
  return update(state, {
    isFetching: {
      $set: false,
    },
    countries: {
      $set: payload?.embassyNames,
    },
  });
};

const handledLocationsFeteched = (state, { payload }) => {
  return update(state, {
    isFetching: {
      $set: false,
    },
    locations: {
      $set: payload?.embassyLocations,
    },
  });
};

const setLogoutSuccess = (state) => {
  return update(state, {
    logout: {
      $set: true,
    },
  });
};

const setCloseLogoutSuccess = (state) => {
  return update(state, {
    logout: {
      $set: false,
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

export const globalSlice = createSlice({
  name: "globalReducer",
  initialState,

  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GLOBAL_CONSTANT.currentViewSuccess, (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    });

    builder.addCase(GLOBAL_CONSTANT.setError, (state, action) => {
      return setErrorAction(state, action);
    });

    builder.addCase(GLOBAL_CONSTANT.getCountriesRequested, (state, action) => {
      return requestingHome(state, "isFetching");
    });
    builder.addCase(GLOBAL_CONSTANT.getCountriesError, (state, action) => {
      return handleError(state, action);
    });

    builder.addCase(GLOBAL_CONSTANT.getCountriesSuccess, (state, action) => {
      return handledCountriesFeteched(state, action);
    });

    builder.addCase(GLOBAL_CONSTANT.getLocationsRequested, (state, action) => {
      return requestingHome(state, "isFetching");
    });
    builder.addCase(GLOBAL_CONSTANT.getLocationsError, (state, action) => {
      return handleError(state, action);
    });

    builder.addCase(GLOBAL_CONSTANT.getLocationsSuccess, (state, action) => {
      return handledLocationsFeteched(state, action);
    });

    builder.addCase(GLOBAL_CONSTANT.clearErrorMessageSuccess, (state) => {
      return clearError(state);
    });

    builder.addCase(GLOBAL_CONSTANT.clearSuccessMessageSuccess, (state) => {
      return clearSuccessMessage(state);
    });

    builder.addCase(GLOBAL_CONSTANT.logoutSuccess, (state) => {
      return setLogoutSuccess(state);
    });

    builder.addCase(GLOBAL_CONSTANT.closeLogoutSuccess, (state) => {
      return setCloseLogoutSuccess(state);
    });
  },
});

export default globalSlice.reducer;
