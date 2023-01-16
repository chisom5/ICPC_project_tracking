import { createSlice } from "@reduxjs/toolkit";
import PROJECTS_CONSTANT from "./type";
import update from "immutability-helper";

const initialState = {
  error: null,
  success: null,
  isFetching: false,
  currentTab: "Project List",
  anomalies_type: "Overview"
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

export const projectsSlice = createSlice({
  name: "projectsReducer",
  initialState,

  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(PROJECTS_CONSTANT.currentTabSuccess, (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    });
    builder.addCase(PROJECTS_CONSTANT.anomaliesTypeSuccess, (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    });
    builder.addCase(PROJECTS_CONSTANT.setError, (state, action) => {
      return setErrorAction(state, action);
    });

    // builder.addCase(PROJECTS_CONSTANT.getCountriesRequested, (state, action) => {
    //   return requestingHome(state, "isFetching");
    // });
    // builder.addCase(PROJECTS_CONSTANT.getCountriesError, (state, action) => {
    //   return handleError(state, action);
    // });

    // builder.addCase(PROJECTS_CONSTANT.getCountriesSuccess, (state, action) => {
    //   return handledCountriesFeteched(state, action);
    // });

    builder.addCase(PROJECTS_CONSTANT.clearErrorMessageSuccess, (state) => {
      return clearError(state);
    });

    builder.addCase(PROJECTS_CONSTANT.clearSuccessMessageSuccess, (state) => {
      return clearSuccessMessage(state);
    });
  },
});

export default projectsSlice.reducer;
