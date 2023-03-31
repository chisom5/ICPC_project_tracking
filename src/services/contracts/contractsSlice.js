import { createSlice } from "@reduxjs/toolkit";
import CONTRACTS_CONSTANT from "./type";
import update from "immutability-helper";

const initialState = {
  error: null,
  success: null,
  isFetching: false,
  isUploading: false,
  isDownloading: false,
  contractView: "contractUpload",
  SelectedAnomalData: [],
  contractInfoTable: [],
  selectedValFilter: "All",
  contractAnomaliesData: [],
  contractAnomaliesDataCopy: [],

  isReviewing: false,
  isIgnoring: false,
  isIgnoringAll: false,
  AnomalData: [],
  directorsFileUpload: null,
  pagingData: null,
};

const requestingHome = (state, loading) =>
  update(state, {
    [loading]: {
      $set: true,
    },
  });

const handleContractDetailsTemplateDownload = (state, { payload }) => {
  return update(state, {
    isDownloading: {
      $set: false,
    },
    templateLink: {
      $set: payload,
    },
  });
};

const handleContractDetailsTemplateUpload = (state, { payload }) => {
  return update(state, {
    isUploading: {
      $set: false,
    },

    contractInfoTable: {
      $set: payload,
    },
    success: {
      $set: 'Contract Detail File Uploaded.'
    }
  });
};

const handleContractDirectorsTemplateUpload = (state, { payload }) => {
  return update(state, {
    isUploading: {
      $set: false,
    },
    success: {
      $set: `File uploaded successfully`,
    },
    directorsFileUpload: {
      $set: payload
    }
  });
};
const removeContractInfo = (state, { payload }) => {
  const index = state.contractInfoTable?.findIndex((i) => i.Id === payload.Id);

  return update(state, {
    isDeleting: {
      $set: false,
    },
    contractInfoTable: {
      $splice: [[index, 1]],
    },
  });
};

const filterRecordOfAnomalyTable = (state, { payload }) => {
  if (payload === "All") {
    return update(state, {
      contractAnomaliesData: {
        $set: state.contractAnomaliesDataCopy,
      },
      selectedValFilter: {
        $set: payload,
      },
    });
  } else {
    const filteredData = state.contractAnomaliesDataCopy.filter(
      (item) => item.HasAnomaly === payload
    );

    return update(state, {
      contractAnomaliesData: {
        $set: filteredData,
      },
      selectedValFilter: {
        $set: payload,
      },
    });
  }
};

const handleContractAnomalies = (state, { payload }) => {
  return update(state, {
    isFetching: {
      $set: false,
    },
    contractAnomaliesData: {
      $set: payload.data,
    },
    contractAnomaliesDataCopy: {
      $set: payload.data,
    },

    pagingData: {
      $set: payload.metaData,
    },

    contractView: { $set: "anomalies" },
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

  const pjInd = state.contractAnomaliesData.findIndex(
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
    contractAnomaliesData: {
      [pjInd]: {
        $set: payload.TempProject,
      },
    },
    contractAnomaliesDataCopy: {
      [pjInd]: {
        $set: payload.TempProject,
      },
    },
    success: {
      $set: "Anomaly successful ignore",
    },
  });
};

const handleIgnoreAllAnomaly = (state, { payload }) => {
  const pjInd = state.contractAnomaliesData.findIndex(
    (item) => item.Id === payload.projectId
  );

  return update(state, {
    isIgnoringAll: {
      $set: false,
    },
    contractAnomaliesData: {
      [pjInd]: {
        $merge: {
          HasAnomaly: 1,
          IgnoreAnomaly: 1,
        },
      },
    },
    contractAnomaliesDataCopy: {
      [pjInd]: {
        $merge: {
          HasAnomaly: 1,
          IgnoreAnomaly: 1,
        },
      },
    },
    contractView: {
      $set: "anomalies",
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

const setErrorAction = (state, action) =>
  update(state, {
    error: {
      $set: action.error,
    },
  });

const setSuccessAction = (state, { payload }) =>
  update(state, {
    success: {
      $set: payload,
    },
  });

const handleError = (state, { error }) => {
  return update(state, {
    isFetching: {
      $set: false,
    },
    isDownloading: {
      $set: false,
    },
    isUploading: {
      $set: false,
    },
    isReviewing: {
      $set: false,
    },
    isIgnoring: {
      $set: false,
    },
    isIgnoringAll: {
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
    builder.addCase(CONTRACTS_CONSTANT.contractViewSuccess, (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    });
    builder.addCase(
      CONTRACTS_CONSTANT.saveContractDUploadSuccess,
      (state, action) => {
        return {
          ...state,
          ...action.payload,
        };
      }
    );

    builder.addCase(
      CONTRACTS_CONSTANT.removeContractInfoSuccess,
      (state, action) => {
        return removeContractInfo(state, action);
      }
    );

    builder.addCase(
      CONTRACTS_CONSTANT.filterAnomalySuccess,
      (state, action) => {
        return filterRecordOfAnomalyTable(state, action);
      }
    );

    builder.addCase(CONTRACTS_CONSTANT.setError, (state, action) => {
      return setErrorAction(state, action);
    });
    builder.addCase(CONTRACTS_CONSTANT.setSuccess, (state, action) => {
      return setSuccessAction(state, action);
    });

    builder.addCase(
      CONTRACTS_CONSTANT.getContractAnomalyByTrackingIdRequested,
      (state, action) => {
        return requestingHome(state, "isFetching");
      }
    );
    builder.addCase(
      CONTRACTS_CONSTANT.getContractAnomalyByTrackingIdError,
      (state, action) => {
        return handleError(state, action);
      }
    );

    builder.addCase(
      CONTRACTS_CONSTANT.getContractAnomalyByTrackingIdSuccess,
      (state, action) => {
        return handleContractAnomalies(state, action);
      }
    );

    builder.addCase(
      CONTRACTS_CONSTANT.downloadContractDetailstempRequested,
      (state, action) => {
        return requestingHome(state, "isDownloading");
      }
    );
    builder.addCase(
      CONTRACTS_CONSTANT.downloadContractDetailstempError,
      (state, action) => {
        return handleError(state, action);
      }
    );

    builder.addCase(
      CONTRACTS_CONSTANT.downloadContractDetailstempSuccess,
      (state, action) => {
        return handleContractDetailsTemplateDownload(state, action);
      }
    );

    builder.addCase(
      CONTRACTS_CONSTANT.uploadContractDetailsDataRequested,
      (state, action) => {
        return requestingHome(state, "isUploading");
      }
    );
    builder.addCase(
      CONTRACTS_CONSTANT.uploadContractDetailsDataError,
      (state, action) => {
        return handleError(state, action);
      }
    );

    builder.addCase(
      CONTRACTS_CONSTANT.uploadContractDetailsDataSuccess,
      (state, action) => {
        return handleContractDetailsTemplateUpload(state, action);
      }
    );
    //
    builder.addCase(
      CONTRACTS_CONSTANT.uploadContractDirectorsDataRequested,
      (state, action) => {
        return requestingHome(state, "isUploading");
      }
    );
    builder.addCase(
      CONTRACTS_CONSTANT.uploadContractDirectorsDataError,
      (state, action) => {
        return handleError(state, action);
      }
    );

    builder.addCase(
      CONTRACTS_CONSTANT.uploadContractDirectorsDataSuccess,
      (state, action) => {
        return handleContractDirectorsTemplateUpload(state, action);
      }
    );

    builder.addCase(
      CONTRACTS_CONSTANT.downloadContractDirectorstempRequested,
      (state, action) => {
        return requestingHome(state, "isDownloading");
      }
    );
    builder.addCase(
      CONTRACTS_CONSTANT.downloadContractDirectorstempError,
      (state, action) => {
        return handleError(state, action);
      }
    );

    builder.addCase(
      CONTRACTS_CONSTANT.downloadContractDirectorstempSuccess,
      (state, action) => {
        return handleContractDetailsTemplateDownload(state, action);
      }
    );

    builder.addCase(
      CONTRACTS_CONSTANT.getAnomalyReviewByProjectIdRequested,
      (state, action) => {
        return requestingHome(state, "isReviewing");
      }
    );
    builder.addCase(
      CONTRACTS_CONSTANT.getAnomalyReviewByProjectIdError,
      (state, action) => {
        return handleError(state, action);
      }
    );

    builder.addCase(
      CONTRACTS_CONSTANT.getAnomalyReviewByProjectIdSuccess,
      (state, action) => {
        return handleReviewedAnomal(state, action);
      }
    );

    builder.addCase(
      CONTRACTS_CONSTANT.ignoreOneAnomalyRequested,
      (state, action) => {
        return requestingHome(state, "isIgnoring");
      }
    );
    builder.addCase(
      CONTRACTS_CONSTANT.ignoreOneAnomalyError,
      (state, action) => {
        return handleError(state, action);
      }
    );

    builder.addCase(
      CONTRACTS_CONSTANT.ignoreOneAnomalySuccess,
      (state, action) => {
        return handleSpecificAnomaly(state, action);
      }
    );

    builder.addCase(
      CONTRACTS_CONSTANT.ignoreAllAnomaliesRequested,
      (state, action) => {
        return requestingHome(state, "isIgnoringAll");
      }
    );
    builder.addCase(
      CONTRACTS_CONSTANT.ignoreAllAnomaliesError,
      (state, action) => {
        return handleError(state, action);
      }
    );

    builder.addCase(
      CONTRACTS_CONSTANT.ignoreAllAnomaliesSuccess,
      (state, action) => {
        return handleIgnoreAllAnomaly(state, action);
      }
    );

    builder.addCase(CONTRACTS_CONSTANT.clearErrorMessageSuccess, (state) => {
      return clearError(state);
    });

    builder.addCase(CONTRACTS_CONSTANT.clearSuccessMessageSuccess, (state) => {
      return clearSuccessMessage(state);
    });
  },
});

export default contractsPageSlice.reducer;
