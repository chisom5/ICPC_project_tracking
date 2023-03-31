import React, { useState, useEffect } from "react";
import {
  MainContent,
  MiniHeaderStyle,
  Content,
  Main,
} from "../../../styles/layout";
import TableComponent from "./components/Table";
import Sidebar from "../../../components/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import { ErrorComponent } from "../../../components/ErrorBoundry/errorComponent";
import {
  ContractsUpload,
  ContractsAnomalies,
  ContractsProjectName,
} from "./components/views";

import { ButtonOutlined } from "../../../components/Button";
import { Img } from "../../../components/Primitives";
import colors from "../../../theme/colors";
import { LogoutModal } from "../../../components/Modal";
import {
  handleDownloadContractDetailsTemp,
  handleDownloadContractDirectorsTemp,
  clearErrorMessage,
  clearSuccessMessage,
  handleRemoveContractInfo,
  setContractDUpload,
  fetchContractAnomalByTrackingId,
  handleErrorRequest,
  handleRequestSuccess,
  setContractView,
  fetchAnomalyReviewByProjectId,
  handleIgnoreAllAnomalies,
  handleFilterAnomalyRecord,
} from "../../../services/contracts/action";
import { useNavigate } from "react-router-dom";
import {
  clearGlobalErrorMessage,
  clearGlobalSuccessMessage,
} from "../../../services/global/action";
import moment from "moment";
import { accountingFormat } from "../../../utils";

const ContractAndTenderUpload = () => {
  const [menu, setMenu] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [removeId, setRemoveId] = useState(null);

  const { trackingId, trackingStatus, authUser, globalError, globalSuccess } =
    useSelector((state) => state.global);

  const {
    error,
    success,
    contractView,
    contractInfoTable,
    SelectedAnomalData,
    selectedValFilter,
    contractAnomaliesData,
  } = useSelector((state) => state.contract);

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
    if (trackingStatus !== null && trackingStatus?.tracking?.Status > 6) {
      let data = [];
      data.push({
        Id: 1,
        dataFile: "Project Detail File",
        dateUploaded: moment(
          trackingStatus?.tracking.CreatedAt.split("T")[0]
        ).format("DD-MM-YYYY"),
      });
      // save to my state.
      dispatch(setContractDUpload({ contractInfoTable: data }));
    }
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
      if (contractView === "anomalies") {
        dispatch(
          fetchContractAnomalByTrackingId(
            { Id: trackingId, CurrentPage: pagination.current, PageSize: 10 },
            navigate
          )
        ).then(() => {
          dispatch(handleFilterAnomalyRecord(selectedValFilter));
        });
      }
    }
  };

  const handlePreviewReport = () => {
    if (
      trackingStatus !== null &&
      (trackingStatus?.tracking.Status === 6 ||
        trackingStatus?.tracking.Status === 7 ||
        trackingStatus?.tracking.Status === 8)
    ) {
      if (contractInfoTable.length !== 0) {
        // Budget Anomalies
        dispatch(
          fetchContractAnomalByTrackingId(
            { Id: trackingId, CurrentPage: currentPage, PageSize: 10 },
            navigate
          )
        );
      } else {
        dispatch(handleErrorRequest("No File Added Yet, In order to Preview."));
      }
    } else if (trackingStatus !== null && trackingStatus?.tracking.Status < 6) {
      dispatch(
        handleErrorRequest(
          "Ensure you have completed the Pre-selection module for this tracking year."
        )
      );
    } else if (trackingStatus !== null && trackingStatus?.tracking.Status > 8) {
      dispatch(
        handleRequestSuccess(
          "Project Detail / Information is complete for this tracking year."
        )
      );
    }
  };

  const handleDownloadContractDetail = () => {
    dispatch(
      handleDownloadContractDetailsTemp(
        { projectTrackingId: trackingId },
        navigate
      )
    );
  };

  const handleDownloadDirectorTemplate = () => {
    dispatch(
      handleDownloadContractDirectorsTemp(
        { projectTrackingId: trackingId },
        navigate
      )
    );
  };

  const handleBack = () => {
    if (contractView === "anomalies")
      dispatch(setContractView({ contractView: "contractUpload" }));
    else if (contractView === "projectTitle")
      dispatch(setContractView({ contractView: "anomalies" }));
  };

  const reviewAnomal = (obj) => {
    if (obj.IgnoreAnomaly !== 1) {
      dispatch(
        fetchAnomalyReviewByProjectId({ projectId: obj.Id }, navigate)
      ).then(() => {
        dispatch(
          setContractView({
            contractView: "projectTitle",
            SelectedAnomalData: [obj],
          })
        );
      });
    } else {
      dispatch(handleErrorRequest("Anomaly has been Ignored."));
    }
  };

  const ignoreAllAnomal = (obj) => {
    if (
      trackingStatus !== null &&
      (trackingStatus?.tracking.Status === 6 ||
        trackingStatus?.tracking.Status === 7)
    ) {
      dispatch(handleIgnoreAllAnomalies({ projectId: obj.Id }, navigate));
    } else if (
      trackingStatus !== null &&
      trackingStatus?.tracking.Status >= 8
    ) {
      return;
      // dispatch(
      //   handleRequestSuccess(
      //     "Contract Detail / Information is complete for this tracking year."
      //   )
      // );
    }
  };

  const handleRemove = (obj) => {
    if (
      trackingStatus !== null &&
      (trackingStatus?.tracking.Status === 6 ||
        trackingStatus?.tracking.Status === 7)
    ) {
      setRemoveId(obj.Id);
      const params = {
        Id: obj?.Id,
      };

      dispatch(handleRemoveContractInfo(params));
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

  const extractSponsorFilter = () => {
    let res = [];

    contractAnomaliesData?.map((item) => {
      let a = res.findIndex((i) => i.value === item.Sponsor);

      if (a === -1) {
        res.push({
          text: item.Sponsor,
          value: item.Sponsor,
        });
      }
    });

    return res;
  };

  const extractAmountFilter = () => {
    let res = [];

    contractAnomaliesData?.map((item) => {
      let a = res.findIndex((i) => i.value === item.ContractSum);

      if (a === -1) {
        // remove duplicate.
        res.push({
          text: accountingFormat(item.ContractSum),
          value: item.ContractSum,
        });
      }
    });

    return res;
  };

  const extractConstituencyFilter = () => {
    let res = [];

    contractAnomaliesData?.map((item) => {
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
            {contractView === "contractUpload" ? (
              <p className="title">Project Details Upload</p>
            ) : contractView === "anomalies" ? (
              <p className="title">Project Anomalies</p>
            ) : contractView === "projectTitle" ? (
              // here the tabs
              <div className="title">
                <span
                  className="header_past_title"
                  onClick={() =>
                    dispatch(setContractView({ contractView: "anomalies" }))
                  }
                >
                  Project Anomalies
                </span>{" "}
                {/* <p className="header_current_title">
                  {SelectedAnomalData[0]?.projectTitle}
                </p> */}
                <span className="current_title_btab contract_tab_left"></span>
              </div>
            ) : null}
          </MiniHeaderStyle>
          <Content>
            {contractView === "contractUpload" && (
              <ContractsUpload
                component={
                  <TableComponent
                    currentPage={currentPage}
                    handlePagination={handlePagination}
                    columns={[
                      {
                        title: "Data File",
                        dataIndex: "dataFile",
                      },
                      {
                        title: "Date Uploaded",
                        dataIndex: "dateUploaded",
                      },
                      {
                        title: "Action",
                        dataIndex: "id",
                        render: (id, obj) => {
                          return (
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
                              disabled={
                                trackingStatus !== null &&
                                trackingStatus?.tracking.Status !== 1
                                  ? true
                                  : false
                              }
                              style={{
                                cursor:
                                  trackingStatus !== null &&
                                  trackingStatus?.tracking.Status !== 1
                                    ? "not-allowed"
                                    : "pointer",
                              }}
                              onClick={() => handleRemove(obj)}
                            >
                              Remove
                            </ButtonOutlined>
                          );
                        },
                      },
                    ]}
                  />
                }
                handlePreviewReport={handlePreviewReport}
                handleDownload={handleDownloadContractDetail}
              />
            )}
            {contractView === "anomalies" && (
              <ContractsAnomalies
                component={
                  <TableComponent
                    currentPage={currentPage}
                    handlePagination={handlePagination}
                    handleBack={handleBack}
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
                        title: "Project Code",
                        dataIndex: "Code",
                        sorter: (a, b) =>
                          a.Code !== null &&
                          a.Code?.length - b.Code !== null &&
                          b.Code?.length,
                      },
                      {
                        title: "Project Cycle",
                        dataIndex: "Id",
                        render: (tr, obj) => {
                          return obj.Tracking.Period;
                        },
                      },
                      {
                        title: "Contractor",
                        dataIndex: "Contractor",
                        sorter: (a, b) =>
                          a.Contractor !== null &&
                          a.Contractor?.length - b.Contractor !== null &&
                          b.Contractor?.length,
                      },

                      {
                        title: "Contract Amount",
                        dataIndex: "ContractSum",
                        sorter: (a, b) => a.ContractSum - b.ContractSum,
                        render: (ContractSum) => accountingFormat(ContractSum),
                        filters: extractAmountFilter(),
                        onFilter: (value, record) => {
                          return record.ContractSum === value;
                        },
                      },

                      {
                        title: "Sponsor",
                        dataIndex: "Sponsor",
                        sorter: (a, b) =>
                          a.Sponsor !== null &&
                          a.Sponsor?.length - b.Sponsor !== null &&
                          b.Sponsor?.length,
                        filters: extractSponsorFilter(),
                        onFilter: (value, record) => {
                          return record.Sponsor === value;
                        },
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
                              {obj.HasAnomaly === 0 ||
                              (obj.HasAnomaly === 1 &&
                                obj.IgnoreAnomaly === 1) ? null : (
                                <div
                                  className="tag_anomal"
                                  onClick={() => reviewAnomal(obj)}
                                >
                                  <span>Review Anomaly</span>
                                </div>
                              )}
                            </>
                          );
                        },
                      },
                    ]}
                  />
                }
                handleDownload={handleDownloadDirectorTemplate}
              />
            )}
            {contractView === "projectTitle" && (
              <ContractsProjectName
                component={
                  <TableComponent
                    currentPage={currentPage}
                    handlePagination={handlePagination}
                    handleBack={handleBack}
                    columns={[
                      {
                        title: "Project Title",
                        dataIndex: "Name",
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
                        title: "Project Code",
                        dataIndex: "Code",
                      },
                      {
                        title: "Project Cycle",
                        dataIndex: "Id",
                        render: (tr, obj) => {
                          return obj.Tracking.Period;
                        },
                      },
                      {
                        title: "Contractor",
                        dataIndex: "Contractor",
                      },

                      {
                        title: "Contract Amount",
                        dataIndex: "ContractSum",
                        render: (ContractSum) => accountingFormat(ContractSum),
                      },

                      {
                        title: "Sponsor",
                        dataIndex: "Sponsor",
                      },
                      {
                        title: "State",
                        dataIndex: "StateName",
                      },
                      {
                        title: "Constituency",
                        dataIndex: "ConstituencyName",
                      },
                      {
                        title: "Action",
                        dataIndex: "id",
                        render: (id, obj) => {
                          return (
                            <>
                              {obj.HasAnomaly === 0 ||
                              (obj.HasAnomaly === 1 &&
                                obj.IgnoreAnomaly === 1) ? null : (
                                <div
                                  className="tag_ignore"
                                  onClick={() => ignoreAllAnomal(obj)}
                                >
                                  <span>Ignore All</span>
                                </div>
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
          </Content>
          <LogoutModal />
        </MainContent>
      </Main>
    </ErrorComponent>
  );
};

export default ContractAndTenderUpload;
