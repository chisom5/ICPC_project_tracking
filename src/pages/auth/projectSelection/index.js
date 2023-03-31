import React, { useEffect, useState } from "react";
import {
  MainContent,
  MiniHeaderStyle,
  Content,
  Main,
} from "../../../styles/layout";
import { Spin } from "antd";
import TableComponent from "./components/Table";
import Sidebar from "../../../components/Sidebar";
import { ButtonOutlined } from "../../../components/Button";
import { useSelector, useDispatch } from "react-redux";
import { ProjectSelectionView, OtherProjectsView } from "./components/views";
import { Img } from "../../../components/Primitives";
import { LogoutModal } from "../../../components/Modal";
import { useNavigate } from "react-router-dom";
import { ErrorComponent } from "../../../components/ErrorBoundry/errorComponent";
import colors from "../../../theme/colors";
import {
  fetchProjectSelectionByTrackingId,
  clearErrorMessage,
  setCurrentView,
  clearSuccessMessage,
  handleRequestErrorr,
  setDefaultSampleSelectedText,
  checkIfOtherProjectsIsIncluded,
  setProjectView,
} from "../../../services/projectSelection/action";
import axios from "axios";

import {
  // fetchProjectTrackingId,
  clearGlobalErrorMessage,
  clearGlobalSuccessMessage,
} from "../../../services/global/action";
import {
  ProjectSelectionCriteriaModal,
  SaveSampleSelectedModal,
} from "./components/modal";
import { accountingFormat } from "../../../utils";
import update from "immutability-helper";

const ProjectSelection = () => {
  const [menu, setMenu] = useState([
    // {
    //   id: 0,
    //   icon_default: require("../../../assets/images/nav/budget-inactive.svg")
    //     .default,
    //   icon_active: require("../../../assets/images/nav/budget-active.svg")
    //     .default,
    //   icon_completed: require("../../../assets/images/nav/budget-completed.svg")
    //     .default,
    //   path: "/d/budget",
    //   name: "Budget Upload",
    // },
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
    //   icon_default: require("../../../assets/images/nav/contracts-inactive.svg")
    //     .default,
    //   icon_active: require("../../../assets/images/nav/contracts-active.svg")
    //     .default,
    //   icon_completed:
    //     require("../../../assets/images/nav/contracts-completed.svg").default,
    //   path: "/d/contracts",
    //   name: "Project Details Upload",
    // },
    // {
    //   id: 3,
    //   icon_default: require("../../../assets/images/nav/projects-inactive.svg")
    //     .default,
    //   icon_active: require("../../../assets/images/nav/projects-active.svg")
    //     .default,
    //   icon_completed:
    //     require("../../../assets/images/nav/projects-completed.svg").default,
    //   path: "/d/projects",
    //   name: "Projects",
    // },
    // {
    //   id: 4,
    //   icon_default:
    //     require("../../../assets/images/nav/userManagement-inactive.svg")
    //       .default,
    //   icon_active:
    //     require("../../../assets/images/nav/userManagement-active.svg").default,
    //   icon_completed:
    //     require("../../../assets/images/nav/projects-completed.svg").default,
    //   path: "/d/users",
    //   name: "User Management",
    // },
  ]);

  const handleDownload = (url) => {
    const link = document.createElement("a");

    link.setAttribute("download", "OtherProjectData"); //or any other extension
    document.body.appendChild(url);
    link.click();
  };

  const [currentPage, setCurrentPage] = useState(1);
  // const [downloadingOther, setDownloadingOther] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { trackingId, authUser, trackingStatus, globalError, globalSuccess } =
    useSelector((state) => state.global);
  const {
    error,
    success,
    adjSelectionCriteria,
    projectView,
    projectSelectionList,
    projectPetitions,
  } = useSelector((state) => state.projectSelection);

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
    // check if I have upload else bring a pop up telling them to complete budget module.
    if (trackingStatus !== null && trackingStatus?.tracking?.Status !== 1) {
      dispatch(
        fetchProjectSelectionByTrackingId(
          { Id: trackingId, CurrentPage: currentPage, PageSize: 10 },
          navigate
        )
      );
      dispatch(
        checkIfOtherProjectsIsIncluded(
          { ProjectTrackingId: trackingId },
          navigate
        )
      );
    } else if (
      trackingStatus !== null &&
      trackingStatus?.tracking?.Status === 1
    ) {
      dispatch(handleRequestErrorr(`Budget Upload hasn't been completed.`));
    }
    if (trackingStatus !== null && trackingStatus?.tracking?.Status === 5) {
      dispatch(
        setDefaultSampleSelectedText({ sampleSelectedText: "Finalise" })
      );
    }
  }, []);

  useEffect(() => {
    if (adjSelectionCriteria !== null) {
      // refresh the page.
      dispatch(fetchProjectSelectionByTrackingId({ Id: trackingId }, navigate));
    }
  }, [adjSelectionCriteria]);

  const handlePagination = (pagination, filters, sorter) => {
    if (Object.keys(sorter).length !== 0) {
      // for sorting.
    } else if (Object.keys(filters).length !== 0) {
    } else {
      setCurrentPage(pagination.current);
      // call for the next page.
      dispatch(
        fetchProjectSelectionByTrackingId(
          { Id: trackingId, CurrentPage: pagination.current, PageSize: 10 },
          navigate
        )
      );
    }
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

  const handleOtherProjecBtn = () => {
    dispatch(setProjectView({ projectView: "otherProjects" }));
  };

  const handleBack = () => {
    dispatch(setProjectView({ projectView: "selection" }));
  };
  const handleOtherProjectDownload = (obj) => {
    if (obj.fileDownloadLink !== null) {
      const link = document.createElement("a");
      link.href = obj.fileDownloadLink;
      link.setAttribute("download", ""); //or any other extension
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  };

  const extractAmountFilter = () => {
    let res = [];

    projectSelectionList?.map((item) => {
      let a = res.findIndex((i) => i.value === item.Amount);

      if (a === -1) {
        // remove duplicate.
        res.push({
          text: accountingFormat(item.Amount),
          value: item.Amount,
        });
      }
    });

    return res;
  };

  const extractConstituencyFilter = () => {
    let res = [];

    projectSelectionList?.map((item) => {
      let a = res.findIndex((i) => i.value === item.ConstituencyName);

      if (a === -1) {
        // remove duplicate.
        res.push({
          text: item.ConstituencyName,
          value: item.ConstituencyName,
        });
      }
    });

    return res;
  };

  const extractAmountFilterForOtherProject = () => {
    let res = [];

    projectPetitions?.map((item) => {
      let a = res.findIndex((i) => i.value === item.Amount);

      if (a === -1) {
        // remove duplicate.
        res.push({
          text: accountingFormat(item.Amount),
          value: item.Amount,
        });
      }
    });

    return res;
  };
  const extractConstituencyFilterForOtherProject = () => {
    let res = [];

    projectSelectionList?.map((item) => {
      let a = res.findIndex((i) => i.value === item.ConstituencyName);

      if (a === -1) {
        // remove duplicate.
        res.push({
          text: item.ConstituencyName,
          value: item.ConstituencyName,
        });
      }
    });

    return res;
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
            {projectView === "otherProjects" ? (
              <p className="title">Other Projects</p>
            ) : (
              <p className="title">Project Selection</p>
            )}
          </MiniHeaderStyle>
          <Content style={{ marginBottom: "10vh" }}>
            {projectView === "otherProjects" && (
              <OtherProjectsView
                component={
                  <TableComponent
                    currentPage={currentPage}
                    handlePagination={handlePagination}
                    columns={[
                      {
                        title: "Project Title",
                        dataIndex: "Name",
                        sorter: (a, b) =>
                          a.Name !== null &&
                          a.Name?.length - b.Name !== null &&
                          b.Name?.length,
                        render: (Name, obj) => {
                          return (
                            <td className="table_display">
                              <td className="table_folder_icon">
                                <Img
                                  src={
                                    require("../../../assets/images/tb_projectTitle.svg")
                                      .default
                                  }
                                  alt="folder_icon"
                                />
                              </td>
                              <span className="text">{Name}</span>

                              {obj.HasAnomaly === 1 &&
                                obj.IgnoreAnomaly === 0 && (
                                  <div className="table_warning_icon">
                                    <Img
                                      src={
                                        require("../../../assets/images/tb_warning.svg")
                                          .default
                                      }
                                      alt="folder_icon"
                                    />
                                  </div>
                                )}
                            </td>
                          );
                        },
                      },
                      {
                        title: "Project Id",
                        dataIndex: "Id",
                        sorter: (a, b) => a.Id - b.Id,
                      },
                      {
                        title: "Project Type",
                        dataIndex: "Type",
                        sorter: (a, b) =>
                          a.Type !== null && a.Type - b.Type !== null && b.Type,
                        render: (type) => {
                          return (
                            <div>
                              {type === 1 ? "Hard" : type === 0 ? "Soft" : null}
                            </div>
                          );
                        },
                      },

                      {
                        title: "Budget Amount",
                        dataIndex: "Amount",
                        sorter: (a, b) =>
                          a.Amount !== null &&
                          a.Amount - b.Amount !== null &&
                          b.Amount,
                        render: (amt) => {
                          return accountingFormat(amt);
                        },
                        filters: extractAmountFilterForOtherProject(),
                        onFilter: (value, record) => {
                          return record.Amount === value;
                        },
                      },
                      {
                        title: "Executing Agency",
                        dataIndex: "ExecutingAgency",
                        sorter: (a, b) =>
                          a.ExecutingAgency !== null &&
                          a.ExecutingAgency?.length - b.ExecutingAgency !==
                            null &&
                          b.ExecutingAgency?.length,
                      },
                      {
                        title: "Sector",
                        dataIndex: "SectorName",
                        sorter: (a, b) =>
                          a.SectorName !== null &&
                          a.SectorName?.length - b.SectorName !== null &&
                          b.SectorName?.length,
                      },
                      {
                        title: "State",
                        dataIndex: "StateName",
                        sorter: (a, b) =>
                          a.StateName !== null &&
                          a.StateName?.length - b.StateName !== null &&
                          b.StateName?.length,
                      },
                      {
                        title: "Constituency",
                        dataIndex: "ConstituencyName",
                        sorter: (a, b) =>
                          a.ConstituencyName !== null &&
                          a.ConstituencyName?.length - b.ConstituencyName !==
                            null &&
                          b.ConstituencyName?.length,
                        filters: extractConstituencyFilterForOtherProject(),
                        onFilter: (value, record) => {
                          return record.ConstituencyName === value;
                        },
                      },

                      {
                        title: "Action",
                        dataIndex: "fileDownloadLink",
                        render: (_, obj) => {
                          return (
                            <ButtonOutlined
                              width={"auto"}
                              p={"0px 12px"}
                              height="32px"
                              fontWeight={6}
                              fontSize={"12px"}
                              letterSpacing={"0.01em"}
                              borderColor={colors.modes.light.danger}
                              color={colors.modes.light.danger}
                              bg={colors.modes.light.white}
                              borderRadius={"5px"}
                              hover={colors.modes.light.danger}
                              onClick={() => handleOtherProjectDownload(obj)}
                            >
                              Download
                            </ButtonOutlined>
                          );
                        },
                      },
                    ]}
                    handleBack={handleBack}
                  />
                }
                currentPage={currentPage}
              />
            )}
            {projectView === "selection" && (
              <ProjectSelectionView
                component={
                  <TableComponent
                    currentPage={currentPage}
                    handlePagination={handlePagination}
                    columns={[
                      {
                        title: "Project Title",
                        dataIndex: "Name",
                        sorter: (a, b) =>
                          a.Name !== null &&
                          a.Name?.length - b.Name !== null &&
                          b.Name?.length,
                        render: (Name, obj) => {
                          return (
                            <td className="table_display">
                              <td className="table_folder_icon">
                                <Img
                                  src={
                                    require("../../../assets/images/tb_projectTitle.svg")
                                      .default
                                  }
                                  alt="folder_icon"
                                />
                              </td>
                              <span className="text">{Name}</span>

                              {obj.HasAnomaly === 1 &&
                                obj.IgnoreAnomaly === 0 && (
                                  <div className="table_warning_icon">
                                    <Img
                                      src={
                                        require("../../../assets/images/tb_warning.svg")
                                          .default
                                      }
                                      alt="folder_icon"
                                    />
                                  </div>
                                )}
                            </td>
                          );
                        },
                      },

                      {
                        title: "Project Id",
                        dataIndex: "Id",
                        sorter: (a, b) => a.Id - b.Id,
                      },

                      {
                        title: "Project Type",
                        dataIndex: "Type",
                        sorter: (a, b) =>
                          a.Type !== null && a.Type - b.Type !== null && b.Type,
                        render: (type) => {
                          return (
                            <div>
                              {type === 1 ? "Hard" : type === 0 ? "Soft" : null}
                            </div>
                          );
                        },
                      },

                      {
                        title: "Budget Amount",
                        dataIndex: "Amount",
                        sorter: (a, b) =>
                          a.Amount !== null &&
                          a.Amount - b.Amount !== null &&
                          b.Amount,
                        render: (amt) => {
                          return accountingFormat(amt);
                        },
                        filters: extractAmountFilter(),
                        onFilter: (value, record) => {
                          return record.Amount === value;
                        },
                      },
                      {
                        title: "Executing Agency",
                        dataIndex: "ExecutingAgency",
                        sorter: (a, b) =>
                          a.ExecutingAgency !== null &&
                          a.ExecutingAgency?.length - b.ExecutingAgency !==
                            null &&
                          b.ExecutingAgency?.length,
                      },
                      {
                        title: "Sector",
                        dataIndex: "SectorName",
                        sorter: (a, b) =>
                          a.SectorName !== null &&
                          a.SectorName?.length - b.SectorName !== null &&
                          b.SectorName?.length,
                      },
                      {
                        title: "State",
                        dataIndex: "StateName",
                        sorter: (a, b) =>
                          a.StateName !== null &&
                          a.StateName?.length - b.StateName !== null &&
                          b.StateName?.length,
                      },
                      {
                        title: "Constituency",
                        dataIndex: "ConstituencyName",
                        sorter: (a, b) =>
                          a.ConstituencyName !== null &&
                          a.ConstituencyName?.length - b.ConstituencyName !==
                            null &&
                          b.ConstituencyName?.length,

                        filters: extractConstituencyFilter(),
                        onFilter: (value, record) => {
                          return record.ConstituencyName === value;
                        },
                      },
                    ]}
                    handleOtherProjecBtn={handleOtherProjecBtn}
                    handleBack={handleBack}
                  />
                }
                currentPage={currentPage}
              />
            )}
          </Content>
          <LogoutModal />
          <ProjectSelectionCriteriaModal />
          <SaveSampleSelectedModal />
        </MainContent>
      </Main>
    </ErrorComponent>
  );
};

export default ProjectSelection;
