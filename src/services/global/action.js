import GLOBAL_CONSTANT from "./type";
import { makeGetRequest, makeAuthRequest } from "./api";

const globalActionsSuccess = (actionType, payload) => ({
  type: GLOBAL_CONSTANT[`${actionType}Success`],
  payload,
});

const globalActionsRequested = (actionType) => ({
  type: GLOBAL_CONSTANT[`${actionType}Requested`],
});

const globalActionsError = (actionType, error) => ({
  type: GLOBAL_CONSTANT[`${actionType}Error`],
  error,
});

// clear error message
export const clearGlobalErrorMessage = () => async (dispatch) => {
  const actionType = "clearErrorMessage";
  await dispatch(globalActionsSuccess(actionType));
};

// clear success message
export const clearGlobalSuccessMessage = () => async (dispatch) => {
  const actionType = "clearSuccessMessage";
  await dispatch(globalActionsSuccess(actionType));
};

export const openLogoutModal = (payload) => async (dispatch) => {
  const actionType = "logout";
  await dispatch(globalActionsSuccess(actionType, payload));
};

export const dismissLogoutModal = (payload) => async (dispatch) => {
  const actionType = "closeLogout";
  await dispatch(globalActionsSuccess(actionType, payload));
};

export const setTrackingId = (payload) => async (dispatch) => {
  const actionType = "setTrackingId";
  await dispatch(globalActionsSuccess(actionType, payload));
};

export const setInitiateNewProject =(payload) => async (dispatch) => {
  const actionType = "inititateNewProject";
  await dispatch(globalActionsSuccess(actionType, payload));
};

export const handleLogin = (params, navigate) => {
  const actionType = "authenticateUser";

  return async (dispatch) => {
    try {
      dispatch(globalActionsRequested(actionType));
      const res = await makeAuthRequest(`/user/login`, params);

      if (res.status !== 200) {
        dispatch(globalActionsError(actionType, res.data.error_description));
      } else {
        sessionStorage.setItem("IWPW_3ing_Token", JSON.stringify(res.data));
        dispatch(globalActionsSuccess(actionType, res.data));
        navigate("/welcome");
      }
    } catch (error) {
      if (error.response) {
        console.log(error, error.response);
        if (error.response.status === 401) {
          navigate(`/`);
          sessionStorage.removeItem("IWPW_3ing_Token");
        } else {
          return dispatch(
            globalActionsError(actionType, error.response.data.error_description)
          );
        }
      } else if (error.request) {
        console.log(error.request);

        return dispatch(globalActionsError(actionType, "Network error"));
      } else {
        // Something happened in setting up the request and triggered an error
        console.log("axios", error.message);
      }
    }
  };
};
export const handleLogOut = (params, navigate) => {
  const actionType = "logoutUser";

  return async (dispatch) => {
    try {
      dispatch(globalActionsRequested(actionType));
      const res = await makeAuthRequest(`/user/logout`, params);

      if (res.status !== 200) {
        dispatch(globalActionsError(actionType, res.data.msg));
      } else {
        dispatch(globalActionsSuccess(actionType, res.data));
      }
    } catch (error) {
      if (error.response) {
        console.log(error, error.response);
        if (error.response.status === 401) {
          navigate(`/`);
          sessionStorage.removeItem("IWPW_3ing_Token");
        } else {
          return dispatch(
            globalActionsError(actionType, error.response.data.msg)
          );
        }
      } else if (error.request) {
        console.log(error.request);

        return dispatch(globalActionsError(actionType, "Network error"));
      } else {
        // Something happened in setting up the request and triggered an error
        console.log("axios", error.message);
      }
    }
  };
};

export const fetchProjectTrackingId = (params, navigate) => {
  const actionType = "TrackingStatus";

  return async (dispatch) => {
    try {
      dispatch(globalActionsRequested(actionType));
      const res = await makeGetRequest(`/trackings/getTrackingById`, params);

      if (res.status !== 200) {
        dispatch(globalActionsError(actionType, res.data.msg));
      } else {
        console.log(res);
        dispatch(globalActionsSuccess(actionType, res.data.data));
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        console.log(error, error.response);
        if (error.response.status === 401) {
          navigate(`/`);
          sessionStorage.removeItem("IWPW_3ing_Token");
        } else {
          return dispatch(
            globalActionsError(actionType, error.response.data.msg)
          );
        }
      } else if (error.request) {
        console.log(error.request);

        return dispatch(globalActionsError(actionType, "Network error"));
      } else {
        // Something happened in setting up the request and triggered an error
        console.log("axios", error.message);
      }
    }
  };
};
