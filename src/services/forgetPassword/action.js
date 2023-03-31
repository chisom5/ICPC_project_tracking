import FORGOTPASSWORD_CONSTANT from "./type";
import { makePostRequestWithoutToken } from "./api";

const forgotPasswordActionSuccess = (actionType, payload) => ({
  type: FORGOTPASSWORD_CONSTANT[`${actionType}Success`],
  payload,
});

const forgotPasswordActionRequested = (actionType) => ({
  type: FORGOTPASSWORD_CONSTANT[`${actionType}Requested`],
});

const forgotPasswordActionError = (actionType, error) => ({
  type: FORGOTPASSWORD_CONSTANT[`${actionType}Error`],
  error,
});

// clear error message
export const clearErrorMessage = () => async (dispatch) => {
  const actionType = "clearErrorMessage";
  await dispatch(forgotPasswordActionSuccess(actionType));
};

// clear success message
export const clearSuccessMessage = () => async (dispatch) => {
  const actionType = "clearSuccessMessage";
  await dispatch(forgotPasswordActionSuccess(actionType));
};

export const SetRequestError = (payload) => async (dispatch) => {
  const actionType = "set";
  await dispatch(forgotPasswordActionError(actionType, payload));
};

export const togglePage = (payload) => async (dispatch) => {
  const actionType = "setPage";
  await dispatch(forgotPasswordActionSuccess(actionType, payload));
};

export const handleForgotPassword = (params, navigate) => {
  const actionType = "forgotPassword";

  return async (dispatch) => {
    try {
      dispatch(forgotPasswordActionRequested(actionType));
      const res = await makePostRequestWithoutToken(
        `/user/forgotPassword`,
        params
      );

      if (res.status !== 200) {
        dispatch(forgotPasswordActionError(actionType, res.data.message));
      } else {
        dispatch(forgotPasswordActionSuccess(actionType, res.data));
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          navigate(`/`);
          sessionStorage.removeItem("IWPW_3ing_Token");
        } else {
          return dispatch(
            forgotPasswordActionError(actionType, error.response.data.message)
          );
        }
      } else if (error.request) {
        console.log(error.request);

        return dispatch(forgotPasswordActionError(actionType, "Network error"));
      } else {
        // Something happened in setting up the request and triggered an error
        console.log("axios", error.message);
      }
    }
  };
};

export const handleResetPassword = (params, navigate) => {
  const actionType = "resetPassword";

  return async (dispatch) => {
    try {
      dispatch(forgotPasswordActionRequested(actionType));
      const res = await makePostRequestWithoutToken(
        `/user/setPasswordFromEmailLink`,
        params
      );

      if (res.status !== 200) {
        dispatch(forgotPasswordActionError(actionType, res.data.message));
      } else {
        dispatch(forgotPasswordActionSuccess(actionType, res.data));
        // 
      }
    } catch (error) {
      if (error.response) {
        console.log(error, error.response);
        if (error.response.status === 401) {
          navigate(`/`);
          sessionStorage.removeItem("IWPW_3ing_Token");
        } else {
        return dispatch(
          forgotPasswordActionError(actionType, error.response.data.message)
        );
        }
      } else if (error.request) {
        console.log(error.request);

        return dispatch(forgotPasswordActionError(actionType, "Network error"));
      } else {
        // Something happened in setting up the request and triggered an error
        console.log("axios", error.message);
      }
    }
  };
};
