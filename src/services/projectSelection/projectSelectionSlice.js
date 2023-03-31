import { createSlice } from "@reduxjs/toolkit";
import PROJECTSELECTION_CONSTANT from "./type";
import update from "immutability-helper";

const initialState = {
  error: null,
  success: null,
  isFetching: false,
  selectionCriteria: false,
  isRequesting: false,
  isDownloading: false,
  sampleSelected: false,
  sampleSelectedText: "Save",
  projectSelectionList: null,
  pagingData: null,
  templateLink: null,
  uploadedFile: null,
  isAdjusting: false,
  adjSelectionCriteria: null,
  sentToSteering: null,
  isSending: false,
  otherProjectsAvailable: [],
  projectView: "selection",
  projectPetitions: [],
};

const requestingHome = (state, loading) =>
  update(state, {
    [loading]: {
      $set: true,
    },
  });

const handlePetitionList = (state, { payload }) => {
  return update(state, {
    isRequesting: {
      $set: false,
    },
    projectPetitions: {
      $set: payload.data,
    },
    pagingData: {
      $set: payload.metaData,
    },
  });
};

const handleProjectsTrackingList = (state, { payload }) => {
  return update(state, {
    isRequesting: {
      $set: false,
    },
    projectSelectionList: {
      $set: payload.data,
    },
    pagingData: {
      $set: payload.metaData,
    },
  });
};

const handleOtherProjects = (state, { payload }) => {
  return update(state, {
    isRequesting: {
      $set: false,
    },
    otherProjectsAvailable: {
      $set: payload,
    },
  });
};

const adjustSelectionCriteria = (state, { payload }) => {
  return update(state, {
    isAdjusting: {
      $set: false,
    },
    success: {
      $set: `Selection Criteria successfully adjusted.`,
    },
    adjSelectionCriteria: {
      $set: payload,
    },
    selectionCriteria: {
      $set: false,
    },
  });
};

const handleAgvTemplateDownload = (state, { payload }) => {
  return update(state, {
    isDownloading: {
      $set: false,
    },
    templateLink: {
      $set: payload,
    },
  });
};

const handleAgvTemplateUpload = (state, { payload }) => {
  return update(state, {
    isUploading: {
      $set: false,
    },
    uploadedFile: {
      $set: payload,
    },
    success: {
      $set: payload.message,
    },
    // `A project sample size of 1,500 has been selected for tracking.
    // Click Save Sample Selected to enable further review/
    // final selection by the Steering Committee`
  });
};

const handleSentProjectSelection = (state, { payload }) => {
  return update(state, {
    isSending: {
      $set: false,
    },
    sentToSteering: {
      $set: payload,
    },
    sampleSelected: {
      $set: payload ? false : state.sampleSelected,
    },

    sampleSelectedText: {
      $set: payload ? "Finalise" : state.sampleSelectedText,
    },
  });
};

const finaliseProjectSelection = (state, { payload }) => {
  return update(state, {
    isSending: {
      $set: false,
    },

    sampleSelectedText: {
      $set: payload ? "Finalise" : state.sampleSelectedText,
    },
    success: {
      $set: payload
        ? `Project sample selection complete! Proceed to upload 
        the contract and tender evaluation schedule.`
        : null,
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

const setErrorAction = (state, action) => {
  return update(state, {
    error: {
      $set: action.error,
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
    isSending: {
      $set: false,
    },
    isAdjusting: {
      $set: false,
    },
    isDownloading: {
      $set: false,
    },
    isUploading: {
      $set: false,
    },
    error: {
      $set: error,
    },
  });
};

export const projectSelectionSlice = createSlice({
  name: "projectSelectionReducer",
  initialState,

  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      PROJECTSELECTION_CONSTANT.currentViewSuccess,
      (state, action) => {
        return {
          ...state,
          ...action.payload,
        };
      }
    );

    builder.addCase(
      PROJECTSELECTION_CONSTANT.setProjectSelectionError,
      (state, action) => {
        return setErrorAction(state, action);
      }
    );
    builder.addCase(
      PROJECTSELECTION_CONSTANT.setProjectSelectionSuccess,
      (state, action) => {
        return setSuccessAction(state, action);
      }
    );

    builder.addCase(
      PROJECTSELECTION_CONSTANT.modalSuccess,
      (state, action) => ({
        ...state,
        ...action.payload,
      })
    );

    builder.addCase(
      PROJECTSELECTION_CONSTANT.setSampleSelectedTextSuccess,
      (state, action) => ({
        ...state,
        ...action.payload,
      })
    );

    builder.addCase(
      PROJECTSELECTION_CONSTANT.getPetitionByTrackingIdRequested,
      (state, action) => {
        return requestingHome(state, "isRequesting");
      }
    );
    builder.addCase(
      PROJECTSELECTION_CONSTANT.getPetitionByTrackingIdError,
      (state, action) => {
        return handleError(state, action);
      }
    );

    builder.addCase(
      PROJECTSELECTION_CONSTANT.getPetitionByTrackingIdSuccess,
      (state, action) => {
        return handlePetitionList(state, action);
      }
    );

    builder.addCase(
      PROJECTSELECTION_CONSTANT.getProjectSelectionByTrackingIdRequested,
      (state, action) => {
        return requestingHome(state, "isRequesting");
      }
    );
    builder.addCase(
      PROJECTSELECTION_CONSTANT.getProjectSelectionByTrackingIdError,
      (state, action) => {
        return handleError(state, action);
      }
    );

    builder.addCase(
      PROJECTSELECTION_CONSTANT.getProjectSelectionByTrackingIdSuccess,
      (state, action) => {
        return handleProjectsTrackingList(state, action);
      }
    );

    builder.addCase(
      PROJECTSELECTION_CONSTANT.fetchOtherProjectsRequested,
      (state, action) => {
        return requestingHome(state, "isRequesting");
      }
    );
    builder.addCase(
      PROJECTSELECTION_CONSTANT.fetchOtherProjectsError,
      (state, action) => {
        return handleError(state, action);
      }
    );

    builder.addCase(
      PROJECTSELECTION_CONSTANT.fetchOtherProjectsSuccess,
      (state, action) => {
        return handleOtherProjects(state, action);
      }
    );

    builder.addCase(
      PROJECTSELECTION_CONSTANT.sendProjectSelectionRequested,
      (state, action) => {
        return requestingHome(state, "isSending");
      }
    );
    builder.addCase(
      PROJECTSELECTION_CONSTANT.sendProjectSelectionError,
      (state, action) => {
        return handleError(state, action);
      }
    );

    builder.addCase(
      PROJECTSELECTION_CONSTANT.sendProjectSelectionSuccess,
      (state, action) => {
        return handleSentProjectSelection(state, action);
      }
    );

    builder.addCase(
      PROJECTSELECTION_CONSTANT.finaliseProjectSelectionRequested,
      (state, action) => {
        return requestingHome(state, "isSending");
      }
    );
    builder.addCase(
      PROJECTSELECTION_CONSTANT.finaliseProjectSelectionError,
      (state, action) => {
        return handleError(state, action);
      }
    );

    builder.addCase(
      PROJECTSELECTION_CONSTANT.finaliseProjectSelectionSuccess,
      (state, action) => {
        return finaliseProjectSelection(state, action);
      }
    );
    builder.addCase(
      PROJECTSELECTION_CONSTANT.selectCriteriaSubmitRequested,
      (state, action) => {
        return requestingHome(state, "isAdjusting");
      }
    );
    builder.addCase(
      PROJECTSELECTION_CONSTANT.selectCriteriaSubmitError,
      (state, action) => {
        return handleError(state, action);
      }
    );

    builder.addCase(
      PROJECTSELECTION_CONSTANT.selectCriteriaSubmitSuccess,
      (state, action) => {
        return adjustSelectionCriteria(state, action);
      }
    );
    builder.addCase(
      PROJECTSELECTION_CONSTANT.downloadExcutingAgTemplateRequested,
      (state, action) => {
        return requestingHome(state, "isDownloading");
      }
    );
    builder.addCase(
      PROJECTSELECTION_CONSTANT.downloadExcutingAgTemplateError,
      (state, action) => {
        return handleError(state, action);
      }
    );

    builder.addCase(
      PROJECTSELECTION_CONSTANT.downloadExcutingAgTemplateSuccess,
      (state, action) => {
        return handleAgvTemplateDownload(state, action);
      }
    );

    builder.addCase(
      PROJECTSELECTION_CONSTANT.uploadExcutingAgDataRequested,
      (state, action) => {
        return requestingHome(state, "isUploading");
      }
    );
    builder.addCase(
      PROJECTSELECTION_CONSTANT.uploadExcutingAgDataError,
      (state, action) => {
        return handleError(state, action);
      }
    );

    builder.addCase(
      PROJECTSELECTION_CONSTANT.uploadExcutingAgDataSuccess,
      (state, action) => {
        return handleAgvTemplateUpload(state, action);
      }
    );

    builder.addCase(
      PROJECTSELECTION_CONSTANT.clearErrorMessageSuccess,
      (state) => {
        return clearError(state);
      }
    );

    builder.addCase(
      PROJECTSELECTION_CONSTANT.clearSuccessMessageSuccess,
      (state) => {
        return clearSuccessMessage(state);
      }
    );
  },
});

export default projectSelectionSlice.reducer;
