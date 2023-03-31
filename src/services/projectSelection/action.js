import PROJECTSELECTION_CONSTANT from "./type";
import {
  makeGetRequest,
  makeFormDataPostRequest,
  makePostRequest,
} from "./api";

const projectSelectionActionsSuccess = (actionType, payload) => ({
  type: PROJECTSELECTION_CONSTANT[`${actionType}Success`],
  payload,
});

const projectSelectionActionsRequested = (actionType) => ({
  type: PROJECTSELECTION_CONSTANT[`${actionType}Requested`],
});



const projectSelectionActionsError = (actionType, error) => ({
  type: PROJECTSELECTION_CONSTANT[`${actionType}Error`],
  error,
});

// clear error message
export const clearErrorMessage = () => async (dispatch) => {
  const actionType = "clearErrorMessage";
  await dispatch(projectSelectionActionsSuccess(actionType));
};

// clear success message
export const clearSuccessMessage = () => async (dispatch) => {
  const actionType = "clearSuccessMessage";
  await dispatch(projectSelectionActionsSuccess(actionType));
};

export const openLogoutModal = () => async (dispatch) => {
  const actionType = "logout";
  await dispatch(projectSelectionActionsSuccess(actionType));
};

export const setDefaultSampleSelectedText = (payload) => async (dispatch) => {
  const actionType = "setSampleSelectedText";
  await dispatch(projectSelectionActionsSuccess(actionType, payload));
};

export const dismissLogoutModal = () => async (dispatch) => {
  const actionType = "closeLogout";
  await dispatch(projectSelectionActionsSuccess(actionType));
};

export const handleRequestErrorr = (payload) => async (dispatch) => {
  const actionType = "setProjectSelection";
  await dispatch(projectSelectionActionsError(actionType, payload));
};

export const handleRequestSuccess = (payload) => async (dispatch) => {
  const actionType = "setProjectSelection";
  await dispatch(projectSelectionActionsSuccess(actionType, payload));
};

export const openModal = (payload) => async (dispatch) => {
  const actionType = "modal";
  await dispatch(projectSelectionActionsSuccess(actionType, payload));
};

export const setProjectView = (payload) => async (dispatch) => {
  const actionType = "currentView";
  await dispatch(projectSelectionActionsSuccess(actionType, payload));
};

export const fetchProjectSelectionByTrackingId = (params, navigate) => {
  const actionType = "getProjectSelectionByTrackingId";
  return async (dispatch) => {
    try {
      dispatch(projectSelectionActionsRequested(actionType, true));
      const res = await makeGetRequest(
        // `/projects/getProjectsByTrackingId`,
        `/projects/getProjectsByTrackingIdPaginated`,
        params
      );
      if (res.status !== 200) {
        dispatch(projectSelectionActionsError(actionType, res.data));
      } else {
        console.log(res);
        dispatch(projectSelectionActionsSuccess(actionType, res.data.data));
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          navigate(`/`);
          sessionStorage.removeItem("IWPW_3ing_Token");
        } else {
          return dispatch(
            projectSelectionActionsError(
              actionType,
              error.response.data.message
            )
          );
        }
      } else if (error.request) {
        // console.log(error.request)
        return dispatch(
          projectSelectionActionsError(actionType, "Network error")
        );
      } else {
        // Something happened in setting up the request and triggered an error
        console.log("axios", error.message);
        //  dispatch(projectSelectionActionsError(actionType, "Network error"));
      }
    }
  };
};

export const fetchPetitionsByTrackingId = (params, navigate) => {
  const actionType = "getPetitionByTrackingId";
  return async (dispatch) => {
    try {
      dispatch(projectSelectionActionsRequested(actionType, true));
      const res = await makeGetRequest(
        `/projects/getPetitionsByTrackingIdPaginated`,
        params
      );
      if (res.status !== 200) {
        dispatch(projectSelectionActionsError(actionType, res.data));
      } else {
        console.log(res);
        dispatch(projectSelectionActionsSuccess(actionType, res.data.data));
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          navigate(`/`);
          sessionStorage.removeItem("IWPW_3ing_Token");
        } else {
          return dispatch(
            projectSelectionActionsError(
              actionType,
              error.response.data.message
            )
          );
        }
      } else if (error.request) {
        // console.log(error.request)
        return dispatch(
          projectSelectionActionsError(actionType, "Network error")
        );
      } else {
        // Something happened in setting up the request and triggered an error
        console.log("axios", error.message);
        //  dispatch(projectSelectionActionsError(actionType, "Network error"));
      }
    }
  };
};

export const handleDownloadExcutingAgTemplate = (params, navigate) => {
  const actionType = "downloadExcutingAgTemplate";
  return async (dispatch) => {
    try {
      dispatch(projectSelectionActionsRequested(actionType, true));
      const res = await makeGetRequest(
        `/projects/downloadExecutingAgencyTemplate`,
        params
      );
      if (res.status !== 200) {
        dispatch(projectSelectionActionsError(actionType, res.data));
      } else {
        // const url = window.URL.createObjectURL(new Blob([res.data.data]));
        const link = document.createElement("a");
        link.href = res.data.data;
        link.setAttribute("download", "ExecutingAgencyData.xlsx"); //or any other extension
        document.body.appendChild(link);
        link.click();

        dispatch(projectSelectionActionsSuccess(actionType, res.data.data));
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          navigate(`/`);
          sessionStorage.removeItem("IWPW_3ing_Token");
        } else {
          console.log(error);
          return dispatch(
            projectSelectionActionsError(
              actionType,
              error.response.data.message
            )
          );
        }
      } else if (error.request) {
        // console.log(error.request)
        return dispatch(
          projectSelectionActionsError(actionType, "Network error")
        );
      } else {
        // Something happened in setting up the request and triggered an error
        console.log("axios", error.message);
        return dispatch(
          projectSelectionActionsError(actionType, "Network error")
        );
      }
    }
  };
};

export const handleUploadExcutingAgData = (params, navigate) => {
  const actionType = "uploadExcutingAgData";
  return async (dispatch) => {
    try {
      dispatch(projectSelectionActionsRequested(actionType, true));
      const res = await makeFormDataPostRequest(
        `/projects/uploadExecutingAgencyData`,
        params
      );
      if (res.status !== 200 && res.status !== 201) {
        dispatch(projectSelectionActionsError(actionType, res.data));
      } else {
        dispatch(projectSelectionActionsSuccess(actionType, res.data));
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          navigate(`/`);
          sessionStorage.removeItem("IWPW_3ing_Token");
        } else {
          return dispatch(
            projectSelectionActionsError(
              actionType,
              error.response.data.message
            )
          );
        }
      } else if (error.request) {
        // console.log(error.request)
        return dispatch(
          projectSelectionActionsError(actionType, "Network error")
        );
      } else {
        // Something happened in setting up the request and triggered an error
        console.log("axios", error.message);
        return dispatch(
          projectSelectionActionsError(actionType, "Network error")
        );
      }
    }
  };
};

export const handleAdjustmentOfSelectionCriteria = (params, navigate) => {
  const actionType = "selectCriteriaSubmit";
  return async (dispatch) => {
    try {
      dispatch(projectSelectionActionsRequested(actionType, true));
      const res = await makePostRequest(`/projects/selectProjects`, params);
      if (res.status !== 200 && res.status !== 201) {
        dispatch(projectSelectionActionsError(actionType, res.data));
      } else {
        console.log(res, "jjj");
        dispatch(projectSelectionActionsSuccess(actionType, res.data));
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          navigate(`/`);
          sessionStorage.removeItem("IWPW_3ing_Token");
        } else {
          return dispatch(
            projectSelectionActionsError(
              actionType,
              error.response.data.message
            )
          );
        }
      } else if (error.request) {
        // console.log(error.request)
        return dispatch(
          projectSelectionActionsError(actionType, "Network error")
        );
      } else {
        // Something happened in setting up the request and triggered an error
        console.log("axios", error.message);
        return dispatch(
          projectSelectionActionsError(actionType, "Network error")
        );
      }
    }
  };
};

export const checkIfOtherProjectsIsIncluded = (params, navigate) => {
  const actionType = "fetchOtherProjects";
  return async (dispatch) => {
    try {
      dispatch(projectSelectionActionsRequested(actionType, true));
      const res = await makeGetRequest(
        `/trackings/GetPetitionsOrOtherBudget`,
        params
      );
      if (res.status !== 200) {
        return dispatch(projectSelectionActionsError(actionType, res.data));
      } else {
        console.log(res, 'petition')
        dispatch(projectSelectionActionsSuccess(actionType, res.data.data));
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          navigate(`/`);
          sessionStorage.removeItem("IWPW_3ing_Token");
        } else {
          return dispatch(
            projectSelectionActionsError(
              actionType,
              error.response.data.message
            )
          );
        }
      } else if (error.request) {
        // console.log(error.request)
        return dispatch(
          projectSelectionActionsError(actionType, "Network error")
        );
      } else {
        // Something happened in setting up the request and triggered an error
        console.log("axios", error.message);
        // dispatch(projectSelectionActionsError(actionType, "Network error"));
      }
    }
  };
};

// send to steering committe
export const handleSendSaveProjectSelection = (params, navigate) => {
  const actionType = "sendProjectSelection";
  return async (dispatch) => {
    try {
      dispatch(projectSelectionActionsRequested(actionType, true));
      const res = await makePostRequest(
        `/projects/saveProjectSelection`,
        params
      );
      if (res.status !== 200 && res.status !== 201) {
        dispatch(projectSelectionActionsError(actionType, res.data));
      } else {
        dispatch(projectSelectionActionsSuccess(actionType, res.data));
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          navigate(`/`);
          sessionStorage.removeItem("IWPW_3ing_Token");
        } else {
          return dispatch(
            projectSelectionActionsError(
              actionType,
              error.response.data.message
            )
          );
        }
      } else if (error.request) {
        // console.log(error.request)
        return dispatch(
          projectSelectionActionsError(actionType, "Network error")
        );
      } else {
        // Something happened in setting up the request and triggered an error
        console.log("axios", error.message);
        return dispatch(
          projectSelectionActionsError(actionType, "Network error")
        );
      }
    }
  };
};

// finalise project selection
export const handleFinaliseProjectSelection = (params, navigate) => {
  const actionType = "finaliseProjectSelection";
  return async (dispatch) => {
    try {
      dispatch(projectSelectionActionsRequested(actionType, true));
      const res = await makePostRequest(
        `/projects/finaliseProjectSelection`,
        params
      );
      if (res.status !== 200 && res.status !== 201) {
        dispatch(projectSelectionActionsError(actionType, res.data));
      } else {
        console.log(res, "jjj");
        dispatch(projectSelectionActionsSuccess(actionType, res.data));
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          navigate(`/`);
          sessionStorage.removeItem("IWPW_3ing_Token");
        } else {
          return dispatch(
            projectSelectionActionsError(
              actionType,
              error.response.data.message
            )
          );
        }
      } else if (error.request) {
        // console.log(error.request)
        return dispatch(
          projectSelectionActionsError(actionType, "Network error")
        );
      } else {
        // Something happened in setting up the request and triggered an error
        console.log("axios", error.message);
        return dispatch(
          projectSelectionActionsError(actionType, "Network error")
        );
      }
    }
  };
};
