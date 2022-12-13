import FORGOTPASSWORD_CONSTANT from "./type";
// import { makeGetRequest, makePostRequest } from "./api";

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
export const clearErrorMessage = () => (dispatch) => {
  const actionType = "clearErrorMessage";
  dispatch(forgotPasswordActionSuccess(actionType));
};

// clear success message
export const clearSuccessMessage = () => (dispatch) => {
  const actionType = "clearSuccessMessage";
  dispatch(forgotPasswordActionSuccess(actionType));
};

export const SetRequestError = (payload) => async (dispatch) => {
  const actionType = "set";
  dispatch(forgotPasswordActionError(actionType, payload));
};

export const togglePage = (payload) => async (dispatch) => {
  const actionType = "setPage";
  dispatch(forgotPasswordActionSuccess(actionType, payload));
};

// export const handleCreateEmbassyRequest = (params, history) => {
//   const actionType = "EmbassyRequest";
//   return async (dispatch) => {
//     try {
//       dispatch(forgotPasswordActionRequested(actionType, true));
//       const res = await makePostRequest(`/api/createRequest`, params);
//       if (res.status !== 200) {
//         return dispatch(forgotPasswordActionError(actionType, res.data));
//       } else {
//         console.log(res);
//         dispatch(forgotPasswordActionSuccess(actionType, res.data));
//       }
//     } catch (error) {
//       if (error.response) {
//         if (error.response.status === 401) {
//           history.push(`/`);
//           sessionStorage.removeItem("Intro_LETTER_Portal_Token");
//         } else {
//           return dispatch(
//             forgotPasswordActionError(actionType, error.response.data.msg)
//           );
//         }
//       } else if (error.request) {
//         // console.log(error.request)
//         return dispatch(forgotPasswordActionError(actionType, "Network error"));
//       } else {
//         // Something happened in setting up the request and triggered an error
//         console.log("axios", error.message);
//       }
//     }
//   };
// };

