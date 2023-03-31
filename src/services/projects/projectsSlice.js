import { createSlice } from "@reduxjs/toolkit";
import PROJECTS_CONSTANT from "./type";
import update from "immutability-helper";

const initialState = {
  error: null,
  success: null,
  isFetching: false,
  currentTab: "Project Tracking Instances",
  anomalies_type: "Overview",
  pagingData: null,
  SelectedAnomalRecord: [],
  allProjectCycle: [],
  fieldReportList: [],
  projectListData: [],
  supportingDocumentData: [],
  projectAnomaliesList: [],
  uploadedSupportingDocs: null,
  projectId: null,
  isDeleting: false,
  isUploading: false,
  showUploadCloseOut: false,
  isUploadingSupportingDocs: false,
  trackingIdFromList: null,
  isUploadingCloseOut: false,
};

const requestingHome = (state, loading) =>
  update(state, {
    [loading]: {
      $set: true,
    },
  });

const handleAllProjectCycleFetched = (state, { payload }) => {
  return update(state, {
    isFetching: {
      $set: false,
    },
    allProjectCycle: {
      $set: payload.data,
    },
    pagingData: {
      $set: payload.metaData,
    },
  });
};
const handleProjectListData = (state, { payload }) => {
  return update(state, {
    isFetching: {
      $set: false,
    },
    projectListData: {
      $set: payload.data,
    },
    pagingData: {
      $set: payload.metaData,
    },
  });
};
const handleAnomaliesTableData = (state, { payload }) => {
  return update(state, {
    isFetching: {
      $set: false,
    },
    projectAnomaliesList: {
      $set: payload,
    },
    // pagingData: {
    //   $set: payload.metaData,
    // },
  });
};

const handleAddedFieldReport = (state, { payload }) => {
  const ind = state.fieldReportList.findIndex((i) => i.name === payload.name);
  if (ind === -1) {
    return update(state, {
      fieldReportList: {
        $push: [payload],
      },
    });
  } else {
    return update(state, {
      error: {
        $set: `Information already added.`,
      },
    });
  }
};

const handleRemoveFieldReport = (state, { payload }) => {
  const ind = state.fieldReportList.findIndex((i) => i.name === payload.name);
  return update(state, {
    fieldReportList: {
      $splice: [[ind, 1]],
    },
    success: {
      $set: "Successfully deleted.",
    },
  });
};

const handleFieldReportUpload = (state, { payload }) => {
  return update(state, {
    isUploading: {
      $set: false,
    },
    success: {
      $set: `
      Field reports uploaded successfully uploaded successfully.
      The data is undergoing analysis and CEPTG will be notified 
      to review the high-risk projects for further investigation.
      `,
    },
  });
};

const handleCloseOutReportUpload = (state, { payload }) => {
  return update(state, {
    isUploadingCloseOut: {
      $set: false,
    },
    success: {
      $set: `
      Field reports uploaded successfully uploaded successfully.
      The data is undergoing analysis and CEPTG will be notified 
      to review the high-risk projects for further investigation.
      `,
    },
  });
};

const handleFieldReportDataFetched = (state, { payload }) => {
  return update(state, {
    isRequesting: {
      $set: false,
    },
    fieldReportList: {
      $set: payload.data,
    },
    pagingData: {
      $set: payload.metaData,
    },
  });
};

const handleAddedSupportingDocs = (state, { payload }) => {
  const ind = state.supportingDocumentData.findIndex(
    (i) => i.name === payload.name
  );
  if (ind === -1) {
    return update(state, {
      supportingDocumentData: {
        $push: [payload],
      },
    });
  } else {
    return update(state, {
      error: {
        $set: `Information already added.`,
      },
    });
  }
};

const handleUploadSupportingData = (state, { payload }) => {
  return update(state, {
    isUploadingSupportingDocs: {
      $set: false,
    },
    success: {
      $set: `
      Supporting documents uploaded successfully
      `,
    },
    uploadedSupportingDocs: {
      $set: payload,
    },
  });
};
const handleRemoveSupportingDocs = (state, { payload }) => {
  const ind = state.supportingDocumentData.findIndex(
    (i) => i.name === payload.name
  );
  return update(state, {
    supportingDocumentData: {
      $splice: [[ind, 1]],
    },
  });
};

const handleDeletedSupportingDocs = (state, { payload }) => {
  const index = state.budgetTrackingList?.findIndex((i) => i.Id === payload.Id);

  return update(state, {
    isDeleting: {
      $set: false,
    },
    supportingDocumentData: {
      $splice: [[index, 1]],
    },
    success: {
      $set: "Successfully deleted",
    },
  });
};

const handleSupportingDocumentData = (state, { payload }) => {
  return update(state, {
    isRequesting: {
      $set: false,
    },
    supportingDocumentData: {
      $set: payload.data,
    },
    pagingData: {
      $set: payload.metaData,
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

const setErrorAction = (state, { error }) =>
  update(state, {
    error: {
      $set: error,
    },
  });

const handleError = (state, { error }) => {
  return update(state, {
    isDeleting: {
      $set: false,
    },
    isFetching: {
      $set: false,
    },
    isUploadingCloseOut: {
      $set: false,
    },
    isUploading: {
      $set: false,
    },
    isUploadingSupportingDocs: {
      $set: false,
    },
    isRequesting: {
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
    builder.addCase(PROJECTS_CONSTANT.modalSuccess, (state, action) => ({
      ...state,
      ...action.payload,
    }));

    builder.addCase(PROJECTS_CONSTANT.setTrackingIdSuccess, (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    });

    builder.addCase(PROJECTS_CONSTANT.currentTabSuccess, (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    });

    builder.addCase(
      PROJECTS_CONSTANT.addFieldReportSuccess,
      (state, action) => {
        return handleAddedFieldReport(state, action);
      }
    );

    builder.addCase(
      PROJECTS_CONSTANT.addSupportingDocsSuccess,
      (state, action) => {
        return handleAddedSupportingDocs(state, action);
      }
    );

    builder.addCase(
      PROJECTS_CONSTANT.removeSupportingDocsSuccess,
      (state, action) => {
        return handleRemoveSupportingDocs(state, action);
      }
    );

    builder.addCase(
      PROJECTS_CONSTANT.removeFieldReportSuccess,
      (state, action) => {
        return handleRemoveFieldReport(state, action);
      }
    );

    builder.addCase(PROJECTS_CONSTANT.anomaliesTypeSuccess, (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    });
    builder.addCase(PROJECTS_CONSTANT.saveProjectIdSuccess, (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    });

    builder.addCase(PROJECTS_CONSTANT.setError, (state, action) => {
      return setErrorAction(state, action);
    });

    builder.addCase(
      PROJECTS_CONSTANT.getUploadedFieldFileRequested,
      (state, action) => {
        return requestingHome(state, "isRequesting");
      }
    );
    builder.addCase(
      PROJECTS_CONSTANT.getUploadedFieldFileError,
      (state, action) => {
        return handleError(state, action);
      }
    );

    builder.addCase(
      PROJECTS_CONSTANT.getUploadedFieldFileSuccess,
      (state, action) => {
        return handleFieldReportDataFetched(state, action);
      }
    );

    builder.addCase(
      PROJECTS_CONSTANT.getAllProjectCyclePaginatedRequested,
      (state, action) => {
        return requestingHome(state, "isFetching");
      }
    );
    builder.addCase(
      PROJECTS_CONSTANT.getAllProjectCyclePaginatedError,
      (state, action) => {
        return handleError(state, action);
      }
    );

    builder.addCase(
      PROJECTS_CONSTANT.getAllProjectCyclePaginatedSuccess,
      (state, action) => {
        return handleAllProjectCycleFetched(state, action);
      }
    );

    //
    builder.addCase(
      PROJECTS_CONSTANT.getProjectAnomaliesRequested,
      (state, action) => {
        return requestingHome(state, "isFetching");
      }
    );
    builder.addCase(
      PROJECTS_CONSTANT.getProjectAnomaliesError,
      (state, action) => {
        return handleError(state, action);
      }
    );

    builder.addCase(
      PROJECTS_CONSTANT.getProjectAnomaliesSuccess,
      (state, action) => {
        return handleAnomaliesTableData(state, action);
      }
    );
    //
    builder.addCase(
      PROJECTS_CONSTANT.uploadFieldReportRequested,
      (state, action) => {
        return requestingHome(state, "isUploading");
      }
    );
    builder.addCase(
      PROJECTS_CONSTANT.uploadFieldReportError,
      (state, action) => {
        return handleError(state, action);
      }
    );

    builder.addCase(
      PROJECTS_CONSTANT.uploadFieldReportSuccess,
      (state, action) => {
        return handleFieldReportUpload(state, action);
      }
    );

    builder.addCase(
      PROJECTS_CONSTANT.getProjectListRequested,
      (state, action) => {
        return requestingHome(state, "isFetching");
      }
    );
    builder.addCase(PROJECTS_CONSTANT.getProjectListError, (state, action) => {
      return handleError(state, action);
    });

    builder.addCase(
      PROJECTS_CONSTANT.getProjectListSuccess,
      (state, action) => {
        return handleProjectListData(state, action);
      }
    );

    builder.addCase(
      PROJECTS_CONSTANT.getSupportingDocumentDataRequested,
      (state, action) => {
        return requestingHome(state, "isRequesting");
      }
    );
    builder.addCase(
      PROJECTS_CONSTANT.getSupportingDocumentDataError,
      (state, action) => {
        return handleError(state, action);
      }
    );

    builder.addCase(
      PROJECTS_CONSTANT.getSupportingDocumentDataSuccess,
      (state, action) => {
        return handleSupportingDocumentData(state, action);
      }
    );
    builder.addCase(
      PROJECTS_CONSTANT.uploadSupportingDocumentRequested,
      (state, action) => {
        return requestingHome(state, "isUploadingSupportingDocs");
      }
    );
    builder.addCase(
      PROJECTS_CONSTANT.uploadSupportingDocumentError,
      (state, action) => {
        return handleError(state, action);
      }
    );

    builder.addCase(
      PROJECTS_CONSTANT.uploadSupportingDocumentSuccess,
      (state, action) => {
        return handleUploadSupportingData(state, action);
      }
    );
    builder.addCase(PROJECTS_CONSTANT.clearErrorMessageSuccess, (state) => {
      return clearError(state);
    });

    builder.addCase(
      PROJECTS_CONSTANT.deleteSupportingDocumentDataRequested,
      (state, action) => {
        return requestingHome(state, "isDeleting");
      }
    );
    builder.addCase(
      PROJECTS_CONSTANT.deleteSupportingDocumentDataError,
      (state, action) => {
        return handleError(state, action);
      }
    );

    builder.addCase(
      PROJECTS_CONSTANT.deleteSupportingDocumentDataSuccess,
      (state, action) => {
        return handleDeletedSupportingDocs(state, action);
      }
    );

    builder.addCase(
      PROJECTS_CONSTANT.uploadCloseOutReportRequested,
      (state, action) => {
        return requestingHome(state, "isUploadingCloseOut");
      }
    );
    builder.addCase(
      PROJECTS_CONSTANT.uploadCloseOutReportError,
      (state, action) => {
        return handleError(state, action);
      }
    );

    builder.addCase(
      PROJECTS_CONSTANT.uploadCloseOutReportSuccess,
      (state, action) => {
        return handleCloseOutReportUpload(state, action);
      }
    );

    builder.addCase(PROJECTS_CONSTANT.clearSuccessMessageSuccess, (state) => {
      return clearSuccessMessage(state);
    });
  },
});

export default projectsSlice.reducer;
