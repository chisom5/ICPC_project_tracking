import PROJECTS_CONSTANT from "./type";
import { makeGetRequest, makePostRequest } from "./api";

const projectsActionSuccess = (actionType, payload) => ({
  type: PROJECTS_CONSTANT[`${actionType}Success`],
  payload,
});

const projectsActionRequested = (actionType) => ({
  type: PROJECTS_CONSTANT[`${actionType}Requested`],
});

const projectsActionError = (actionType, error) => ({
  type: PROJECTS_CONSTANT[`${actionType}Error`],
  error,
});

// clear error message
export const clearErrorMessage = () => async (dispatch) => {
  const actionType = "clearErrorMessage";
  await dispatch(projectsActionSuccess(actionType));
};

// clear success message
export const clearSuccessMessage = () => async (dispatch) => {
  const actionType = "clearSuccessMessage";
  await dispatch(projectsActionSuccess(actionType));
};

export const openLogoutModal = () => async (dispatch) => {
  const actionType = "logout";
  await dispatch(projectsActionSuccess(actionType));
};

export const dismissLogoutModal = () => async (dispatch) => {
  const actionType = "closeLogout";
  await dispatch(projectsActionSuccess(actionType));
};

export const handleErrorRequest = (payload) => async (dispatch) => {
  const actionType = "set";
  await dispatch(projectsActionError(actionType, payload));
};
export const setCurrentTab = (payload) => async (dispatch) => {
  const actionType = "currentTab";
  await dispatch(projectsActionSuccess(actionType, payload));
};
export const setAnomaliesType = (payload) => async (dispatch) => {
  const actionType = "anomaliesType";
  await dispatch(projectsActionSuccess(actionType, payload));
};

export const saveAddedFieldReport = (payload) => async (dispatch) => {
  const actionType = "addFieldReport";
  await dispatch(projectsActionSuccess(actionType, payload));
};
export const removeAddedFieldReport = (payload) => async (dispatch) => {
  const actionType = "removeFieldReport";
  await dispatch(projectsActionSuccess(actionType, payload));
};

export const saveAddedSupportingDocs = (payload) => async (dispatch) => {
  const actionType = "addSupportingDocs";
  await dispatch(projectsActionSuccess(actionType, payload));
};

export const removeAddedSupportingDocs = (payload) => async (dispatch) => {
  const actionType = "removeSupportingDocs";
  await dispatch(projectsActionSuccess(actionType, payload));
};

export const saveProjectId = (payload) => async (dispatch) => {
  const actionType = "saveProjectId";
  await dispatch(projectsActionSuccess(actionType, payload));
};

export const setTrackingId = (payload) => async (dispatch) => {
  const actionType = "setTrackingId";
  await dispatch(projectsActionSuccess(actionType, payload));
};

export const openModal = (payload) => async (dispatch) => {
  const actionType = "modal";
  await dispatch(projectsActionSuccess(actionType, payload));
};

export const fetchAllProjectCycle = (params, navigate) => {
  const actionType = "getAllProjectCyclePaginated";
  return async (dispatch) => {
    try {
      dispatch(projectsActionRequested(actionType, true));
      const res = await makeGetRequest(
        `/trackings/getAllProjectTrackingInstancesPaginated`,
        params
      );
      if (res.status !== 200) {
        dispatch(projectsActionError(actionType, res.data));
      } else {
        console.log(res);
        dispatch(projectsActionSuccess(actionType, res.data.data));
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          navigate(`/`);
          sessionStorage.removeItem("IWPW_3ing_Token");
        } else {
          return dispatch(
            projectsActionError(actionType, error.response.data.message)
          );
        }
      } else if (error.request) {
        // console.log(error.request)
        return dispatch(projectsActionError(actionType, "Network error"));
      } else {
        // Something happened in setting up the request and triggered an error
        console.log("axios", error.message);
        //  dispatch(projectsActionError(actionType, "Network error"));
      }
    }
  };
};

export const handleFieldReportUpload = (params, navigate) => {
  const actionType = "uploadFieldReport";
  return async (dispatch) => {
    try {
      dispatch(projectsActionRequested(actionType, true));
      const res = await makePostRequest(`/reporting/uploadFieldReport`, params);
      if (res.status !== 200 && res.status !== 201) {
        dispatch(projectsActionError(actionType, res.data));
      } else {
        dispatch(projectsActionSuccess(actionType));
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          navigate(`/`);
          sessionStorage.removeItem("IWPW_3ing_Token");
        } else {
          return dispatch(
            projectsActionError(actionType, error.response.data.message)
          );
        }
      } else if (error.request) {
        // console.log(error.request)
        return dispatch(projectsActionError(actionType, "Network error"));
      } else {
        // Something happened in setting up the request and triggered an error
        console.log("axios", error.message);
        return dispatch(projectsActionError(actionType, "Network error"));
      }
    }
  };
};

export const fetchUploadedFieldData = (params, navigate) => {
  const actionType = "getUploadedFieldFile";
  return async (dispatch) => {
    try {
      dispatch(projectsActionRequested(actionType, true));
      const res = await makeGetRequest(
        `/reporting/getUploadFieldReports`,
        params
      );
      if (res.status !== 200 && res.status !== 201) {
        dispatch(projectsActionError(actionType, res.data));
      } else {
        console.log(res, "jjj");
        dispatch(projectsActionSuccess(actionType, res.data.data));
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          navigate(`/`);
          sessionStorage.removeItem("IWPW_3ing_Token");
        } else {
          return dispatch(
            projectsActionError(actionType, error.response.data.message)
          );
        }
      } else if (error.request) {
        // console.log(error.request)
        return dispatch(projectsActionError(actionType, "Network error"));
      } else {
        // Something happened in setting up the request and triggered an error
        console.log("axios", error.message);
        return dispatch(projectsActionError(actionType, "Network error"));
      }
    }
  };
};

export const fetchProjectList = (params, navigate) => {
  const actionType = "getProjectList";
  return async (dispatch) => {
    try {
      dispatch(projectsActionRequested(actionType, true));
      const res = await makeGetRequest(
        `/projects/getProjectsByTrackingIdPaginated`,
        params
      );
      if (res.status !== 200) {
        dispatch(projectsActionError(actionType, res.data));
      } else {
        console.log(res);
        dispatch(projectsActionSuccess(actionType, res.data.data));
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          navigate(`/`);
          sessionStorage.removeItem("IWPW_3ing_Token");
        } else {
          return dispatch(
            projectsActionError(actionType, error.response.data.message)
          );
        }
      } else if (error.request) {
        // console.log(error.request)
        return dispatch(projectsActionError(actionType, "Network error"));
      } else {
        // Something happened in setting up the request and triggered an error
        console.log("axios", error.message);
        //  dispatch(projectSelectionActionsError(actionType, "Network error"));
      }
    }
  };
};

export const handleUploadSupporting = (params, navigate) => {
  const actionType = "uploadSupportingDocument";
  return async (dispatch) => {
    try {
      dispatch(projectsActionRequested(actionType, true));
      const res = await makePostRequest(
        `/projects/uploadSupportingDocuments`,
        params
      );
      if (res.status !== 200 && res.status !== 201) {
        dispatch(projectsActionError(actionType, res.data));
      } else {
        dispatch(projectsActionSuccess(actionType, res.data));
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          navigate(`/`);
          sessionStorage.removeItem("IWPW_3ing_Token");
        } else {
          return dispatch(
            projectsActionError(actionType, error.response.data.message)
          );
        }
      } else if (error.request) {
        // console.log(error.request)
        return dispatch(projectsActionError(actionType, "Network error"));
      } else {
        // Something happened in setting up the request and triggered an error
        console.log("axios", error.message);
        return dispatch(projectsActionError(actionType, "Network error"));
      }
    }
  };
};

export const fetchSupportingDocumentsData = (params, navigate) => {
  const actionType = "getSupportingDocumentData";
  return async (dispatch) => {
    try {
      dispatch(projectsActionRequested(actionType, true));
      const res = await makeGetRequest(
        `/projects/getProjectSupportingDocuments`,
        params
      );
      if (res.status !== 200) {
        dispatch(projectsActionError(actionType, res.data));
      } else {
        console.log(res);
        dispatch(projectsActionSuccess(actionType, res.data.data));
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          navigate(`/`);
          sessionStorage.removeItem("IWPW_3ing_Token");
        } else {
          return dispatch(
            projectsActionError(actionType, error.response.data.message)
          );
        }
      } else if (error.request) {
        // console.log(error.request)
        return dispatch(projectsActionError(actionType, "Network error"));
      } else {
        // Something happened in setting up the request and triggered an error
        console.log("axios", error.message);
        //  dispatch(projectSelectionActionsError(actionType, "Network error"));
      }
    }
  };
};

export const handleDeleteSupportingDocs = (params, navigate) => {
  const actionType = "deleteSupportingDocumentData";
  return async (dispatch) => {
    try {
      dispatch(projectsActionRequested(actionType, true));
      const res = await makeGetRequest(
        `/projects/deleteSupportingDocument`,
        params
      );
      if (res.status !== 200) {
        dispatch(projectsActionError(actionType, res.data));
      } else {
        console.log(res);
        dispatch(projectsActionSuccess(actionType, res.data.data));
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          navigate(`/`);
          sessionStorage.removeItem("IWPW_3ing_Token");
        } else {
          return dispatch(
            projectsActionError(actionType, error.response.data.message)
          );
        }
      } else if (error.request) {
        // console.log(error.request)
        return dispatch(projectsActionError(actionType, "Network error"));
      } else {
        // Something happened in setting up the request and triggered an error
        console.log("axios", error.message);
        //  dispatch(projectSelectionActionsError(actionType, "Network error"));
      }
    }
  };
};

export const fetchProjectAnomalies = (params, navigate) => {
  const actionType = "getProjectAnomalies";
  return async (dispatch) => {
    try {
      dispatch(projectsActionRequested(actionType, true));
      const res = await makeGetRequest(
        `/anomalies/getAnomaliesByProjectId`,
        params
      );
      if (res.status !== 200) {
        dispatch(projectsActionError(actionType, res.data));
      } else {
        console.log(res);
        dispatch(projectsActionSuccess(actionType, res.data.data));
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          navigate(`/`);
          sessionStorage.removeItem("IWPW_3ing_Token");
        } else {
          return dispatch(
            projectsActionError(actionType, error.response.data.message)
          );
        }
      } else if (error.request) {
        // console.log(error.request)
        return dispatch(projectsActionError(actionType, "Network error"));
      } else {
        // Something happened in setting up the request and triggered an error
        console.log("axios", error.message);
        //  dispatch(projectSelectionActionsError(actionType, "Network error"));
      }
    }
  };
};

// upload closeout report
export const handleUploadCloseOutReport = (params, navigate) => {
  const actionType = "uploadCloseOutReport";
  return async (dispatch) => {
    try {
      dispatch(projectsActionRequested(actionType, true));
      const res = await makePostRequest(`/reporting/uploadFieldReport`, params);
      if (res.status !== 200 && res.status !== 201) {
        dispatch(projectsActionError(actionType, res.data));
      } else {
        dispatch(projectsActionSuccess(actionType));
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          navigate(`/`);
          sessionStorage.removeItem("IWPW_3ing_Token");
        } else {
          return dispatch(
            projectsActionError(actionType, error.response.data.message)
          );
        }
      } else if (error.request) {
        // console.log(error.request)
        return dispatch(projectsActionError(actionType, "Network error"));
      } else {
        // Something happened in setting up the request and triggered an error
        console.log("axios", error.message);
        return dispatch(projectsActionError(actionType, "Network error"));
      }
    }
  };
};

// download closeout report
export const handleDownloadAnomaliesReport = (params, navigate) => {
  const actionType = "donwloadCloseOut";
  return async (dispatch) => {
    try {
      dispatch(projectsActionRequested(actionType, true));
      const res = await makeGetRequest(
        `/anomalies/downloadAnomalyReport`,
        params
      );
      if (res.status !== 200) {
        dispatch(projectsActionError(actionType, res.data));
      } else {
        const link = document.createElement("a");
        link.href = res.data.data;
        link.setAttribute("download", ""); //or any other extension
        document.body.appendChild(link);
        link.click();

        dispatch(projectsActionSuccess(actionType, res.data.data));
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          navigate(`/`);
          sessionStorage.removeItem("IWPW_3ing_Token");
        } else {
          return dispatch(
            projectsActionError(actionType, error.response.data.message)
          );
        }
      } else if (error.request) {
        // console.log(error.request)
        return dispatch(projectsActionError(actionType, "Network error"));
      } else {
        // Something happened in setting up the request and triggered an error
        console.log("axios", error.message);
        return dispatch(projectsActionError(actionType, "Network error"));
      }
    }
  };
};