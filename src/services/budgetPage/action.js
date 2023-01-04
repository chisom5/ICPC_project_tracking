import BUDGET_CONSTANT from "./type";
// import { makeGetRequest } from "./api";

const budgetActionsSuccess = (actionType, payload) => ({
  type: BUDGET_CONSTANT[`${actionType}Success`],
  payload,
});

const budgetActionsRequested = (actionType) => ({
  type: BUDGET_CONSTANT[`${actionType}Requested`],
});

const budgetActionsError = (actionType, error) => ({
  type: BUDGET_CONSTANT[`${actionType}Error`],
  error,
});

// clear error message
export const clearErrorMessage = () => (dispatch) => {
  const actionType = "clearErrorMessage";
  dispatch(budgetActionsSuccess(actionType));
};

// clear success message
export const clearSuccessMessage = () => (dispatch) => {
  const actionType = "clearSuccessMessage";
  dispatch(budgetActionsSuccess(actionType));
};

export const openLogoutModal = () => (dispatch) => {
  const actionType = "logout";
  dispatch(budgetActionsSuccess(actionType));
};

export const dismissLogoutModal = () => (dispatch) => {
  const actionType = "closeLogout";
  dispatch(budgetActionsSuccess(actionType));
};

export const handleErrorRequest = (payload) => (dispatch) => {
  const actionType = "set";
  dispatch(budgetActionsError(actionType, payload));
};

// export const fetchCountries = (history) => {
//   const actionType = "getCountries";
//   return async (dispatch) => {
//     try {
//       dispatch(budgetActionsRequested(actionType, true));
//       const res = await makeGetRequest(`/api/getCountry`);
//       if (res.status !== 200) {
//         return dispatch(budgetActionsError(actionType, res.data));
//       } else {
//         console.log(res);
//         dispatch(budgetActionsSuccess(actionType, res.data));
//       }
//     } catch (error) {
//       console.log(error);
//       if (error.response) {
//         if (error.response.status === 401) {
//           history.push(`/`);
//           sessionStorage.removeItem("Intro_LETTER_Portal_Token");
//         } else {
//           return dispatch(
//             budgetActionsError(actionType, error.response.data.msg)
//           );
//         }
//       } else if (error.request) {
//         // console.log(error.request)
//         return dispatch(budgetActionsError(actionType, "Network error"));
//       } else {
//         // Something happened in setting up the request and triggered an error
//         console.log("axios", error.message);
//         dispatch(budgetActionsError(actionType, "Network error"));
//       }
//     }
//   };
// }
