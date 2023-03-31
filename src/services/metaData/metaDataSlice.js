import { createSlice } from "@reduxjs/toolkit";
import META_DATA_CONSTANT from "./type";
import update from "immutability-helper";

const initialState = {
  isFetching: false,
  trackingYearList: [],
  budgetTypesList: [],
  DefaultCriteria: null,
  DefaultMetaData: null,
  gettingMetaData: false,
};

const requestingHome = (state, loading) =>
  update(state, {
    [loading]: {
      $set: true,
    },
  });

const handleAllTrackingInstance = (state, { payload }) => {
  return update(state, {
    isFetching: {
      $set: false,
    },
    trackingYearList: {
      $set: payload,
    },
  });
};

const handleAllBudgetTypes = (state, { payload }) => {
  return update(state, {
    isFetching: {
      $set: false,
    },
    budgetTypesList: {
      $set: payload,
    },
  });
};

const handleDefaultSelectionCriteria = (state, { payload }) => {
  return update(state, {
    DefaultCriteria: {
      $set: payload,
    },
  });
};

const handleMetaDataFetched = (state, { payload }) => {
  return update(state, {
    gettingMetaData: {
      $set: false,
    },
    DefaultMetaData: {
      $set: payload,
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

    gettingMetaData: {
      $set: false,
    },
    error: {
      $set: error,
    },
  });
};

export const metaDataSlice = createSlice({
  name: "metaDataReducer",
  initialState,

  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(META_DATA_CONSTANT.setError, (state, action) => {
      return setErrorAction(state, action);
    });

    builder.addCase(
      META_DATA_CONSTANT.allTrackingInstanceRequested,
      (state, action) => {
        return requestingHome(state, "isFetching");
      }
    );
    builder.addCase(
      META_DATA_CONSTANT.allTrackingInstanceError,
      (state, action) => {
        return handleError(state, action);
      }
    );

    builder.addCase(
      META_DATA_CONSTANT.allTrackingInstanceSuccess,
      (state, action) => {
        return handleAllTrackingInstance(state, action);
      }
    );

    builder.addCase(
      META_DATA_CONSTANT.getMetaDataRequested,
      (state, action) => {
        return requestingHome(state, "gettingMetaData");
      }
    );
    builder.addCase(META_DATA_CONSTANT.getMetaDataError, (state, action) => {
      return handleError(state, action);
    });

    builder.addCase(META_DATA_CONSTANT.getMetaDataSuccess, (state, action) => {
      return handleMetaDataFetched(state, action);
    });

    builder.addCase(
      META_DATA_CONSTANT.allBudgetTypesRequested,
      (state, action) => {
        return requestingHome(state, "isFetching");
      }
    );
    builder.addCase(META_DATA_CONSTANT.allBudgetTypesError, (state, action) => {
      return handleError(state, action);
    });

    builder.addCase(
      META_DATA_CONSTANT.allBudgetTypesSuccess,
      (state, action) => {
        return handleAllBudgetTypes(state, action);
      }
    );

    builder.addCase(
      META_DATA_CONSTANT.getDefaultProjectSelectionCriteriaRequested,
      (state, action) => {
        return requestingHome(state, "");
      }
    );
    builder.addCase(
      META_DATA_CONSTANT.getDefaultProjectSelectionCriteriaError,
      (state, action) => {
        return handleError(state, action);
      }
    );

    builder.addCase(
      META_DATA_CONSTANT.getDefaultProjectSelectionCriteriaSuccess,
      (state, action) => {
        return handleDefaultSelectionCriteria(state, action);
      }
    );

    builder.addCase(META_DATA_CONSTANT.clearErrorMessageSuccess, (state) => {
      return clearError(state);
    });

    builder.addCase(META_DATA_CONSTANT.clearSuccessMessageSuccess, (state) => {
      return clearSuccessMessage(state);
    });
  },
});

export default metaDataSlice.reducer;
