import USERS_CONSTANT from "./type";
import { makeGetRequest, makePostRequest, makePutRequest } from "./api";

const usersActionSuccess = (actionType, payload) => ({
  type: USERS_CONSTANT[`${actionType}Success`],
  payload,
});

const usersActionRequested = (actionType) => ({
  type: USERS_CONSTANT[`${actionType}Requested`],
});

const usersActionError = (actionType, error) => ({
  type: USERS_CONSTANT[`${actionType}Error`],
  error,
});

// clear error message
export const clearErrorMessage = () => (dispatch) => {
  const actionType = "clearErrorMessage";
  dispatch(usersActionSuccess(actionType));
};

// clear success message
export const clearSuccessMessage = () => (dispatch) => {
  const actionType = "clearSuccessMessage";
  dispatch(usersActionSuccess(actionType));
};

export const SetRequestError = (payload) => async (dispatch) => {
  const actionType = "set";
  dispatch(usersActionError(actionType, payload));
};

export const openRevokeModal = (payload) => async (dispatch) => {
  const actionType = "RevokeAccess";
  dispatch(usersActionSuccess(actionType, payload));
};

export const openEditModal = (payload) => async (dispatch) => {
  const actionType = "EditUser";
  dispatch(usersActionSuccess(actionType, payload));
};

export const openAddModal = (payload) => async (dispatch) => {
  const actionType = "AddUser";
  dispatch(usersActionSuccess(actionType, payload));
};

export const fetchAllUsers = (params, navigate) => {
  const actionType = "getAllUsers";
  return async (dispatch) => {
    try {
      dispatch(usersActionRequested(actionType, true));
      const res = await makeGetRequest(`/metadata/getAllUsers`, params);
      if (res.status !== 200) {
        dispatch(usersActionError(actionType, res.data));
      } else {
        console.log(res);
        dispatch(usersActionSuccess(actionType, res.data.data));
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          navigate(`/`);
          sessionStorage.removeItem("IWPW_3ing_Token");
        } else {
          return dispatch(
            usersActionError(actionType, error.response.data.message)
          );
        }
      } else if (error.request) {
        // console.log(error.request)
        return dispatch(usersActionError(actionType, "Network error"));
      } else {
        // Something happened in setting up the request and triggered an error
        console.log("axios", error.message);
        //  dispatch(projectSelectionActionsError(actionType, "Network error"));
      }
    }
  };
};

export const handleAddNewuser = (params, navigate) => {
  const actionType = "addNewUser";
  return async (dispatch) => {
    try {
      dispatch(usersActionRequested(actionType, true));
      const res = await makePostRequest(`/user/register`, params);
      if (res.status !== 200 && res.status !== 201) {
        dispatch(usersActionError(actionType, res.data));
      } else {
        console.log(res, 'new u');
        dispatch(usersActionSuccess(actionType, res.data.data));
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          navigate(`/`);
          sessionStorage.removeItem("IWPW_3ing_Token");
        } else {
          return dispatch(
            usersActionError(actionType, error.response.data.message)
          );
        }
      } else if (error.request) {
        // console.log(error.request)
        return dispatch(usersActionError(actionType, "Network error"));
      } else {
        // Something happened in setting up the request and triggered an error
        console.log("axios", error.message);
        //  dispatch(projectSelectionActionsError(actionType, "Network error"));
      }
    }
  };
};

export const handleDeleteuser = (params, navigate) => {
  const actionType = "deleteUser";
  return async (dispatch) => {
    try {
      dispatch(usersActionRequested(actionType, true));
      const res = await makeGetRequest(
        `/user/delete?userId=${params.userId}`
      );
      if (res.status !== 200) {
        dispatch(usersActionError(actionType, res.data));
      } else {
        console.log(res);
        dispatch(usersActionSuccess(actionType, params));
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          navigate(`/`);
          sessionStorage.removeItem("IWPW_3ing_Token");
        } else {
          return dispatch(
            usersActionError(actionType, error.response.data.message)
          );
        }
      } else if (error.request) {
        // console.log(error.request)
        return dispatch(usersActionError(actionType, "Network error"));
      } else {
        // Something happened in setting up the request and triggered an error
        console.log("axios", error.message);
        //  dispatch(projectSelectionActionsError(actionType, "Network error"));
      }
    }
  };
};

export const handleUpdateuser = (params, navigate) => {
  const actionType = "editUser";
  return async (dispatch) => {
    try {
      dispatch(usersActionRequested(actionType, true));
      const res = await makePostRequest(`/user/updateUserProfile?userId=${params.Id}`, params);
      if (res.status !== 200) {
        dispatch(usersActionError(actionType, res.data));
      } else {
        console.log(res);
        dispatch(usersActionSuccess(actionType, res.data.data));
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          navigate(`/`);
          sessionStorage.removeItem("IWPW_3ing_Token");
        } else {
          return dispatch(
            usersActionError(actionType, error.response.data.message)
          );
        }
      } else if (error.request) {
        // console.log(error.request)
        return dispatch(usersActionError(actionType, "Network error"));
      } else {
        // Something happened in setting up the request and triggered an error
        console.log("axios", error.message);
        //  dispatch(projectSelectionActionsError(actionType, "Network error"));
      }
    }
  };
};
