import GLOBAL_CONSTANT from "./type";
// import { makeGetRequest } from "./api";

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
export const clearErrorMessage = () => (dispatch) => {
  const actionType = "clearErrorMessage";
  dispatch(globalActionsSuccess(actionType));
};

// clear success message
export const clearSuccessMessage = () => (dispatch) => {
  const actionType = "clearSuccessMessage";
  dispatch(globalActionsSuccess(actionType));
};

export const openLogoutModal = () => (dispatch) =>{
  const actionType = "logout";
  dispatch(globalActionsSuccess(actionType));
};

export const dismissLogoutModal = () => (dispatch) =>{
  const actionType = "closeLogout";
  dispatch(globalActionsSuccess(actionType));
};

export const fetchCountries = (history) => {
  const actionType = "getCountries";
  return async (dispatch) => {
    try {
      dispatch(globalActionsRequested(actionType, true));
      const res = await makeGetRequest(`/api/getCountry`);
      if (res.status !== 200) {
        return dispatch(globalActionsError(actionType, res.data));
      } else {
        console.log(res);
        dispatch(globalActionsSuccess(actionType, res.data));
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        if (error.response.status === 401) {
          history.push(`/`);
          sessionStorage.removeItem("Intro_LETTER_Portal_Token");
        } else {
          return dispatch(
            globalActionsError(actionType, error.response.data.msg)
          );
        }
      } else if (error.request) {
        // console.log(error.request)
        return dispatch(globalActionsError(actionType, "Network error"));
      } else {
        // Something happened in setting up the request and triggered an error
        console.log("axios", error.message);
        dispatch(globalActionsError(actionType, "Network error"));
      }
    }
  };
};

export const fetchLocations = (history) => {
  const actionType = "getLocations";
  return async (dispatch) => {
    try {
      dispatch(globalActionsRequested(actionType, true));
      const res = await makeGetRequest(`/api/GetLocations`);
      if (res.status !== 200) {
        return dispatch(globalActionsError(actionType, res.data));
      } else {
        console.log(res);
        dispatch(globalActionsSuccess(actionType, res.data));
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          history.push(`/`);
          sessionStorage.removeItem("Intro_LETTER_Portal_Token");
        } else {
          return dispatch(
            globalActionsError(actionType, error.response.data.msg)
          );
        }
      } else if (error.request) {
        // console.log(error.request)
        return dispatch(globalActionsError(actionType, "Network error"));
      } else {
        // Something happened in setting up the request and triggered an error
        console.log("axios", error.message);
      }
    }
  };
};

export const signup =()=>{

}
