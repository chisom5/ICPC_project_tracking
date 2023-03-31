import React, { useState, useEffect } from "react";
import {
  MainContent,
  MiniHeaderStyle,
  Content,
  Main,
} from "../../../styles/layout";
import TableComponent from "./components/Table";
import Sidebar from "../../../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ErrorComponent } from "../../../components/ErrorBoundry/errorComponent";
import {
  BudgetUpload,
  AdminBudgetUpload,
  BudgetAnomalies,
  BudgetProjectName,
  AnalysisViews,
} from "./components/views";
import {
  fetchProjectTrackingId,
  clearGlobalErrorMessage,
  clearGlobalSuccessMessage,
} from "../../../services/global/action";
import { OtherProjectsModal } from "./components/modal";
import { LogoutModal } from "../../../components/Modal";
import {
  setCurrentView,
  clearErrorMessage,
  clearSuccessMessage,
  fetchProjectsByTrackingId,
  handleUploadBudgetProjects,
  fetchAvailableBudget,
  handleErrorRequest,
  handleFilterAnomalyRecord,
  setSelectedBudgetType,
} from "../../../services/budgetPage/action";

import {
  fetchAllProjectTrackingInstance,
  fetchBudgetTypes,
} from "../../../services/metaData/action";

const BudgetuploadPage = () => {
  const [menu, setMenu] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const {
    trackingId,
    storedTrackingYear,
    globalError,
    globalSuccess,
    authUser,
  } = useSelector((state) => state.global);

  const {
    budgetTrackingList,
    adminBudgetTrackingList,
    projectTrackingList,
    error,
    success,
    SelectedAnomalData,
    currentView,
    selectedValFilter,
  } = useSelector((state) => state.budget);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (authUser !== null) {
      // check the user role
      if (
        authUser !== null &&
        authUser.roleName !== undefined &&
        authUser.roleName.toLowerCase() !== "admin"
      ) {
        setMenu([
          {
            id: 0,
            icon_default:
              require("../../../assets/images/nav/budget-inactive.svg").default,
            icon_active: require("../../../assets/images/nav/budget-active.svg")
              .default,
            icon_completed:
              require("../../../assets/images/nav/budget-completed.svg")
                .default,
            path: "/d/budget",
            name: "Budget Upload",
          },
          {
            id: 1,
            icon_default:
              require("../../../assets/images/nav/projectSelection-inactive.svg")
                .default,
            icon_active:
              require("../../../assets/images/nav/projectSelection-active.svg")
                .default,
            icon_completed:
              require("../../../assets/images/nav/projectSelection-completed.svg")
                .default,

            path: "/d/project-selection",
            name: "Project Selection",
          },

          {
            id: 2,
            icon_default:
              require("../../../assets/images/nav/contracts-inactive.svg")
                .default,
            icon_active:
              require("../../../assets/images/nav/contracts-active.svg")
                .default,
            icon_completed:
              require("../../../assets/images/nav/contracts-completed.svg")
                .default,

            path: "/d/contracts",
            name: "Project Details Upload",
          },
          {
            id: 3,
            icon_default:
              require("../../../assets/images/nav/projects-inactive.svg")
                .default,
            icon_active:
              require("../../../assets/images/nav/projects-active.svg").default,
            icon_completed:
              require("../../../assets/images/nav/projects-completed.svg")
                .default,

            path: "/d/projects",
            name: "Projects",
          },
        ]);
      } else {
        setMenu([
          {
            id: 0,
            icon_default:
              require("../../../assets/images/nav/budget-inactive.svg").default,
            icon_active: require("../../../assets/images/nav/budget-active.svg")
              .default,
            icon_completed:
              require("../../../assets/images/nav/budget-completed.svg")
                .default,
            path: "/d/budget",
            name: "Budget Upload",
          },
          // {
          //   id: 1,
          //   icon_default:
          //     require("../../../assets/images/nav/projectSelection-inactive.svg")
          //       .default,
          //   icon_active:
          //     require("../../../assets/images/nav/projectSelection-active.svg")
          //       .default,
          //   icon_completed:
          //     require("../../../assets/images/nav/projectSelection-completed.svg")
          //       .default,

          //   path: "/d/project-selection",
          //   name: "Project Selection",
          // },

          // {
          //   id: 2,
          //   icon_default:
          //     require("../../../assets/images/nav/contracts-inactive.svg")
          //       .default,
          //   icon_active:
          //     require("../../../assets/images/nav/contracts-active.svg")
          //       .default,
          //   icon_completed:
          //     require("../../../assets/images/nav/contracts-completed.svg")
          //       .default,

          //   path: "/d/contracts",
          //   name: "Project Details Upload",
          // },
          // {
          //   id: 3,
          //   icon_default:
          //     require("../../../assets/images/nav/projects-inactive.svg")
          //       .default,
          //   icon_active:
          //     require("../../../assets/images/nav/projects-active.svg").default,
          //   icon_completed:
          //     require("../../../assets/images/nav/projects-completed.svg")
          //       .default,

          //   path: "/d/projects",
          //   name: "Projects",
          // },
          {
            id: 4,
            icon_default:
              require("../../../assets/images/nav/userManagement-inactive.svg")
                .default,
            icon_active:
              require("../../../assets/images/nav/userManagement-active.svg")
                .default,
            icon_completed:
              require("../../../assets/images/nav/projects-completed.svg")
                .default,

            path: "/d/users",
            name: "User Management",
          },
        ]);
      }
    }
  }, [authUser]);

  useEffect(() => {
    if (
      currentView === "budget" &&
      authUser !== null &&
      authUser.roleName === "CEPTG"
    ) {
      Promise.all([
        dispatch(fetchAllProjectTrackingInstance(navigate)),
        dispatch(fetchBudgetTypes(navigate)),
      ]);

      if (trackingId !== null) {
        let splittedVal = storedTrackingYear?.split(" ");

        dispatch(
          fetchAvailableBudget({ selectedYear: +splittedVal[0] }, navigate)
        );
      }
    }
    // selectedBudgetType
    dispatch(setSelectedBudgetType({ selectedBudgetType: "" }));
  }, []);

  useEffect(() => {
    if (error !== null || success !== null) {
      setTimeout(() => dispatch(clearSuccessMessage()), 5000);
      setTimeout(() => dispatch(clearErrorMessage()), 5000);
    }
    if (globalError !== null || globalSuccess !== null) {
      setTimeout(() => dispatch(clearGlobalSuccessMessage()), 5000);
      setTimeout(() => dispatch(clearGlobalErrorMessage()), 5000);
    }
  }, [dispatch, success, error, globalError, globalSuccess]);

  const handlePagination = (pagination, filters, sorter) => {
    if (Object.keys(sorter).length !== 0) {
      // for sorting.
    } else if (Object.keys(filters).length !== 0) {
    } else {
      setCurrentPage(pagination.current);
      if (currentView === "anomalies") {
        dispatch(
          fetchProjectsByTrackingId(
            { Id: trackingId, CurrentPage: pagination.current, PageSize: 10 },
            navigate
          )
        ).then(() => {
          dispatch(handleFilterAnomalyRecord(selectedValFilter));
        });
      }
    }
  };

  const handleUploadBudget = () => {
    // if (projectTrackingList !== null && projectTrackingList.length !== 0) {
    dispatch(
      handleUploadBudgetProjects({ projectTrackingId: trackingId }, navigate)
    ).then(() => {
      const params = {
        id: trackingId,
      };
      dispatch(fetchProjectTrackingId(params, navigate));
    });
    // } else {
    //   dispatch(handleErrorRequest("There are  no Project on these budgets"));
    // }
  };

  const handleBack = () => {
    if (currentView === "anomalies")
      dispatch(setCurrentView({ currentView: "budget" }));
    else if (currentView === "projectTitle")
      dispatch(setCurrentView({ currentView: "anomalies" }));
    else if (currentView === "analysis")
      dispatch(setCurrentView({ currentView: "budget" }));
  };

  const handleClearErrorMessage = () => {
    if (error !== null) {
      dispatch(clearErrorMessage());
    } else if (globalError !== null) {
      dispatch(clearGlobalErrorMessage());
    }
  };
  const handleClearSuccessMessage = () => {
    if (success !== null) {
      dispatch(clearSuccessMessage());
    } else if (globalSuccess !== null) {
      dispatch(clearGlobalSuccessMessage());
    }
  };

  return (
    <ErrorComponent
      error={error || globalError}
      success={success || globalSuccess}
      clearErrorMessage={handleClearErrorMessage}
      clearSuccessMessage={handleClearSuccessMessage}
    >
      <Main>
        <Sidebar menu={menu} setMenu={setMenu} />
        <MainContent>
          <MiniHeaderStyle>
            {currentView === "budget" ? (
              <p className="title">Budget / Project File Upload</p>
            ) : currentView === "anomalies" ? (
              <p className="title">Budget Preview</p>
            ) : currentView === "projectTitle" ? (
              <div className="title">
                <span>Budget Anomaly Description</span>{" "}
              </div>
            ) : currentView === "analysis" ? (
              <p className="title">Budget Analysis</p>
            ) : null}
          </MiniHeaderStyle>
          <Content>
            {currentView === "budget" && authUser?.roleName !== "ADMIN" && (
              <BudgetUpload
                component={
                  <TableComponent
                    currentPage={currentPage}
                    data={budgetTrackingList}
                    handlePagination={handlePagination}
                  />
                }
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            )}

            {currentView === "budget" && authUser?.roleName === "ADMIN" && (
              <AdminBudgetUpload
                component={
                  <TableComponent
                    currentPage={currentPage}
                    data={adminBudgetTrackingList}
                    handlePagination={handlePagination}
                  />
                }
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />

              // <BudgetUpload
              //   component={
              //     <TableComponent
              //       currentPage={currentPage}
              //       data={budgetTrackingList}
              //       handlePagination={handlePagination}
              //     />
              //   }
              //   currentPage={currentPage}
              //   setCurrentPage={setCurrentPage}
              // />
            )}
            {currentView === "anomalies" && (
              <BudgetAnomalies
                component={
                  <TableComponent
                    currentPage={currentPage}
                    data={projectTrackingList}
                    handlePagination={handlePagination}
                    handleBack={handleBack}
                    handleUploadBudget={handleUploadBudget}
                  />
                }
              />
            )}
            {currentView === "projectTitle" && (
              <BudgetProjectName
                component={
                  <TableComponent
                    currentPage={currentPage}
                    data={SelectedAnomalData}
                    handlePagination={handlePagination}
                    handleBack={handleBack}
                  />
                }
              />
            )}

            {currentView === "analysis" && (
              <AnalysisViews handleBack={handleBack} handlePagination={handlePagination}/>
            )}
          </Content>
          <LogoutModal />
          <OtherProjectsModal />
        </MainContent>
      </Main>
    </ErrorComponent>
  );
};

export default BudgetuploadPage;
