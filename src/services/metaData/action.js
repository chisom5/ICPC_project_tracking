import META_DATA_CONSTANT from "./type";
import { makeGetRequest, makeAuthRequest } from "./api";

const metaDataActionsSuccess = (actionType, payload) => ({
  type: META_DATA_CONSTANT[`${actionType}Success`],
  payload,
});

const metaDataActionsRequested = (actionType) => ({
  type: META_DATA_CONSTANT[`${actionType}Requested`],
});

const metaDataActionsError = (actionType, error) => ({
  type: META_DATA_CONSTANT[`${actionType}Error`],
  error,
});

// clear error message
export const clearErrorMessage = () => async (dispatch) => {
  const actionType = "clearErrorMessage";
  await dispatch(metaDataActionsSuccess(actionType));
};

// clear success message
export const clearSuccessMessage = () => async (dispatch) => {
  const actionType = "clearSuccessMessage";
  await dispatch(metaDataActionsSuccess(actionType));
};

export const fetchAllProjectTrackingInstance = (navigate) => {
  const actionType = "allTrackingInstance";

  return async (dispatch) => {
    try {
      dispatch(metaDataActionsRequested(actionType));
      const res = await makeGetRequest(
        `/trackings/getAllProjectTrackingInstances`
      );

      if (res.status !== 200) {
        dispatch(metaDataActionsError(actionType, res.data.msg));
      } else {
        dispatch(metaDataActionsSuccess(actionType, res.data.data));
      }
    } catch (error) {
      if (error.response) {
        console.log(error, error.response);
        if (error.response.status === 401) {
          navigate(`/`);
          sessionStorage.removeItem("IWPW_3ing_Token");
        } else {
          return dispatch(
            metaDataActionsError(actionType, error.response.data.msg)
          );
        }
      } else if (error.request) {
        console.log(error.request);

        return dispatch(metaDataActionsError(actionType, "Network error"));
      } else {
        // Something happened in setting up the request and triggered an error
        console.log("axios", error.message);
      }
    }
  };
};

export const fetchBudgetTypes = (navigate) => {
  const actionType = "allBudgetTypes";

  return async (dispatch) => {
    try {
      dispatch(metaDataActionsRequested(actionType));
      const res = await makeGetRequest(`/budgets/getBudgetTypes`);

      if (res.status !== 200) {
        dispatch(metaDataActionsError(actionType, res.data.msg));
      } else {
        dispatch(metaDataActionsSuccess(actionType, res.data.data));
      }
    } catch (error) {
      if (error.response) {
        console.log(error, error.response);
        if (error.response.status === 401) {
          navigate(`/`);
          sessionStorage.removeItem("IWPW_3ing_Token");
        } else {
          return dispatch(
            metaDataActionsError(actionType, error.response.data.msg)
          );
        }
      } else if (error.request) {
        console.log(error.request);

        return dispatch(metaDataActionsError(actionType, "Network error"));
      } else {
        // Something happened in setting up the request and triggered an error
        console.log("axios", error.message);
      }
    }
  };
};

export const fetchDefaultProjectSelectionCriteria = (navigate) => {
  const actionType = "getDefaultProjectSelectionCriteria";

  return async (dispatch) => {
    try {
      dispatch(metaDataActionsRequested(actionType));
      const res =
        await makeGetRequest(`/projects/getDefaultProjectSelectionCriteria
      `);

      if (res.status !== 200) {
        dispatch(metaDataActionsError(actionType, res.data.msg));
      } else {
        console.log(res);
        dispatch(metaDataActionsSuccess(actionType, res.data.data));
      }
    } catch (error) {
      if (error.response) {
        console.log(error, error.response);
        if (error.response.status === 401) {
          navigate(`/`);
          sessionStorage.removeItem("IWPW_3ing_Token");
        } else {
          return dispatch(
            metaDataActionsError(actionType, error.response.data.msg)
          );
        }
      } else if (error.request) {
        console.log(error.request);

        return dispatch(metaDataActionsError(actionType, "Network error"));
      } else {
        // Something happened in setting up the request and triggered an error
        console.log("axios", error.message);
      }
    }
  };
};

export const fetchDefaultMetaData = (navigate) => {
  const actionType = "getMetaData";

  return async (dispatch) => {
    try {
      dispatch(metaDataActionsRequested(actionType));
      const res = await makeGetRequest(`/metadata/getMetaData`);

      if (res.status !== 200) {
        dispatch(metaDataActionsError(actionType, res.data.msg));
      } else {
        dispatch(metaDataActionsSuccess(actionType, res.data.data));
      }
    } catch (error) {
      if (error.response) {
        console.log(error, error.response);
        if (error.response.status === 401) {
          navigate(`/`);
          sessionStorage.removeItem("IWPW_3ing_Token");
        } else {
          return dispatch(
            metaDataActionsError(actionType, error.response.data.msg)
          );
        }
      } else if (error.request) {
        console.log(error.request);

        return dispatch(metaDataActionsError(actionType, "Network error"));
      } else {
        // Something happened in setting up the request and triggered an error
        console.log("axios", error.message);
      }
    }
  };
};
