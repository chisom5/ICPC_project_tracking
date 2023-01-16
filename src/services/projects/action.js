import PROJECTS_CONSTANT from "./type";
// import { makeGetRequest } from "./api";

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
export const clearErrorMessage = () => (dispatch) => {
  const actionType = "clearErrorMessage";
  dispatch(projectsActionSuccess(actionType));
};

// clear success message
export const clearSuccessMessage = () => (dispatch) => {
  const actionType = "clearSuccessMessage";
  dispatch(projectsActionSuccess(actionType));
};

export const openLogoutModal = () => (dispatch) => {
  const actionType = "logout";
  dispatch(projectsActionSuccess(actionType));
};

export const dismissLogoutModal = () => (dispatch) => {
  const actionType = "closeLogout";
  dispatch(projectsActionSuccess(actionType));
};

export const handleErrorRequest = (payload) => (dispatch) => {
  const actionType = "set";
  dispatch(projectsActionError(actionType, payload));
};
export const setCurrentTab= (payload) => (dispatch) => {
  const actionType = "currentTab";
  dispatch(projectsActionSuccess(actionType, payload));
};
export const setAnomaliesType= (payload) => (dispatch) => {
  const actionType = "anomaliesType";
  dispatch(projectsActionSuccess(actionType, payload));
};
// export const fetchCountries = (history) => {
//   const actionType = "getCountries";
//   return async (dispatch) => {
//     try {
//       dispatch(projectsActionRequested(actionType, true));
//       const res = await makeGetRequest(`/api/getCountry`);
//       if (res.status !== 200) {
//         return dispatch(projectsActionError(actionType, res.data));
//       } else {
//         console.log(res);
//         dispatch(projectsActionSuccess(actionType, res.data));
//       }
//     } catch (error) {
//       console.log(error);
//       if (error.response) {
//         if (error.response.status === 401) {
//           history.push(`/`);
//           sessionStorage.removeItem("Intro_LETTER_Portal_Token");
//         } else {
//           return dispatch(
//             projectsActionError(actionType, error.response.data.msg)
//           );
//         }
//       } else if (error.request) {
//         // console.log(error.request)
//         return dispatch(projectsActionError(actionType, "Network error"));
//       } else {
//         // Something happened in setting up the request and triggered an error
//         console.log("axios", error.message);
//         dispatch(projectsActionError(actionType, "Network error"));
//       }
//     }
//   };
// }
