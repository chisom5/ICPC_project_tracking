const BUDGET_CONSTANT = Object.freeze({
  setError: "set Error Request",
  setSuccess: "set Success Request",
  modalSuccess: "OPEN MODAL SUCCESS",

  currentViewSuccess: "SET CURRENT VIEW SUCCESS",
  budgetTrackingListSuccess: "SET BUDGET TRACKING LIST SUCCESS",
  selectBudgetTypeSuccess: "SET BUDGET TYPE SUCCESS",
  filterAnomalySuccess: "FILTER ANOMALY RECORD SUCCESS",

  getAvailableBudgetRequested: "FETCH AVAILABLE BUDGET TYPES Requested",
  getAvailableBudgetSuccess: "FETCH AVAILABLE BUDGET TYPES Success",
  getAvailableBudgetError: "FETCH AVAILABLE BUDGET TYPES Error",

  addBudgetRequested: "ADD BUDGET Requested",
  addBudgetSuccess: "ADD BUDGET Success",
  addBudgetError: "ADD BUDGET Error",

  addBudgetForAdminRequested: "ADD ADMIN BUDGET Requested",
  addBudgetForAdminSuccess: "ADD ADMIN BUDGET Success",
  addBudgetForAdminError: "ADD  ADMIN BUDGET Error",

  addTrackingCycleRequested: "ADD TRACKING CYCLE Requested",
  addTrackingCycleSuccess: "ADD TRACKING CYCLE Success",
  addTrackingCycleError: "ADD TRACKING CYCLE Error",

  addTrackingCycleForOtherProjectRequested:
    "UPLOAD TRACKING CYCLE FOR OTHER PROJECT Requested",
  addTrackingCycleForOtherProjectSuccess:
    "UPLOAD TRACKING CYCLE FOR OTHER PROJECT Success",
  addTrackingCycleForOtherProjectError:
    "UPLOAD TRACKING CYCLE FOR OTHER PROJECT Error",

  deleteBudgetRequested: "DELETE BUDGET Requested",
  deleteBudgetSuccess: "DELETE BUDGET Success",
  deleteBudgetError: "DELETE BUDGET Error",

  deleteAdminBudgetRequested: "DELETE ADMIN BUDGET Requested",
  deleteAdminBudgetSuccess: "DELETE ADMIN BUDGET Success",
  deleteAdminBudgetError: "DELETE ADMIN BUDGET Error",

  // deleteBudgetForOtherProjectRequested: "DELETE BUDGET FOR OTHER PROJECT Requested",
  // deleteBudgetForOtherProjectSuccess: "DELETE BUDGET  FOR OTHER PROJECTSuccess",
  // deleteBudgetForOtherProjectError: "DELETE BUDGET  FOR OTHER PROJECT Error",

  budgetAdminTrckingIdRequested:
    "FETCH ADMIN BUDGET PER TRACKING CYCLE LIST Requested",
  budgetAdminTrckingIdSuccess: "FETCH ADMIN BUDGET PER TRACKING CYCLE Success",
  budgetAdminTrckingIdError: "FETCH ADMIN BUDGET PER TRACKING CYCLE Error",

  budgetTrckingIdRequested: "FETCH BUDGET PER TRACKING CYCLE LIST Requested",
  budgetTrckingIdSuccess: "FETCH BUDGET PER TRACKING CYCLE Success",
  budgetTrckingIdError: "FETCH BUDGET PER TRACKING CYCLE Error",

  // budgetTrckingIdForOthersRequested:
  //   "FETCH BUDGET PER TRACKING CYCLE LIST  FOR OTHER PROJECT Requested",
  // budgetTrckingIdForOthersSuccess: "FETCH BUDGET PER TRACKING CYCLE  FOR OTHER PROJECT Success",
  // budgetTrckingIdForOthersError: "FETCH BUDGET PER TRACKING CYCLE  FOR OTHER PROJECT Error",

  getProjectsByTrackingIdRequested: "FETCH PROJECT BY TRACKING ID  Requested",
  getProjectsByTrackingIdSuccess: "FETCH PROJECT BY TRACKING ID Success",
  getProjectsByTrackingIdError: "FETCH PROJECT BY TRACKING ID Error",

  uploadBudgetProjectsRequested:
    "UPLOAD BUDGET PROJECT BY TRACKING ID  Requested",
  uploadBudgetProjectsSuccess: "UPLOAD BUDGET PROJECT BY TRACKING ID Success",
  uploadBudgetProjectsError: "UPLOAD BUDGET PROJECT BY TRACKING ID Error",

  getAnomalyReviewByProjectIdRequested:
    "GET ANOMALY REVIEW BY PROJECT ID Requested",
  getAnomalyReviewByProjectIdSuccess:
    "GET ANOMALY REVIEW BY PROJECT ID Success",
  getAnomalyReviewByProjectIdError: "GET ANOMALY REVIEW BY PROJECT ID Error",

  ignoreAllAnomaliesRequested: "IGNORE ALL ANOMALIES Requested",
  ignoreAllAnomaliesSuccess: "IGNORE ALL ANOMALIES Success",
  ignoreAllAnomaliesError: "IGNORE ALL ANOMALIES Error",

  ignoreOneAnomalyRequested: "IGNORE ONE ANOMALY  Requested",
  ignoreOneAnomalySuccess: "IGNORE ONE ANOMALY Success",
  ignoreOneAnomalyError: "IGNORE ONE ANOMALY Error",

  fetchBudgetStatRequested: "FETCH BUDGET STATS   Requested",
  fetchBudgetStatSuccess: "FETCH BUDGET STATS  Success",
  fetchBudgetStatError: "FETCH BUDGET STATS  Error",

  fetchAnomaliesDataRequested: "FETCH ANOMALIES DATA   Requested",
  fetchAnomaliesDataSuccess: "FETCH ANOMALIES DATA  Success",
  fetchAnomaliesDataError: "FETCH ANOMALIES DATA  Error",

  fetchDuplicateDataRequested: "FETCH DUPLICATE DATA   Requested",
  fetchDuplicateDataSuccess: "FETCH DUPLICATE DATA  Success",
  fetchDuplicateDataError: "FETCH DUPLICATE DATA  Error",

  clearErrorMessageSuccess: "CLEAR ERROR MESSAGE SUCCESS",
  clearSuccessMessageSuccess: "CLEAR SUCCESS MESSAGE SUCCESS",
});

export default BUDGET_CONSTANT;
