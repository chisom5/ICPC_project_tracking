import { createSlice } from "@reduxjs/toolkit";
import BUDGET_CONSTANT from "./type";
import update from "immutability-helper";

const initialState = {
  error: null,
  success: null,
  isFetching: false,
  isAdding: false,
  isDeleting: false,
  isRequesting: false,
  isReviewing: false,
  isUploading: false,
  budgetTrackingList: null,
  adminBudgetTrackingList: null,
  projectTrackingList: null,
  projectTrackingListCopy: null,
  budgetYearList: null,
  budgetAdded: null,
  addTrackingCycle: null,
  isIgnoring: false,
  isIgnoringAll: false,
  isPreviewing: false,
  currentView: "budget",
  SelectedAnomalData: [],
  AnomalData: [],
  budgetStatitics: [],
  anomaliesData: [],
  duplicateProjects: null,
  isViewing: false,
  pagingData: null,
  selectedBudgetType: "",
  selectedValFilter: "All",
  isOtherProject: false,
};

const requestingHome = (state, loading) =>
  update(state, {
    [loading]: {
      $set: true,
    },
  });

const handleBudgetYearList = (state, { payload }) => {
  return update(state, {
    budgetYearList: {
      $set: payload,
    },
  });
};

const handleBudgetAdded = (state, { payload }) => {
  return update(state, {
    isPreviewing: {
      $set: false,
    },
    budgetAdded: {
      $set: payload,
    },
  });
};

const handleBudgetAddedForAdmin = (state, { payload }) => {
  return update(state, {
    isAdding: {
      $set: false,
    },

    success: {
      $set: `Budget successfully uploaded.`,
    },
  });
};
const handleAddTracking = (state, { payload }) => {
  return update(state, {
    isAdding: {
      $set: false,
    },
    addTrackingCycle: {
      $set: payload,
    },

  });
};

const handleAdminBudgetTrackingList = (state, { payload }) => {
  return update(state, {
    isFetching: {
      $set: false,
    },
    adminBudgetTrackingList: {
      $set: payload,
    },
  });
};

const handleBudgetTrackingList = (state, { payload }) => {
  return update(state, {
    isFetching: {
      $set: false,
    },
    budgetTrackingList: {
      $set: payload,
    },
  });
};

const handleProjectsTrackingList = (state, { payload }) => {
  return update(state, {
    isRequesting: {
      $set: false,
    },
    projectTrackingList: {
      $set: payload.data,
    },
    projectTrackingListCopy: {
      $set: payload.data,
    },
    pagingData: {
      $set: payload.metaData,
    },
    currentView: {
      $set: payload ? "anomalies" : state.currentView,
    },
  });
};

const handleUploadBudget = (state, { payload }) => {
  return update(state, {
    isUploading: {
      $set: false,
    },

    success: {
      $set: "Budget uploaded successfully, You can proceed with the process of project pre-selection",
    },
    currentView: {
      $set: payload ? "budget" : state.currentView,
    },
  });
};

const handleRemovedBudget = (state, { payload }) => {
  const index = state.budgetTrackingList?.findIndex((i) => i.Id === payload.Id);

  return update(state, {
    isDeleting: {
      $set: false,
    },
    budgetTrackingList: {
      $splice: [[index, 1]],
    },
  });
};

const handleAdminRemovedBudget = (state, { payload }) => {
  const index = state.adminBudgetTrackingList?.findIndex(
    (i) => i.Id === payload.Id
  );

  return update(state, {
    isDeleting: {
      $set: false,
    },
    adminBudgetTrackingList: {
      $splice: [[index, 1]],
    },
  });
};

const handleReviewedAnomal = (state, { payload }) => {
  return update(state, {
    isReviewing: {
      $set: false,
    },
    AnomalData: {
      $set: payload,
    },
  });
};

const handleSpecificAnomaly = (state, { payload }) => {
  const ind = state.AnomalData.findIndex((item) => item.Id === payload.Id);

  const pjInd = state.projectTrackingList.findIndex(
    (item) => item.Id === payload.TempProjectId
  );

  return update(state, {
    isIgnoring: {
      $set: false,
    },
    AnomalData: {
      [ind]: {
        $set: payload,
      },
    },
    SelectedAnomalData: {
      [0]: {
        $set: payload.TempProject,
      },
    },
    projectTrackingList: {
      [pjInd]: {
        $set: payload.TempProject,
      },
    },
    projectTrackingListCopy: {
      [pjInd]: {
        $set: payload.TempProject,
      },
    },
    success: {
      $set: "Anomaly Successful Ignored",
    },
  });
};

const handleIgnoreAllAnomaly = (state, { payload }) => {
  const pjInd = state.projectTrackingList.findIndex(
    (item) => item.Id === payload.projectId
  );

  return update(state, {
    projectTrackingList: {
      [pjInd]: {
        $merge: {
          HasAnomaly: 1,
          IgnoreAnomaly: 1,
        },
      },
    },
    projectTrackingListCopy: {
      [pjInd]: {
        $merge: {
          HasAnomaly: 1,
          IgnoreAnomaly: 1,
        },
      },
    },
    currentView: {
      $set: "anomalies",
    },
    success: {
      $set: "All Anomaly Successful Ignored",
    },
  });
};

const handleBudgetStats = (state, { payload }) => {
  return update(state, {
    isViewing: {
      $set: false,
    },
    budgetStatitics: {
      $set: payload,
    },
  });
};

const handlefetchAnomaliesData = (state, { payload }) => {
  return update(state, {
    isViewing: {
      $set: false,
    },
    anomaliesData: {
      $set: payload,
    },
  });
};

const handlefetchDuplicateData = (state, { payload }) => {
  return update(state, {
    isViewing: {
      $set: false,
    },
    duplicateProjects: {
      $set: payload,
    },
  });
};

const filterRecordOfAnomalyTable = (state, { payload }) => {
  if (payload === "All") {
    return update(state, {
      projectTrackingList: {
        $set: state.projectTrackingListCopy,
      },
      selectedValFilter: {
        $set: payload,
      },
    });
  } else {
    const filteredData = state.projectTrackingListCopy.filter(
      (item) => item.HasAnomaly === payload
    );

    return update(state, {
      projectTrackingList: {
        $set: filteredData,
      },
      selectedValFilter: {
        $set: payload,
      },
    });
  }
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

const setErrorAction = (state, { error }) => {
  return update(state, {
    error: {
      $set: error,
    },
  });
};

const setSuccessAction = (state, { payload }) => {
  return update(state, {
    success: {
      $set: payload,
    },
  });
};

const handleError = (state, { error }) => {
  return update(state, {
    isFetching: {
      $set: false,
    },
    isRequesting: {
      $set: false,
    },
    isUploading: {
      $set: false,
    },
    isReviewing: {
      $set: false,
    },
    isAdding: {
      $set: false,
    },
    isIgnoring: {
      $set: false,
    },
    isIgnoringAll: {
      $set: false,
    },
    isPreviewing: {
      $set: false,
    },
    isDeleting: {
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
    builder.addCase(BUDGET_CONSTANT.modalSuccess, (state, action) => ({
      ...state,
      ...action.payload,
    }));

    builder.addCase(BUDGET_CONSTANT.currentViewSuccess, (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    });
    builder.addCase(
      BUDGET_CONSTANT.selectBudgetTypeSuccess,
      (state, action) => {
        return {
          ...state,
          ...action.payload,
        };
      }
    );

    builder.addCase(
      BUDGET_CONSTANT.budgetTrackingListSuccess,
      (state, action) => {
        return {
          ...state,
          ...action.payload,
        };
      }
    );
    builder.addCase(BUDGET_CONSTANT.setError, (state, action) => {
      return setErrorAction(state, action);
    });
    builder.addCase(BUDGET_CONSTANT.setSuccess, (state, action) => {
      return setSuccessAction(state, action);
    });

    builder.addCase(BUDGET_CONSTANT.filterAnomalySuccess, (state, action) => {
      return filterRecordOfAnomalyTable(state, action);
    });
    builder.addCase(BUDGET_CONSTANT.addBudgetRequested, (state, action) => {
      return requestingHome(state, "isPreviewing");
    });
    builder.addCase(BUDGET_CONSTANT.addBudgetError, (state, action) => {
      return handleError(state, action);
    });

    builder.addCase(BUDGET_CONSTANT.addBudgetSuccess, (state, action) => {
      return handleBudgetAdded(state, action);
    });

    builder.addCase(
      BUDGET_CONSTANT.addBudgetForAdminRequested,
      (state, action) => {
        return requestingHome(state, "isAdding");
      }
    );
    builder.addCase(BUDGET_CONSTANT.addBudgetForAdminError, (state, action) => {
      return handleError(state, action);
    });

    builder.addCase(
      BUDGET_CONSTANT.addBudgetForAdminSuccess,
      (state, action) => {
        return handleBudgetAddedForAdmin(state, action);
      }
    );

    builder.addCase(
      BUDGET_CONSTANT.addTrackingCycleRequested,
      (state, action) => {
        return requestingHome(state, "isAdding");
      }
    );
    builder.addCase(BUDGET_CONSTANT.addTrackingCycleError, (state, action) => {
      return handleError(state, action);
    });

    builder.addCase(
      BUDGET_CONSTANT.addTrackingCycleSuccess,
      (state, action) => {
        return handleAddTracking(state, action);
      }
    );

    builder.addCase(
      BUDGET_CONSTANT.addTrackingCycleForOtherProjectRequested,
      (state, action) => {
        return requestingHome(state, "isAdding");
      }
    );
    builder.addCase(
      BUDGET_CONSTANT.addTrackingCycleForOtherProjectError,
      (state, action) => {
        return handleError(state, action);
      }
    );

    builder.addCase(
      BUDGET_CONSTANT.addTrackingCycleForOtherProjectSuccess,
      (state, action) => {
        return handleAddTracking(state, action);
      }
    );

    builder.addCase(
      BUDGET_CONSTANT.budgetAdminTrckingIdRequested,
      (state, action) => {
        return requestingHome(state, "isFetching");
      }
    );
    builder.addCase(
      BUDGET_CONSTANT.budgetAdminTrckingIdError,
      (state, action) => {
        return handleError(state, action);
      }
    );

    builder.addCase(
      BUDGET_CONSTANT.budgetAdminTrckingIdSuccess,
      (state, action) => {
        return handleAdminBudgetTrackingList(state, action);
      }
    );

    builder.addCase(
      BUDGET_CONSTANT.budgetTrckingIdRequested,
      (state, action) => {
        return requestingHome(state, "isFetching");
      }
    );
    builder.addCase(BUDGET_CONSTANT.budgetTrckingIdError, (state, action) => {
      return handleError(state, action);
    });

    builder.addCase(BUDGET_CONSTANT.budgetTrckingIdSuccess, (state, action) => {
      return handleBudgetTrackingList(state, action);
    });

    // builder.addCase(
    //   BUDGET_CONSTANT.budgetTrckingIdForOthersRequested,
    //   (state, action) => {
    //     return requestingHome(state, "isFetching");
    //   }
    // );
    // builder.addCase(
    //   BUDGET_CONSTANT.budgetTrckingIdForOthersError,
    //   (state, action) => {
    //     return handleError(state, action);
    //   }
    // );

    // builder.addCase(
    //   BUDGET_CONSTANT.budgetTrckingIdForOthersSuccess,
    //   (state, action) => {
    //     return handleBudgetTrackingList(state, action);
    //   }
    // );

    builder.addCase(
      BUDGET_CONSTANT.getAvailableBudgetRequested,
      (state, action) => {
        return requestingHome(state, "");
      }
    );
    builder.addCase(
      BUDGET_CONSTANT.getAvailableBudgetError,
      (state, action) => {
        return handleError(state, action);
      }
    );

    builder.addCase(
      BUDGET_CONSTANT.getAvailableBudgetSuccess,
      (state, action) => {
        return handleBudgetYearList(state, action);
      }
    );

    builder.addCase(
      BUDGET_CONSTANT.ignoreOneAnomalyRequested,
      (state, action) => {
        return requestingHome(state, "isIgnoring");
      }
    );
    builder.addCase(BUDGET_CONSTANT.ignoreOneAnomalyError, (state, action) => {
      return handleError(state, action);
    });

    builder.addCase(
      BUDGET_CONSTANT.ignoreOneAnomalySuccess,
      (state, action) => {
        return handleSpecificAnomaly(state, action);
      }
    );

    builder.addCase(
      BUDGET_CONSTANT.ignoreAllAnomaliesRequested,
      (state, action) => {
        return requestingHome(state, "isIgnoringAll");
      }
    );
    builder.addCase(
      BUDGET_CONSTANT.ignoreAllAnomaliesError,
      (state, action) => {
        return handleError(state, action);
      }
    );

    builder.addCase(
      BUDGET_CONSTANT.ignoreAllAnomaliesSuccess,
      (state, action) => {
        return handleIgnoreAllAnomaly(state, action);
      }
    );

    builder.addCase(
      BUDGET_CONSTANT.getProjectsByTrackingIdRequested,
      (state, action) => {
        return requestingHome(state, "isRequesting");
      }
    );
    builder.addCase(
      BUDGET_CONSTANT.getProjectsByTrackingIdError,
      (state, action) => {
        return handleError(state, action);
      }
    );

    builder.addCase(
      BUDGET_CONSTANT.getProjectsByTrackingIdSuccess,
      (state, action) => {
        return handleProjectsTrackingList(state, action);
      }
    );

    builder.addCase(
      BUDGET_CONSTANT.uploadBudgetProjectsRequested,
      (state, action) => {
        return requestingHome(state, "isUploading");
      }
    );
    builder.addCase(
      BUDGET_CONSTANT.uploadBudgetProjectsError,
      (state, action) => {
        return handleError(state, action);
      }
    );

    builder.addCase(
      BUDGET_CONSTANT.uploadBudgetProjectsSuccess,
      (state, action) => {
        return handleUploadBudget(state, action);
      }
    );

    builder.addCase(
      BUDGET_CONSTANT.deleteAdminBudgetRequested,
      (state, action) => {
        return requestingHome(state, "isDeleting");
      }
    );
    builder.addCase(BUDGET_CONSTANT.deleteAdminBudgetError, (state, action) => {
      return handleError(state, action);
    });

    builder.addCase(
      BUDGET_CONSTANT.deleteAdminBudgetSuccess,
      (state, action) => {
        return handleAdminRemovedBudget(state, action);
      }
    );

    builder.addCase(BUDGET_CONSTANT.deleteBudgetRequested, (state, action) => {
      return requestingHome(state, "isDeleting");
    });
    builder.addCase(BUDGET_CONSTANT.deleteBudgetError, (state, action) => {
      return handleError(state, action);
    });

    builder.addCase(BUDGET_CONSTANT.deleteBudgetSuccess, (state, action) => {
      return handleRemovedBudget(state, action);
    });

    // builder.addCase(
    //   BUDGET_CONSTANT.deleteBudgetForOtherProjectRequested,
    //   (state, action) => {
    //     return requestingHome(state, "isDeleting");
    //   }
    // );
    // builder.addCase(
    //   BUDGET_CONSTANT.deleteBudgetForOtherProjectError,
    //   (state, action) => {
    //     return handleError(state, action);
    //   }
    // );

    // builder.addCase(
    //   BUDGET_CONSTANT.deleteBudgetForOtherProjectSuccess,
    //   (state, action) => {
    //     return handleRemovedBudget(state, action);
    //   }
    // );

    builder.addCase(
      BUDGET_CONSTANT.getAnomalyReviewByProjectIdRequested,
      (state, action) => {
        return requestingHome(state, "isReviewing");
      }
    );
    builder.addCase(
      BUDGET_CONSTANT.getAnomalyReviewByProjectIdError,
      (state, action) => {
        return handleError(state, action);
      }
    );

    builder.addCase(
      BUDGET_CONSTANT.getAnomalyReviewByProjectIdSuccess,
      (state, action) => {
        return handleReviewedAnomal(state, action);
      }
    );

    builder.addCase(
      BUDGET_CONSTANT.fetchBudgetStatRequested,
      (state, action) => {
        return requestingHome(state, "isReviewing");
      }
    );
    builder.addCase(BUDGET_CONSTANT.fetchBudgetStatError, (state, action) => {
      return handleError(state, action);
    });

    builder.addCase(BUDGET_CONSTANT.fetchBudgetStatSuccess, (state, action) => {
      return handleBudgetStats(state, action);
    });

    builder.addCase(
      BUDGET_CONSTANT.fetchAnomaliesDataRequested,
      (state, action) => {
        return requestingHome(state, "isReviewing");
      }
    );
    builder.addCase(
      BUDGET_CONSTANT.fetchAnomaliesDataError,
      (state, action) => {
        return handleError(state, action);
      }
    );

    builder.addCase(
      BUDGET_CONSTANT.fetchAnomaliesDataSuccess,
      (state, action) => {
        return handlefetchAnomaliesData(state, action);
      }
    );

    builder.addCase(
      BUDGET_CONSTANT.fetchDuplicateDataRequested,
      (state, action) => {
        return requestingHome(state, "isReviewing");
      }
    );
    builder.addCase(
      BUDGET_CONSTANT.fetchDuplicateDataError,
      (state, action) => {
        return handleError(state, action);
      }
    );

    builder.addCase(
      BUDGET_CONSTANT.fetchDuplicateDataSuccess,
      (state, action) => {
        return handlefetchDuplicateData(state, action);
      }
    );

    builder.addCase(BUDGET_CONSTANT.clearErrorMessageSuccess, (state) => {
      return clearError(state);
    });

    builder.addCase(BUDGET_CONSTANT.clearSuccessMessageSuccess, (state) => {
      return clearSuccessMessage(state);
    });
  },
});

export default budgetPageSlice.reducer;
