import React, { useState, useId, useEffect } from "react";
import {
  MiniHeaderStyle,
  Content,
  Main,
  Container,
} from "../../../styles/layout";
import { Spin, Dropdown } from "antd";
import TableComponent from "./components/Table";
import Sidebar from "../../../components/Sidebar";
import { ErrorComponent } from "../../../components/ErrorBoundry/errorComponent";
import { useSelector, useDispatch } from "react-redux";
import {
  ProjectList,
  ProjectInstances,
  SupportingDocument,
  ProjectAnomalies,
  ProjectOverview,
  FieldReport,
  Anomalies,
  AnomalyDetails,
} from "./components/views";
import { ButtonOutlined } from "../../../components/Button";
import { Img, Text } from "../../../components/Primitives";
import { LogoutModal } from "../../../components/Modal";
import { UploadCloseOutReport } from "./components/modal";
import {
  setCurrentTab,
  setAnomaliesType,
  fetchAllProjectCycle,
  removeAddedFieldReport,
  removeAddedSupportingDocs,
  handleDeleteSupportingDocs,
  fetchProjectList,
  setTrackingId,
  saveProjectId,
  clearErrorMessage,
  clearSuccessMessage,
  fetchUploadedFieldData,
  fetchSupportingDocumentsData,
  openModal,
  handleErrorRequest,
} from "../../../services/projects/action";
import {
  clearGlobalErrorMessage,
  clearGlobalSuccessMessage,
} from "../../../services/global/action";

import colors from "../../../theme/colors";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { accountingFormat } from "../../../utils";
import { LoadingOutlined } from "@ant-design/icons";

const Projects = () => {
  const [menu, setMenu] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [removeId, setRemoveId] = useState(null);

  const {
    error,
    success,
    currentTab,
    anomalies_type,
    isDeleting,
    trackingIdFromList,
    projectId,
    projectListData,
  } = useSelector((state) => state.projects);
  const { trackingId, authUser, trackingStatus, globalSuccess, globalError } =
    useSelector((state) => state.global);
  const id = useId();

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
    if (currentTab === "Project Tracking Instances") {
      dispatch(
        fetchAllProjectCycle(
          { CurrentPage: currentPage, PageSize: 10 },
          navigate
        )
      );
    }
  }, []);

  const handlePagination = (pagination, filters, sorter) => {
    setCurrentPage(pagination.current);
    if (currentTab === "Project Tracking Instances") {
      dispatch(
        fetchAllProjectCycle(
          { CurrentPage: pagination.current, PageSize: 10 },
          navigate
        )
      );
    }

    if (currentTab === "Project List") {
      dispatch(
        fetchProjectList(
          {
            Id: trackingIdFromList,
            CurrentPage: pagination.current,
            PageSize: 10,
          },
          navigate
        )
      );
    }

    if (currentTab === "Supporting Documents") {
      dispatch(
        fetchSupportingDocumentsData(
          {
            projectId: projectId,
            CurrentPage: pagination.current,
            PageSize: 3,
          },
          navigate
        )
      );
    }

    if (currentTab === "Field Reports") {
      dispatch(
        // I don't want pagination for this endpoint.
        fetchUploadedFieldData(
          {
            TrackingId: trackingId,
            CurrentPage: pagination.current,
            PageSize: 3,
          },
          navigate
        )
      );
    }
  };

  const handleTabChange = (item) => {
    if (projectId !== null) {
      dispatch(setCurrentTab({ currentTab: item }));
    } else {
      dispatch(
        handleErrorRequest(`No Project List is present inorder to continue.`)
      );
    }
  };

  const handleBack = () => {
    if (currentTab === "Project List") {
      dispatch(setCurrentTab({ currentTab: "Project Tracking Instances" }));
      dispatch(
        fetchAllProjectCycle({ CurrentPage: 1, PageSize: 10 }, navigate)
      );
      setCurrentPage(1);
    }
  };

  const handleCloseOutReport = () => {
    dispatch(
      setAnomaliesType({
        anomalies_type: "anomalyTable",
      })
    );
  };

  const handleViewBtn = (obj) => {
    console.log(obj);
    if (currentTab.includes("Instances")) {
      dispatch(
        setTrackingId({ trackingIdFromList: obj.Id, storedTrackingObj: obj })
      );
      dispatch(
        fetchProjectList({ Id: obj.Id, CurrentPage: 1, PageSize: 10 }, navigate)
      );
      setCurrentPage(1);
      dispatch(setCurrentTab({ currentTab: "Project List" }));
    } else if (currentTab.includes("List")) {
      setCurrentPage(1);
      dispatch(saveProjectId({ projectId: obj.Id }));
      dispatch(setCurrentTab({ currentTab: "Supporting Documents" }));

      if (
        authUser !== null &&
        (authUser.roleName === "CEPTG" || authUser.roleName === "ADMIN")
      ) {
        dispatch(setCurrentTab({ currentTab: "Anomalies" }));
        dispatch(setAnomaliesType({ anomalies_type: "Overview" }));
      }

      if (
        authUser !== null &&
        (authUser.roleName.toLowerCase().includes("field") ||
          authUser.roleName.toLowerCase().split("-")[0].includes("field"))
      ) {
        dispatch(setCurrentTab({ currentTab: "Field Reports" }));
      }
    }
  };

  const handleContinueBtn = (obj) => {
    console.log(obj);
    if (currentTab.includes("Instances")) {
      dispatch(
        setTrackingId({ trackingIdFromList: obj.Id, storedTrackingObj: obj })
      );
      dispatch(
        fetchProjectList({ Id: obj.Id, CurrentPage: 1, PageSize: 10 }, navigate)
      );
      dispatch(setCurrentTab({ currentTab: "Project List" }));
    } else if (currentTab.includes("List")) {
      dispatch(saveProjectId({ projectId: obj.Id }));
      // I am in Project List
      if (authUser !== null && authUser.roleName === "MDA") {
        dispatch(setCurrentTab({ currentTab: "Supporting Documents" }));
      }
      if (
        authUser !== null &&
        (authUser.roleName === "CEPTG" || authUser.roleName === "ADMIN")
      ) {
        dispatch(setCurrentTab({ currentTab: "Anomalies" }));
        dispatch(setAnomaliesType({ anomalies_type: "Overview" }));
      }

      if (
        authUser !== null &&
        (authUser.roleName.toLowerCase().includes("field") ||
          authUser.roleName.toLowerCase().split("-")[0].includes("field"))
      ) {
        dispatch(setCurrentTab({ currentTab: "Field Reports" }));
      }
    }
  };

  const handleRemove = (obj) => {
    dispatch(removeAddedFieldReport(obj));
  };

  const handleRemoveSupportingDoc = (obj) => {
    if (authUser !== null && authUser.roleName === "MDA") {
      if (obj.Id) {
        setRemoveId(obj.Id);
        dispatch(handleDeleteSupportingDocs({ id: obj.Id }, navigate));
      } else {
        dispatch(removeAddedSupportingDocs(obj));
      }
    }
  };

  const handleDownloadSupportingDoc = (obj) => {
    console.log(obj);
    if (obj.HttpPath !== null) {
      const link = document.createElement("a");
      link.href = obj.HttpPath;
      link.setAttribute("download", "");
      link.setAttribute("target", "_blank"); //or any other extension
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  };

  const extractAmountFilter = () => {
    let res = [];

    projectListData?.map((item) => {
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

  const handleUploadCloseOut = () => {
    dispatch(openModal({ showUploadCloseOut: true }));
  };

  const handleDownloadCloseOutReport = (obj) => {
    if (obj.CloseOutReportLink !== null) {
      const link = document.createElement("a");
      link.href = obj.CloseOutReportLink;
      link.setAttribute("download", ""); //or any other extension
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  };

  const extractConstituencyFilter = () => {
    let res = [];

    projectListData?.map((item) => {
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
        <Container paddingLeft="4.8rem">
          <MiniHeaderStyle>
            {currentTab.includes("Instances") ? (
              <div className="title">
                <p
                  className={[
                    "header_past_title header_current_title",
                    "active_title",
                  ].join(" ")}
                >
                  {currentTab}
                </p>
                <span
                  className={["current_title_btab ", "instance_tab"].join(" ")}
                ></span>
              </div>
            ) : (
              <div
                className="title"
                style={{
                  cursor: projectId !== null ? "pointer" : "not-allowed",
                }}
              >
                {authUser !== null && authUser.roleName === "CEPTG" ? (
                  <>
                    {[
                      "Project List",
                      "Anomalies",
                      "Supporting Documents",
                      "Field Reports",
                    ]?.map((item) => (
                      <p
                        className={[
                          "header_past_title header_current_title",
                          currentTab === item ? "active_title" : null,
                        ].join(" ")}
                        key={`${id}-${item}`}
                        onClick={() => handleTabChange(item)}
                      >
                        {item}
                      </p>
                    ))}

                    <span
                      className={[
                        "current_title_btab ",
                        currentTab.includes("Project List")
                          ? "project_tab"
                          : currentTab.includes("Supporting Documents")
                          ? "supporting_tab"
                          : currentTab.includes("Anomalies")
                          ? "project_anomalies"
                          : currentTab.includes("Field Reports")
                          ? "project_fieldReport"
                          : null,
                      ].join(" ")}
                    ></span>
                  </>
                ) : authUser !== null && authUser.roleName === "MDA" ? (
                  <>
                    {["Project List", "Anomalies", "Supporting Documents"]?.map(
                      (item) => (
                        <p
                          className={[
                            "header_past_title header_current_title",
                            currentTab === item ? "active_title" : null,
                          ].join(" ")}
                          key={`${id}-${item}`}
                          onClick={() => handleTabChange(item)}
                        >
                          {item}
                        </p>
                      )
                    )}

                    <span
                      className={[
                        "current_title_btab ",
                        currentTab.includes("Project List")
                          ? "project_tab"
                          : currentTab.includes("Anomalies")
                          ? "project_anomalies"
                          : currentTab.includes("Supporting Documents")
                          ? "mda_supporting_tab"
                          : null,
                      ].join(" ")}
                    ></span>
                  </>
                ) : authUser.roleName.toLowerCase().includes("field") ||
                  authUser.roleName
                    .toLowerCase()
                    .split("-")[0]
                    .includes("field") ? (
                  <>
                    {[
                      "Project List",
                      "Anomalies",
                      "Supporting Documents",
                      "Field Reports",
                    ]?.map((item) => (
                      <p
                        className={[
                          "header_past_title header_current_title",
                          currentTab === item ? "active_title" : null,
                        ].join(" ")}
                        key={`${id}-${item}`}
                        onClick={() => handleTabChange(item)}
                      >
                        {item}
                      </p>
                    ))}

                    <span
                      className={[
                        "current_title_btab ",
                        currentTab.includes("Project List")
                          ? "project_tab"
                          : currentTab.includes("Supporting Documents")
                          ? "supporting_tab"
                          : currentTab.includes("Anomalies")
                          ? "project_anomalies"
                          : currentTab.includes("Field Reports")
                          ? "project_fieldReport"
                          : null,
                      ].join(" ")}
                    ></span>
                  </>
                ) : null}
              </div>
            )}
          </MiniHeaderStyle>
          <Content>
            {currentTab.includes("Instances") && (
              <ProjectInstances
                component={
                  <TableComponent
                    currentPage={currentPage}
                    handlePagination={handlePagination}
                    columns={[
                      {
                        title: "Project Tracking Cycle",
                        dataIndex: "Period",
                        sorter: (a, b) =>
                          a.Period !== null &&
                          a.Period?.length - b.Period !== null &&
                          b.Period?.length,
                        render: (Period, obj) => {
                          return (
                            <div className="table_display">
                              <div className="table_folder_icon">
                                <Img
                                  src={
                                    require("../../../assets/images/tb_projectTitle.svg")
                                      .default
                                  }
                                  alt="folder_icon"
                                />
                              </div>
                              <span>{Period}</span>
                            </div>
                          );
                        },
                      },

                      {
                        title: "Project Cycle Status",
                        dataIndex: "Status",
                        render: (_, obj) => {
                          let tagColor =
                            obj.Status === 0 ||
                            obj.Status === 1 ||
                            obj.Status === 2 ||
                            obj.Status === 4 ||
                            obj.Status === 7 ||
                            obj.Status === 8 ||
                            obj.Status === 11
                              ? "tag_success"
                              : "tag_warning";
                          let tagIconColor =
                            obj.Status === 0 ||
                            obj.Status === 1 ||
                            obj.Status === 2 ||
                            obj.Status === 4 ||
                            obj.Status === 7 ||
                            obj.Status === 8 ||
                            obj.Status === 11
                              ? "iconSuccessColor"
                              : "iconWarningColor";
                          return (
                            <div className={["ant-tag", tagColor].join(" ")}>
                              <div
                                className={["icon", tagIconColor].join(" ")}
                              ></div>

                              {obj.Status === 0 || obj.Status === 1
                                ? "New"
                                : obj.Status === 2
                                ? "Budget Uploaded"
                                : obj.Status === 3
                                ? "Executing agency and constituency data uploaded"
                                : obj.Status === 4
                                ? "Projects selected"
                                : obj.Status === 5
                                ? "Project selection saved and sent for review"
                                : obj.Status === 6
                                ? "Project selection reviewed and approved"
                                : obj.Status === 7
                                ? "Project details documents uploaded"
                                : obj.Status === 8
                                ? "Project directors documents uploaded"
                                : obj.Status === 11
                                ? "Completed and Closed"
                                : null}
                            </div>
                          );
                        },
                      },

                      {
                        title: "Date Created",
                        dataIndex: "CreatedAt",
                        render: (createdAt) => {
                          let splittedVal =
                            createdAt !== undefined && createdAt?.split("T");

                          return (
                            <div>
                              {splittedVal !== undefined
                                ? moment(splittedVal[0]).format("DD-MM-YYYY")
                                : null}
                            </div>
                          );
                        },
                      },

                      {
                        title: "Action",
                        dataIndex: "id",
                        render: (id, obj) => {
                          return (
                            <>
                              {trackingId !== null &&
                              trackingId === obj.Id &&
                              trackingStatus !== null &&
                              trackingStatus?.tracking.Status !== 1 ? (
                                <ButtonOutlined
                                  width={"auto"}
                                  p={"3px 14px"}
                                  height="auto"
                                  fontWeight={5}
                                  borderColor={"#00A3A1"}
                                  color={"#00A3A1"}
                                  bg={colors.modes.light.white}
                                  borderRadius={"4px"}
                                  onClick={() => handleContinueBtn(obj)}
                                >
                                  Continue
                                </ButtonOutlined>
                              ) : (
                                <ButtonOutlined
                                  width={"auto"}
                                  p={"3px 14px"}
                                  height="auto"
                                  fontWeight={5}
                                  borderColor={"#00A3A1"}
                                  color={"#00A3A1"}
                                  bg={colors.modes.light.white}
                                  borderRadius={"4px"}
                                  onClick={() => handleViewBtn(obj)}
                                >
                                  View
                                </ButtonOutlined>
                              )}
                            </>
                          );
                        },
                      },
                    ]}
                  />
                }
              />
            )}
            {currentTab.includes("List") && (
              <ProjectList
                component={
                  <TableComponent
                    currentPage={currentPage}
                    handleBack={handleBack}
                    handlePagination={handlePagination}
                    columns={[
                      {
                        title: "Project Title",
                        dataIndex: "Name",
                        sorter: (a, b) => a.Name?.length - b.Name?.length,
                        render: (Name, obj) => {
                          return (
                            <td className="table_display">
                              <span className="text">{Name}</span>
                            </td>
                          );
                        },
                      },

                      {
                        title: "Project Type",
                        dataIndex: "Type",
                        sorter: (a, b) =>
                          a.Type !== null && a.Type - b.Type !== null && b.Type,
                        render: (type) => {
                          return type === 1
                            ? "Hard"
                            : type === 0
                            ? "Soft"
                            : null;
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
                        title: "Status",
                        dataIndex: "Status",
                        render: (_, obj) => {
                          let tagColor =
                            obj.Status === null || obj.Status === 0
                              ? "tag_warning"
                              : obj.Status !== null && obj.Status === 1
                              ? "tag_success"
                              : "";

                          let tagIconColor =
                            obj.Status === null || obj.Status === 0
                              ? "iconWarningColor"
                              : obj.Status !== null && obj.Status === 1
                              ? "iconSuccessColor"
                              : "";
                          return (
                            <>
                              <div className={["ant-tag", tagColor].join(" ")}>
                                <div
                                  className={["icon", tagIconColor].join(" ")}
                                ></div>

                                {obj.Status === null || obj.Status === 0
                                  ? "In Progress"
                                  : obj.Status === 2
                                  ? "Complete"
                                  : null}
                              </div>
                            </>
                          );
                        },
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
                      {
                        title: "Action",
                        dataIndex: "id",
                        render: (id, obj) => {
                          return (
                            <>
                              {authUser?.roleName === "CEPTG" ? (
                                obj.Status === 1 ? (
                                  // status 1 means project is complete show view and download
                                  <Dropdown
                                    trigger={["click"]}
                                    menu={{
                                      items: [
                                        {
                                          key: "1",
                                          label: (
                                            <Text
                                              p={"3px 14px"}
                                              fontSize={"12px"}
                                              fontWeight={5}
                                              color={"#00A3A1"}
                                              onClick={() => handleViewBtn(obj)}
                                            >
                                              View
                                            </Text>
                                          ),
                                        },

                                        {
                                          key: "2",
                                          label: (
                                            <Text
                                              p={"3px 14px"}
                                              fontWeight={7}
                                              fontSize={"12px"}
                                              letterSpacing={"0.01em"}
                                              lineHeight={"14px"}
                                              color={colors.modes.light.danger}
                                              hover={colors.modes.light.danger}
                                              onClick={() =>
                                                handleDownloadCloseOutReport(
                                                  obj
                                                )
                                              }
                                            >
                                              Download Close Out Report
                                            </Text>
                                          ),
                                        },
                                      ],
                                    }}
                                  >
                                    <Img
                                      src={
                                        require("../../../assets/images/table-action.svg")
                                          .default
                                      }
                                    />
                                  </Dropdown>
                                ) : (
                                  // show continue and  upload close report.
                                  <Dropdown
                                    trigger={["click"]}
                                    menu={{
                                      items: [
                                        {
                                          key: "1",
                                          label: (
                                            <Text
                                              p={"3px 14px"}
                                              fontSize={"12px"}
                                              fontWeight={6}
                                              color={colors.modes.light.danger}
                                              onClick={() =>
                                                handleContinueBtn(obj)
                                              }
                                            >
                                              Continue
                                            </Text>
                                          ),
                                        },
                                        {
                                          key: "2",
                                          label: (
                                            <Text
                                              p={"3px 14px"}
                                              fontWeight={6}
                                              fontSize={"12px"}
                                              letterSpacing={"0.01em"}
                                              lineHeight={"14px"}
                                              color={"#00A3A1"}
                                              hover={"#00A3A1"}
                                              onClick={() =>
                                                handleUploadCloseOut()
                                              }
                                            >
                                              Upload Close Out Report
                                            </Text>
                                          ),
                                        },
                                      ],
                                    }}
                                  >
                                    <Img
                                      src={
                                        require("../../../assets/images/table-action.svg")
                                          .default
                                      }
                                    />
                                  </Dropdown>
                                )
                              ) : obj.Status === 1 ? (
                                // MDA and Field user login, show view and  donwload close report.
                                <Dropdown
                                  trigger={["click"]}
                                  menu={{
                                    items: [
                                      {
                                        key: "1",
                                        label: (
                                          <Text
                                            p={"3px 14px"}
                                            fontSize={"12px"}
                                            fontWeight={6}
                                            color={"#00A3A1"}
                                            onClick={() => handleViewBtn(obj)}
                                          >
                                            View
                                          </Text>
                                        ),
                                      },

                                      {
                                        key: "2",
                                        label: (
                                          <Text
                                            p={"3px 14px"}
                                            fontSize={"12px"}
                                            fontWeight={6}
                                            letterSpacing={"0.01em"}
                                            lineHeight={"14px"}
                                            color={colors.modes.light.danger}
                                            hover={colors.modes.light.danger}
                                            onClick={() =>
                                              handleDownloadCloseOutReport(obj)
                                            }
                                          >
                                            Download Close Out Report
                                          </Text>
                                        ),
                                      },
                                    ],
                                  }}
                                >
                                  <Img
                                    src={
                                      require("../../../assets/images/table-action.svg")
                                        .default
                                    }
                                  />
                                </Dropdown>
                              ) : (
                                // show only continue button
                                <ButtonOutlined
                                  width={"auto"}
                                  p={"3px 14px"}
                                  fontSize={"12px"}
                                  height="auto"
                                  fontWeight={5}
                                  borderColor={colors.modes.light.danger}
                                  color={colors.modes.light.danger}
                                  bg={colors.modes.light.white}
                                  borderRadius={"4px"}
                                  onClick={() => handleContinueBtn(obj)}
                                >
                                  Continue
                                </ButtonOutlined>
                              )}
                            </>
                          );
                        },
                      },
                    ]}
                  />
                }
              />
            )}
            {currentTab.includes("Documents") && (
              <SupportingDocument
                component={
                  <TableComponent
                    currentPage={currentPage}
                    handlePagination={handlePagination}
                    columns={[
                      {
                        title: "File Name",
                        dataIndex: "Name",
                      },
                      {
                        title: "File Description",
                        dataIndex: "Description",
                      },

                      {
                        title: "Action",
                        dataIndex: "id",
                        render: (id, obj) => {
                          return (
                            <>
                              {(authUser?.roleName === "MDA" ||
                                authUser?.roleName === "CEPTG") && (
                                <Dropdown
                                  trigger={["click"]}
                                  menu={{
                                    items: [
                                      {
                                        key: "1",
                                        label: (
                                          <ButtonOutlined
                                            width={"auto"}
                                            p={"0px 12px"}
                                            height="22px"
                                            letterSpacing={"0.01em"}
                                            lineHeight={"14px"}
                                            borderRadius={"4px"}
                                            borderColor={
                                              colors.modes.light.danger
                                            }
                                            color={colors.modes.light.danger}
                                            bg={colors.modes.light.white}
                                            hover={colors.modes.light.danger}
                                            onClick={() =>
                                              handleRemoveSupportingDoc(obj)
                                            }
                                          >
                                            {isDeleting &&
                                            removeId !== null &&
                                            removeId === obj.Id ? (
                                              <Spin
                                                indicator={<LoadingOutlined />}
                                              />
                                            ) : (
                                              "Remove"
                                            )}
                                          </ButtonOutlined>
                                        ),
                                      },

                                      {
                                        key: "2",
                                        label: (
                                          <ButtonOutlined
                                            width={"auto"}
                                            p={"0px 12px"}
                                            height="22px"
                                            letterSpacing={"0.01em"}
                                            lineHeight={"14px"}
                                            borderRadius={"4px"}
                                            borderColor={
                                              colors.modes.light.danger
                                            }
                                            color={colors.modes.light.danger}
                                            bg={colors.modes.light.white}
                                            hover={colors.modes.light.danger}
                                            onClick={() =>
                                              handleDownloadSupportingDoc(obj)
                                            }
                                          >
                                            Download
                                          </ButtonOutlined>
                                        ),
                                      },
                                    ],
                                  }}
                                >
                                  <Img
                                    src={
                                      require("../../../assets/images/table-action.svg")
                                        .default
                                    }
                                  />
                                </Dropdown>
                              )}
                            </>
                          );
                        },
                      },
                    ]}
                  />
                }
              />
            )}
            {currentTab.includes("Anomalies") &&
              (anomalies_type.includes("projectTitle") ? (
                <AnomalyDetails
                  component={
                    <TableComponent
                      currentPage={currentPage}
                      handlePagination={handlePagination}
                      handleBack={handleCloseOutReport}
                      columns={[
                        {
                          title: "Project Title",
                          dataIndex: "projectTitle",
                          sorter: (a, b) =>
                            a.projectTitle.length - b.projectTitle.length,
                          render: (projectTitle, obj) => {
                            return (
                              <div className="table_display">
                                <div className="table_folder_icon table_anomalie_icon">
                                  <Img
                                    src={
                                      require("../../../assets/images/tb_anomalie_icon.svg")
                                        .default
                                    }
                                    alt="folder_icon"
                                  />
                                </div>
                                <span>{projectTitle}</span>

                                {obj.errorAnomaly && (
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
                              </div>
                            );
                          },
                        },
                        {
                          title: "Project Code",
                          dataIndex: "projectCode",
                          sorter: (a, b) =>
                            a.projectCode.length - b.projectCode.length,
                        },
                        {
                          title: "Project Tracking #",
                          dataIndex: "projectType",
                          sorter: (a, b) => a.projectType - b.projectType,
                        },
                        {
                          title: "Contractor",
                          dataIndex: "budgetAmount",
                          sorter: (a, b) => a.budgetAmount - b.budgetAmount,
                        },

                        {
                          title: "State",
                          dataIndex: "StateName",
                          sorter: (a, b) =>
                            a.StateName.length - b.StateName.length,
                        },

                        {
                          title: "Constituency",
                          dataIndex: "sector",
                          sorter: (a, b) => a.sector.length - b.sector.length,
                        },
                        {
                          title: "Action",
                          dataIndex: "id",
                          render: (id, obj) => {
                            return (
                              <>
                                {obj.errorAnomaly && (
                                  <Text
                                    bg={colors.modes.light.secondaryLightGreen}
                                    borderRadius="3px"
                                    color={
                                      colors.modes.light.secondaryDarkGreen
                                    }
                                    py={"2px"}
                                    px={"8px"}
                                    fontSize={"10px"}
                                    fontWeight={5}
                                  >
                                    <span>Ignore</span>
                                  </Text>
                                )}
                              </>
                            );
                          },
                        },
                      ]}
                    />
                  }
                />
              ) : (
                <Anomalies>
                  {anomalies_type.includes("anomalyTable") && (
                    <ProjectAnomalies
                      component={
                        <TableComponent
                          currentPage={currentPage}
                          handlePagination={handlePagination}
                          columns={[
                            {
                              title: "Anomaly Type",
                              dataIndex: "AnomalyType",
                              render: (anomalies_type, obj) => {
                                return (
                                  <div className="table_display">
                                    <div className="table_folder_icon table_anomalie_icon">
                                      <Img
                                        src={
                                          require("../../../assets/images/tb_anomalie_icon.svg")
                                            .default
                                        }
                                        alt="folder_icon"
                                      />
                                    </div>
                                    <span>{anomalies_type?.Name}</span>
                                  </div>
                                );
                              },
                            },
                            {
                              title: "Project Code",
                              dataIndex: "ProjectCode",
                            },
                            {
                              title: "Anomaly Description",
                              dataIndex: "Description",
                              render: (Description, data) =>
                                data.IgnoreAnomaly == 1 ? (
                                  <span>
                                    {Description}{" "}
                                    <span style={{ color: "red" }}>
                                      (Ignored)
                                    </span>
                                  </span>
                                ) : (
                                  <span>{Description}</span>
                                ),
                            },

                            {
                              title: "Risk Level",
                              dataIndex: "RiskLevel",
                              render: (level) => {
                                return level === 1
                                  ? "Low"
                                  : level === 2
                                  ? "Medium"
                                  : level === 3
                                  ? "High"
                                  : null;
                              },
                            },
                            // {
                            //   title: "Action",
                            //   dataIndex: "id",
                            //   render: (id, obj) => {
                            //     return (
                            //       <ButtonOutlined
                            //         width={"auto"}
                            //         p={"3px 14px"}
                            //         height="auto"
                            //         fontWeight={5}
                            //         borderColor={colors.modes.light.danger}
                            //         color={colors.modes.light.danger}
                            //         bg={colors.modes.light.white}
                            //         borderRadius={"4px"}
                            //         onClick={() => handleViewAnomalie(obj)}
                            //       >
                            //         View
                            //       </ButtonOutlined>
                            //     );
                            //   },
                            // },
                          ]}
                        />
                      }
                    />
                  )}

                  {anomalies_type.includes("Overview") && <ProjectOverview />}
                </Anomalies>
              ))}

            {currentTab.includes("Field Reports") && (
              <FieldReport
                component={
                  <TableComponent
                    currentPage={currentPage}
                    handlePagination={handlePagination}
                    columns={[
                      {
                        title: "File Name",
                        dataIndex: "Name",
                        sorter: (a, b) => a.Name - b.Name,
                      },
                      {
                        title: "File Description",
                        dataIndex: "Description",
                        sorter: (a, b) => a.Description - b.Description,
                      },

                      {
                        title: "Action",
                        dataIndex: "id",
                        render: (id, obj) => {
                          return (
                            <Dropdown
                              trigger={["click"]}
                              menu={{
                                items: [
                                  {
                                    key: "1",
                                    label: (
                                      <ButtonOutlined
                                        width={"auto"}
                                        p={"0px 12px"}
                                        height="22px"
                                        letterSpacing={"0.01em"}
                                        lineHeight={"14px"}
                                        borderRadius={"4px"}
                                        borderColor={colors.modes.light.danger}
                                        color={colors.modes.light.danger}
                                        bg={colors.modes.light.white}
                                        hover={colors.modes.light.danger}
                                        onClick={() => handleRemove(obj)}
                                      >
                                        Remove
                                      </ButtonOutlined>
                                    ),
                                  },

                                  {
                                    key: "2",
                                    label: (
                                      <ButtonOutlined
                                        width={"auto"}
                                        p={"0px 12px"}
                                        height="22px"
                                        letterSpacing={"0.01em"}
                                        lineHeight={"14px"}
                                        borderRadius={"4px"}
                                        borderColor={colors.modes.light.danger}
                                        color={colors.modes.light.danger}
                                        bg={colors.modes.light.white}
                                        hover={colors.modes.light.danger}
                                        // onClick={() => handleRemove(obj)}
                                      >
                                        Download
                                      </ButtonOutlined>
                                    ),
                                  },
                                ],
                              }}
                            >
                              <Img
                                src={
                                  require("../../../assets/images/table-action.svg")
                                    .default
                                }
                              />
                            </Dropdown>
                          );
                        },
                      },
                    ]}
                  />
                }
              />
            )}
          </Content>
          <LogoutModal />
          <UploadCloseOutReport />
        </Container>
      </Main>
    </ErrorComponent>
  );
};

export default Projects;
