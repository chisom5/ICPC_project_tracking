import PROJECTSELECTION_CONSTANT from "./type";
// import { makeGetRequest } from "./api";

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
export const clearErrorMessage = () => (dispatch) => {
  const actionType = "clearErrorMessage";
  dispatch(projectSelectionActionsSuccess(actionType));
};

// clear success message
export const clearSuccessMessage = () => (dispatch) => {
  const actionType = "clearSuccessMessage";
  dispatch(projectSelectionActionsSuccess(actionType));
};

export const openLogoutModal = () => (dispatch) => {
  const actionType = "logout";
  dispatch(projectSelectionActionsSuccess(actionType));
};

export const dismissLogoutModal = () => (dispatch) => {
  const actionType = "closeLogout";
  dispatch(projectSelectionActionsSuccess(actionType));
};

export const handleErrorRequest = (payload) => (dispatch) => {
  const actionType = "set";
  dispatch(projectSelectionActionsError(actionType, payload));
};

export const openModal = (payload) => (dispatch) => {
  const actionType = "modal";
  dispatch(projectSelectionActionsSuccess(actionType, payload));
};
// export const fetchCountries = (history) => {
//   const actionType = "getCountries";
//   return async (dispatch) => {
//     try {
//       dispatch(projectSelectionActionsRequested(actionType, true));
//       const res = await makeGetRequest(`/api/getCountry`);
//       if (res.status !== 200) {
//         return dispatch(projectSelectionActionsError(actionType, res.data));
//       } else {
//         console.log(res);
//         dispatch(projectSelectionActionsSuccess(actionType, res.data));
//       }
//     } catch (error) {
//       console.log(error);
//       if (error.response) {
//         if (error.response.status === 401) {
//           history.push(`/`);
//           sessionStorage.removeItem("Intro_LETTER_Portal_Token");
//         } else {
//           return dispatch(
//             projectSelectionActionsError(actionType, error.response.data.msg)
//           );
//         }
//       } else if (error.request) {
//         // console.log(error.request)
//         return dispatch(projectSelectionActionsError(actionType, "Network error"));
//       } else {
//         // Something happened in setting up the request and triggered an error
//         console.log("axios", error.message);
//         dispatch(projectSelectionActionsError(actionType, "Network error"));
//       }
//     }
//   };
// }
