import BUDGET_CONSTANT from "./type";
import {
  makeGetRequest,
  makePostRequest,
  makeDeleteRequest,
  makeFormDataPostRequest,
} from "./api";

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
export const clearErrorMessage = () => async (dispatch) => {
  const actionType = "clearErrorMessage";
  await dispatch(budgetActionsSuccess(actionType));
};

// clear success message
export const clearSuccessMessage = () => async (dispatch) => {
  const actionType = "clearSuccessMessage";
  await dispatch(budgetActionsSuccess(actionType));
};

export const openLogoutModal = () => async (dispatch) => {
  const actionType = "logout";
  await dispatch(budgetActionsSuccess(actionType));
};

export const dismissLogoutModal = () => async (dispatch) => {
  const actionType = "closeLogout";
  await dispatch(budgetActionsSuccess(actionType));
};

export const setCurrentView = (payload) => async (dispatch) => {
  const actionType = "currentView";
  await dispatch(budgetActionsSuccess(actionType, payload));
};

export const setSelectedBudgetType = (payload) => async (dispatch) => {
  const actionType = "selectBudgetType";
  await dispatch(budgetActionsSuccess(actionType, payload));
};

export const handleErrorRequest = (payload) => async (dispatch) => {
  const actionType = "set";
  await dispatch(budgetActionsError(actionType, payload));
};

export const handleRequestSuccess = (payload) => async (dispatch) => {
  const actionType = "set";
  await dispatch(budgetActionsSuccess(actionType, payload));
};

export const handleFilterAnomalyRecord = (payload) => async (dispatch) => {
  const actionType = "filterAnomaly";
  await dispatch(budgetActionsSuccess(actionType, payload));
};

export const setAddedBudgetTrackingList = (payload) => async (dispatch) => {
  const actionType = "budgetTrackingList";
  await dispatch(budgetActionsSuccess(actionType, payload));
};

export const openModal = (payload) => async (dispatch) => {
  const actionType = "modal";
  await dispatch(budgetActionsSuccess(actionType, payload));
};

export const handleAddBudget = (params, navigate) => {
  const actionType = "addBudget";
  return async (dispatch) => {
    try {
      dispatch(budgetActionsRequested(actionType, true));
      const res = await makePostRequest(
        `/trackings/startProjectTracking`,
        params
      );
      if (res.status !== 200 && res.status !== 201) {
        dispatch(budgetActionsError(actionType, res.data));
      } else {
        console.log(res, "hhhhe");
        dispatch(budgetActionsSuccess(actionType, res.data));
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          navigate(`/`);
          sessionStorage.removeItem("IWPW_3ing_Token");
        } else {
          return dispatch(
            budgetActionsError(actionType, error.response.data.message)
          );
        }
      } else if (error.request) {
        console.log(error.request);
        return dispatch(budgetActionsError(actionType, "Network error"));
      } else {
        // Something happened in setting up the request and triggered an error
        console.log("axios", error.message);
        // dispatch(budgetActionsError(actionType, "Network error"));
      }
    }
  };
};

export const handleAddBudgetWithoutTrackingCycle = (params, navigate) => {
  const actionType = "addBudgetForAdmin";
  return async (dispatch) => {
    try {
      dispatch(budgetActionsRequested(actionType, true));
      const res = await makePostRequest(
        `/budgets/AddBudgetWithoutTrackingCycle`,
        params
      );
      if (res.status !== 200 && res.status !== 201) {
        dispatch(budgetActionsError(actionType, res.data));
      } else {
        console.log(res, "hhhhe");
        dispatch(budgetActionsSuccess(actionType, res.data));
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          navigate(`/`);
          sessionStorage.removeItem("IWPW_3ing_Token");
        } else {
          return dispatch(
            budgetActionsError(actionType, error.response.data.message)
          );
        }
      } else if (error.request) {
        console.log(error.request);
        return dispatch(budgetActionsError(actionType, "Network error"));
      } else {
        // Something happened in setting up the request and triggered an error
        console.log("axios", error.message);
        // dispatch(budgetActionsError(actionType, "Network error"));
      }
    }
  };
};

export const handleAddTrackingCycleData = (params, navigate) => {
  const actionType = "addTrackingCycle";
  return async (dispatch) => {
    try {
      dispatch(budgetActionsRequested(actionType, true));
      const res = await makePostRequest(
        `/trackings/AddTrackingCycleData`,
        params
      );
      if (res.status !== 200 && res.status !== 201) {
        dispatch(budgetActionsError(actionType, res.data));
      } else {
        dispatch(budgetActionsSuccess(actionType, res.data.data));
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          navigate(`/`);
          sessionStorage.removeItem("IWPW_3ing_Token");
        } else {
          return dispatch(
            budgetActionsError(actionType, error.response.data.message)
          );
        }
      } else if (error.request) {
        console.log(error.request);
        return dispatch(budgetActionsError(actionType, "Network error"));
      } else {
        // Something happened in setting up the request and triggered an error
        console.log("axios", error.message);
        // dispatch(budgetActionsError(actionType, "Network error"));
      }
    }
  };
};

export const handleAddTrackingCycleForOtherProject = (params, navigate) => {
  const actionType = "addTrackingCycleForOtherProject";
  return async (dispatch) => {
    try {
      dispatch(budgetActionsRequested(actionType, true));
      const res = await makePostRequest(
        `/trackings/UploadPetitionsOrOtherBudget`,
        params
      );
      if (res.status !== 200 && res.status !== 201) {
        dispatch(budgetActionsError(actionType, res.data));
      } else {
        dispatch(budgetActionsSuccess(actionType, res.data));
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          navigate(`/`);
          sessionStorage.removeItem("IWPW_3ing_Token");
        } else {
          return dispatch(
            budgetActionsError(actionType, error.response.data.message)
          );
        }
      } else if (error.request) {
        console.log(error.request);
        return dispatch(budgetActionsError(actionType, "Network error"));
      } else {
        // Something happened in setting up the request and triggered an error
        console.log("axios", error.message);
        // dispatch(budgetActionsError(actionType, "Network error"));
      }
    }
  };
};

export const handleStartProjectTracking = (params, navigate) => {
  const actionType = "addBudget";
  return async (dispatch) => {
    try {
      dispatch(budgetActionsRequested(actionType, true));
      const res = await makePostRequest(
        `/trackings/startProjectTracking`,
        params
      );
      if (res.status !== 200 && res.status !== 201) {
        dispatch(budgetActionsError(actionType, res.data));
      } else {
        console.log(res, "hhhhe");
        dispatch(budgetActionsSuccess(actionType, res.data));
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          navigate(`/`);
          sessionStorage.removeItem("IWPW_3ing_Token");
        } else {
          return dispatch(
            budgetActionsError(actionType, error.response.data.message)
          );
        }
      } else if (error.request) {
        console.log(error.request);
        return dispatch(budgetActionsError(actionType, "Network error"));
      } else {
        // Something happened in setting up the request and triggered an error
        console.log("axios", error.message);
        // dispatch(budgetActionsError(actionType, "Network error"));
      }
    }
  };
};

export const fetchadminBudgetByTrackingId = (params, navigate) => {
  const actionType = "budgetAdminTrckingId";
  return async (dispatch) => {
    try {
      dispatch(budgetActionsRequested(actionType, true));
      const res = await makeGetRequest(
        `/budgets/getBudgetsByTrackingId`,
        params
      );
      if (res.status !== 200) {
        return dispatch(budgetActionsError(actionType, res.data));
      } else {
        console.log(res);
        dispatch(budgetActionsSuccess(actionType, res.data.data));
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          navigate(`/`);
          sessionStorage.removeItem("IWPW_3ing_Token");
        } else {
          return dispatch(
            budgetActionsError(actionType, error.response.data.message)
          );
        }
      } else if (error.request) {
        // console.log(error.request)
        return dispatch(budgetActionsError(actionType, "Network error"));
      } else {
        // Something happened in setting up the request and triggered an error
        console.log("axios", error.message);
        // dispatch(budgetActionsError(actionType, "Network error"));
      }
    }
  };
};

export const fetchBudgetByTrackingId = (params, navigate) => {
  const actionType = "budgetTrckingId";
  return async (dispatch) => {
    try {
      dispatch(budgetActionsRequested(actionType, true));
      const res = await makeGetRequest(
        `/trackings/GetTrackingCycleData`,

        params
      );
      if (res.status !== 200) {
        return dispatch(budgetActionsError(actionType, res.data));
      } else {
        console.log(res);
        dispatch(budgetActionsSuccess(actionType, res.data.data));
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          navigate(`/`);
          sessionStorage.removeItem("IWPW_3ing_Token");
        } else {
          return dispatch(
            budgetActionsError(actionType, error.response.data.message)
          );
        }
      } else if (error.request) {
        // console.log(error.request)
        return dispatch(budgetActionsError(actionType, "Network error"));
      } else {
        // Something happened in setting up the request and triggered an error
        console.log("axios", error.message);
        // dispatch(budgetActionsError(actionType, "Network error"));
      }
    }
  };
};

export const handleDeleteBudget = (params, navigate) => {
  const actionType = "deleteBudget";
  return async (dispatch) => {
    try {
      dispatch(budgetActionsRequested(actionType, true));
      const res = await makeGetRequest(
        `/trackings/DeleteTrackingCycleData`,
        params
      );
      if (res.status !== 200) {
        dispatch(budgetActionsError(actionType, res.data));
      } else {
        console.log(res);
        dispatch(budgetActionsSuccess(actionType, params));
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          navigate(`/`);
          sessionStorage.removeItem("IWPW_3ing_Token");
        } else {
          return dispatch(
            budgetActionsError(actionType, error.response.data.message)
          );
        }
      } else if (error.request) {
        // console.log(error.request)
        return dispatch(budgetActionsError(actionType, "Network error"));
      } else {
        // Something happened in setting up the request and triggered an error
        console.log("axios", error.message);
        // dispatch(budgetActionsError(actionType, "Network error"));
      }
    }
  };
};

// export const handleDeleteBudgetOtherProject = (params, navigate) => {
//   const actionType = "deleteBudgetForOtherProject";
//   return async (dispatch) => {
//     try {
//       dispatch(budgetActionsRequested(actionType, true));
//       const res = await makeGetRequest(
//         `/trackings/DeletePetitionsOrOtherBudget`,
//         params
//       );
//       if (res.status !== 200) {
//         dispatch(budgetActionsError(actionType, res.data));
//       } else {
//         console.log(res);
//         dispatch(budgetActionsSuccess(actionType, params));
//       }
//     } catch (error) {
//       if (error.response) {
//         if (error.response.status === 401) {
//           navigate(`/`);
//           sessionStorage.removeItem("IWPW_3ing_Token");
//         } else {
//           return dispatch(
//             budgetActionsError(actionType, error.response.data.message)
//           );
//         }
//       } else if (error.request) {
//         // console.log(error.request)
//         return dispatch(budgetActionsError(actionType, "Network error"));
//       } else {
//         // Something happened in setting up the request and triggered an error
//         console.log("axios", error.message);
//         // dispatch(budgetActionsError(actionType, "Network error"));
//       }
//     }
//   };
// };

export const handleDeleteAdminBudget = (params, navigate) => {
  const actionType = "deleteAdminBudget";
  return async (dispatch) => {
    try {
      dispatch(budgetActionsRequested(actionType, true));
      const res = await makeGetRequest(`/budgets/delete`, params);
      if (res.status !== 200) {
        dispatch(budgetActionsError(actionType, res.data));
      } else {
        console.log(res);
        dispatch(budgetActionsSuccess(actionType, params));
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          navigate(`/`);
          sessionStorage.removeItem("IWPW_3ing_Token");
        } else {
          return dispatch(
            budgetActionsError(actionType, error.response.data.message)
          );
        }
      } else if (error.request) {
        // console.log(error.request)
        return dispatch(budgetActionsError(actionType, "Network error"));
      } else {
        // Something happened in setting up the request and triggered an error
        console.log("axios", error.message);
        // dispatch(budgetActionsError(actionType, "Network error"));
      }
    }
  };
};

export const fetchAvailableBudget = (params, navigate) => {
  const actionType = "getAvailableBudget";

  return async (dispatch) => {
    try {
      dispatch(budgetActionsRequested(actionType));
      const res = await makeGetRequest(
        `/budgets/getAvailableBudgetYear`,
        params
      );

      if (res.status !== 200) {
        dispatch(budgetActionsError(actionType, res.data.msg));
      } else {
        dispatch(budgetActionsSuccess(actionType, res.data.data));
      }
    } catch (error) {
      if (error.response) {
        console.log(error, error.response);
        if (error.response.status === 401) {
          navigate(`/`);
          sessionStorage.removeItem("IWPW_3ing_Token");
        } else {
          return dispatch(
            budgetActionsError(actionType, error.response.data.msg)
          );
        }
      } else if (error.request) {
        console.log(error.request);

        return dispatch(budgetActionsError(actionType, "Network error"));
      } else {
        // Something happened in setting up the request and triggered an error
        console.log("axios", error.message);
      }
    }
  };
};

export const fetchProjectsByTrackingId = (params, navigate) => {
  const actionType = "getProjectsByTrackingId";
  return async (dispatch) => {
    try {
      dispatch(budgetActionsRequested(actionType, true));
      const res = await makeGetRequest(
        `/projects/getProjectsByTrackingIdPaginated`,
        params
      );
      if (res.status !== 200) {
        dispatch(budgetActionsError(actionType, res.data));
      } else {
        console.log(res);
        dispatch(budgetActionsSuccess(actionType, res.data.data));
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          navigate(`/`);
          sessionStorage.removeItem("IWPW_3ing_Token");
        } else {
          return dispatch(
            budgetActionsError(actionType, error.response.data.message)
          );
        }
      } else if (error.request) {
        // console.log(error.request)
        return dispatch(budgetActionsError(actionType, "Network error"));
      } else {
        // Something happened in setting up the request and triggered an error
        console.log("axios", error.message);
        // dispatch(budgetActionsError(actionType, "Network error"));
      }
    }
  };
};

export const handleUploadBudgetProjects = (params, navigate) => {
  const actionType = "uploadBudgetProjects";
  return async (dispatch) => {
    try {
      dispatch(budgetActionsRequested(actionType, true));
      const res = await makePostRequest(
        `/budgets/uploadBudgetProjects`,
        params
      );
      console.log(res);

      if (res.status !== 200 && res.status !== 201) {
        dispatch(budgetActionsError(actionType, res.data));
      } else {
        console.log(res);
        dispatch(budgetActionsSuccess(actionType, res.data));
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          navigate(`/`);
          sessionStorage.removeItem("IWPW_3ing_Token");
        } else {
          return dispatch(
            budgetActionsError(actionType, error.response.data.message)
          );
        }
      } else if (error.request) {
        // console.log(error.request)
        return dispatch(budgetActionsError(actionType, "Network error"));
      } else {
        // Something happened in setting up the request and triggered an error
        console.log("axios", error.message);
        // dispatch(budgetActionsError(actionType, "Network error"));
      }
    }
  };
};

export const fetchAnomalyReviewByProjectId = (params, navigate) => {
  const actionType = "getAnomalyReviewByProjectId";
  return async (dispatch) => {
    try {
      dispatch(budgetActionsRequested(actionType, true));
      const res = await makeGetRequest(
        `/anomalies/getAnomaliesByProjectId`,
        params
      );
      if (res.status !== 200) {
        return dispatch(budgetActionsError(actionType, res.data));
      } else {
        console.log(res);
        dispatch(budgetActionsSuccess(actionType, res.data.data));
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          navigate(`/`);
          sessionStorage.removeItem("IWPW_3ing_Token");
        } else {
          return dispatch(
            budgetActionsError(actionType, error.response.data.message)
          );
        }
      } else if (error.request) {
        // console.log(error.request)
        return dispatch(budgetActionsError(actionType, "Network error"));
      } else {
        // Something happened in setting up the request and triggered an error
        console.log("axios", error.message);
        // dispatch(budgetActionsError(actionType, "Network error"));
      }
    }
  };
};

export const handleIgnoreAllAnomalies = (params, navigate) => {
  const actionType = "ignoreAllAnomalies";
  return async (dispatch) => {
    try {
      dispatch(budgetActionsRequested(actionType, true));
      const res = await makeGetRequest(
        `/anomalies/ignoreAllProjectAnomalies?projectId=${params.projectId}`,
        params
      );
      if (res.status !== 200) {
        return dispatch(budgetActionsError(actionType, res.data));
      } else {
        console.log(res);
        dispatch(budgetActionsSuccess(actionType, params));
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          navigate(`/`);
          sessionStorage.removeItem("IWPW_3ing_Token");
        } else {
          return dispatch(
            budgetActionsError(actionType, error.response.data.message)
          );
        }
      } else if (error.request) {
        // console.log(error.request)
        return dispatch(budgetActionsError(actionType, "Network error"));
      } else {
        // Something happened in setting up the request and triggered an error
        console.log("axios", error.message);
        // dispatch(budgetActionsError(actionType, "Network error"));
      }
    }
  };
};

export const handleIgnoreOneAnomaly = (params, navigate) => {
  const actionType = "ignoreOneAnomaly";
  return async (dispatch) => {
    try {
      dispatch(budgetActionsRequested(actionType, true));
      const res = await makeGetRequest(
        `/anomalies/ignoreSpecificAnomaly?anomalyId=${params.anomalyId}`,
        params
      );
      if (res.status !== 200) {
        return dispatch(budgetActionsError(actionType, res.data));
      } else {
        console.log(res);
        dispatch(budgetActionsSuccess(actionType, res.data.data));
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          navigate(`/`);
          sessionStorage.removeItem("IWPW_3ing_Token");
        } else {
          return dispatch(
            budgetActionsError(actionType, error.response.data.message)
          );
        }
      } else if (error.request) {
        // console.log(error.request)
        return dispatch(budgetActionsError(actionType, "Network error"));
      } else {
        // Something happened in setting up the request and triggered an error
        console.log("axios", error.message);
        // dispatch(budgetActionsError(actionType, "Network error"));
      }
    }
  };
};

// view analysis

export const getBudgetStatistics = (params, navigate) => {
  const actionType = "fetchBudgetStat";
  return async (dispatch) => {
    try {
      dispatch(budgetActionsRequested(actionType, true));
      const res = await makeGetRequest(
        `/reporting/getAnomalyAnalyticsForProjectTracking`,
        params
      );
      if (res.status !== 200) {
        return dispatch(budgetActionsError(actionType, res.data));
      } else {
        console.log(res);
        dispatch(budgetActionsSuccess(actionType, res.data.data));
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          navigate(`/`);
          sessionStorage.removeItem("IWPW_3ing_Token");
        } else {
          return dispatch(
            budgetActionsError(actionType, error.response.data.message)
          );
        }
      } else if (error.request) {
        // console.log(error.request)
        return dispatch(budgetActionsError(actionType, "Network error"));
      } else {
        // Something happened in setting up the request and triggered an error
        console.log("axios", error.message);
        // dispatch(budgetActionsError(actionType, "Network error"));
      }
    }
  };
};

export const getAnomaliesData = (params, navigate) => {
  const actionType = "fetchAnomaliesData";
  return async (dispatch) => {
    try {
      dispatch(budgetActionsRequested(actionType, true));
      const res = await makeGetRequest(
        `/anomalies/getAnomaliesByTrackingId`,
        params
      );
      if (res.status !== 200) {
        return dispatch(budgetActionsError(actionType, res.data));
      } else {
        console.log(res);
        dispatch(budgetActionsSuccess(actionType, res.data.data));
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          navigate(`/`);
          sessionStorage.removeItem("IWPW_3ing_Token");
        } else {
          return dispatch(
            budgetActionsError(actionType, error.response.data.message)
          );
        }
      } else if (error.request) {
        // console.log(error.request)
        return dispatch(budgetActionsError(actionType, "Network error"));
      } else {
        // Something happened in setting up the request and triggered an error
        console.log("axios", error.message);
        // dispatch(budgetActionsError(actionType, "Network error"));
      }
    }
  };
};

export const getDuplicateData = (params, navigate) => {
  const actionType = "fetchDuplicateData";
  return async (dispatch) => {
    try {
      dispatch(budgetActionsRequested(actionType, true));
      const res = await makeGetRequest(
        `/anomalies/getDuplicatedProjectsByTrackingID`,
        params
      );
      if (res.status !== 200) {
        return dispatch(budgetActionsError(actionType, res.data));
      } else {
        console.log(res);
        dispatch(budgetActionsSuccess(actionType, res.data.data));
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          navigate(`/`);
          sessionStorage.removeItem("IWPW_3ing_Token");
        } else {
          return dispatch(
            budgetActionsError(actionType, error.response.data.message)
          );
        }
      } else if (error.request) {
        // console.log(error.request)
        return dispatch(budgetActionsError(actionType, "Network error"));
      } else {
        // Something happened in setting up the request and triggered an error
        console.log("axios", error.message);
        // dispatch(budgetActionsError(actionType, "Network error"));
      }
    }
  };
};
