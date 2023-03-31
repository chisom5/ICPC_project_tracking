import CONTRACTS_CONSTANT from "./type";
import { makeGetRequest, makeFormDataPostRequest } from "./api";

const contractsActionSuccess = (actionType, payload) => ({
  type: CONTRACTS_CONSTANT[`${actionType}Success`],
  payload,
});

const contractsActionRequested = (actionType) => ({
  type: CONTRACTS_CONSTANT[`${actionType}Requested`],
});

const contractsActionError = (actionType, error) => ({
  type: CONTRACTS_CONSTANT[`${actionType}Error`],
  error,
});

// clear error message
export const clearErrorMessage = () => async (dispatch) => {
  const actionType = "clearErrorMessage";
  await dispatch(contractsActionSuccess(actionType));
};

// clear success message
export const clearSuccessMessage = () => async (dispatch) => {
  const actionType = "clearSuccessMessage";
  await dispatch(contractsActionSuccess(actionType));
};

export const openLogoutModal = () => async (dispatch) => {
  const actionType = "logout";
  await dispatch(contractsActionSuccess(actionType));
};

export const dismissLogoutModal = () => async (dispatch) => {
  const actionType = "closeLogout";
  await dispatch(contractsActionSuccess(actionType));
};

export const handleErrorRequest = (payload) => async (dispatch) => {
  const actionType = "set";
  await dispatch(contractsActionError(actionType, payload));
};

export const handleRequestSuccess = (payload) => async (dispatch) => {
  const actionType = "set";
  await dispatch(contractsActionSuccess(actionType, payload));
};

export const setContractDUpload = (payload) => async (dispatch) => {
  const actionType = "saveContractDUpload";
  await dispatch(contractsActionSuccess(actionType, payload));
};

export const setContractView = (payload) => async (dispatch) => {
  const actionType = "contractView";
  await dispatch(contractsActionSuccess(actionType, payload));
};

export const handleRemoveContractInfo = (payload) => async (dispatch) => {
  const actionType = "removeContractInfo";
  await dispatch(contractsActionSuccess(actionType, payload));
};

export const handleFilterAnomalyRecord = (payload) => async (dispatch) => {
  const actionType = "filterAnomaly";
  await dispatch(contractsActionSuccess(actionType, payload));
};

export const handleDownloadContractDetailsTemp = (params, navigate) => {
  const actionType = "downloadContractDetailstemp";
  return async (dispatch) => {
    try {
      dispatch(contractsActionRequested(actionType, true));
      const res = await makeGetRequest(
        `/contract/downloadContractDetailsTemplate`,
        params
      );
      if (res.status !== 200) {
        dispatch(contractsActionError(actionType, res.data));
      } else {
        const link = document.createElement("a");
        link.href = res.data.data;
        link.setAttribute("download", "ContractDetails.xlsx"); //or any other extension
        document.body.appendChild(link);
        link.click();

        dispatch(contractsActionSuccess(actionType, res.data.data));
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          navigate(`/`);
          sessionStorage.removeItem("IWPW_3ing_Token");
        } else {
          return dispatch(
            contractsActionError(actionType, error.response.data.message)
          );
        }
      } else if (error.request) {
        // console.log(error.request)
        return dispatch(contractsActionError(actionType, "Network error"));
      } else {
        // Something happened in setting up the request and triggered an error
        console.log("axios", error.message);
        return dispatch(contractsActionError(actionType, "Network error"));
      }
    }
  };
};

export const handleUploadContractDetailData = (
  params,
  uploadedData,
  navigate
) => {
  const actionType = "uploadContractDetailsData";
  return async (dispatch) => {
    try {
      dispatch(contractsActionRequested(actionType, true));
      const res = await makeFormDataPostRequest(
        `/contract/uploadContractDetails`,
        params
      );
      if (res.status !== 200 && res.status !== 201) {
        dispatch(contractsActionError(actionType, res.data));
      } else {
        dispatch(contractsActionSuccess(actionType, uploadedData));
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          navigate(`/`);
          sessionStorage.removeItem("IWPW_3ing_Token");
        } else {
          return dispatch(
            contractsActionError(actionType, error.response.data.message)
          );
        }
      } else if (error.request) {
        // console.log(error.request)
        return dispatch(contractsActionError(actionType, "Network error"));
      } else {
        // Something happened in setting up the request and triggered an error
        console.log("axios", error.message);
        return dispatch(contractsActionError(actionType, "Network error"));
      }
    }
  };
};

export const handleDownloadContractDirectorsTemp = (params, navigate) => {
  const actionType = "downloadContractDirectorstemp";
  return async (dispatch) => {
    try {
      dispatch(contractsActionRequested(actionType, true));
      const res = await makeGetRequest(
        `/contract/downloadContractingDirectorsTemplate`,
        params
      );
      if (res.status !== 200) {
        dispatch(contractsActionError(actionType, res.data));
      } else {
        const link = document.createElement("a");
        link.href = res.data.data;
        link.setAttribute("download", "ContractDetails.xlsx"); //or any other extension
        document.body.appendChild(link);
        link.click();

        dispatch(contractsActionSuccess(actionType, res.data.data));
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          navigate(`/`);
          sessionStorage.removeItem("IWPW_3ing_Token");
        } else {
          return dispatch(
            contractsActionError(actionType, error.response.data.message)
          );
        }
      } else if (error.request) {
        // console.log(error.request)
        return dispatch(contractsActionError(actionType, "Network error"));
      } else {
        // Something happened in setting up the request and triggered an error
        console.log("axios", error.message);
        return dispatch(contractsActionError(actionType, "Network error"));
      }
    }
  };
};

export const handleUploadContractDirectorsData = (params, navigate) => {
  const actionType = "uploadContractDirectorsData";
  return async (dispatch) => {
    try {
      dispatch(contractsActionRequested(actionType, true));
      const res = await makeFormDataPostRequest(
        `/contract/uploadContractingDirectors`,
        params
      );
      if (res.status !== 200 && res.status !== 201) {
        dispatch(contractsActionError(actionType, res.data));
      } else {
        console.log(res, "w");
        dispatch(contractsActionSuccess(actionType, res));
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          navigate(`/`);
          sessionStorage.removeItem("IWPW_3ing_Token");
        } else {
          return dispatch(
            contractsActionError(actionType, error.response.data.message)
          );
        }
      } else if (error.request) {
        // console.log(error.request)
        return dispatch(contractsActionError(actionType, "Network error"));
      } else {
        // Something happened in setting up the request and triggered an error
        console.log("axios", error.message);
        return dispatch(contractsActionError(actionType, "Network error"));
      }
    }
  };
};

export const fetchContractAnomalByTrackingId = (params, navigate) => {
  const actionType = "getContractAnomalyByTrackingId";
  return async (dispatch) => {
    try {
      dispatch(contractsActionRequested(actionType, true));
      const res = await makeGetRequest(
        `/projects/getProjectsByTrackingIdPaginated`,
        params
      );
      if (res.status !== 200) {
        return dispatch(contractsActionError(actionType, res.data));
      } else {
        console.log(res);
        dispatch(contractsActionSuccess(actionType, res.data.data));
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          navigate(`/`);
          sessionStorage.removeItem("IWPW_3ing_Token");
        } else {
          return dispatch(
            contractsActionError(actionType, error.response.data.message)
          );
        }
      } else if (error.request) {
        // console.log(error.request)
        return dispatch(contractsActionError(actionType, "Network error"));
      } else {
        // Something happened in setting up the request and triggered an error
        console.log("axios", error.message);
        // dispatch(contractsActionError(actionType, "Network error"));
      }
    }
  };
};

export const fetchAnomalyReviewByProjectId = (params, navigate) => {
  const actionType = "getAnomalyReviewByProjectId";
  return async (dispatch) => {
    try {
      dispatch(contractsActionRequested(actionType, true));
      const res = await makeGetRequest(
        `/anomalies/getAnomaliesByProjectId`,
        params
      );
      if (res.status !== 200) {
        return dispatch(contractsActionError(actionType, res.data));
      } else {
        console.log(res);
        dispatch(contractsActionSuccess(actionType, res.data.data));
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          navigate(`/`);
          sessionStorage.removeItem("IWPW_3ing_Token");
        } else {
          return dispatch(
            contractsActionError(actionType, error.response.data.message)
          );
        }
      } else if (error.request) {
        // console.log(error.request)
        return dispatch(contractsActionError(actionType, "Network error"));
      } else {
        // Something happened in setting up the request and triggered an error
        console.log("axios", error.message);
        // dispatch(contractsActionError(actionType, "Network error"));
      }
    }
  };
};

export const handleIgnoreAllAnomalies = (params, navigate) => {
  const actionType = "ignoreAllAnomalies";
  return async (dispatch) => {
    try {
      dispatch(contractsActionRequested(actionType, true));
      const res = await makeGetRequest(
        `/anomalies/ignoreAllProjectAnomalies?projectId=${params.projectId}`,
        params
      );
      if (res.status !== 200) {
        return dispatch(contractsActionError(actionType, res.data));
      } else {
        console.log(res);
        dispatch(contractsActionSuccess(actionType, params));
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          navigate(`/`);
          sessionStorage.removeItem("IWPW_3ing_Token");
        } else {
          return dispatch(
            contractsActionError(actionType, error.response.data.message)
          );
        }
      } else if (error.request) {
        // console.log(error.request)
        return dispatch(contractsActionError(actionType, "Network error"));
      } else {
        // Something happened in setting up the request and triggered an error
        console.log("axios", error.message);
        // dispatch(contractsActionError(actionType, "Network error"));
      }
    }
  };
};

export const handleIgnoreOneAnomaly = (params, navigate) => {
  const actionType = "ignoreOneAnomaly";
  return async (dispatch) => {
    try {
      dispatch(contractsActionRequested(actionType, true));
      const res = await makeGetRequest(
        `/anomalies/ignoreSpecificAnomaly?anomalyId=${params.anomalyId}`,
        params
      );
      if (res.status !== 200) {
        return dispatch(contractsActionError(actionType, res.data));
      } else {
        console.log(res);
        dispatch(contractsActionSuccess(actionType, res.data.data));
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          navigate(`/`);
          sessionStorage.removeItem("IWPW_3ing_Token");
        } else {
          return dispatch(
            contractsActionError(actionType, error.response.data.message)
          );
        }
      } else if (error.request) {
        // console.log(error.request)
        return dispatch(contractsActionError(actionType, "Network error"));
      } else {
        // Something happened in setting up the request and triggered an error
        console.log("axios", error.message);
        // dispatch(contractsActionError(actionType, "Network error"));
      }
    }
  };
};