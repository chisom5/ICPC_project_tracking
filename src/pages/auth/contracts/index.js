import React, { useState } from "react";
import { MainContent, MiniHeaderStyle, Content } from "../../../styles/layout";
import TableComponent from "./components/Table";
import { useSelector, useDispatch } from "react-redux";
import {
  ContractsUpload,
  ContractsAnomalies,
  ContractsProjectName,
} from "./components/views";
import { setCurrentView } from "../../../services/global/action";
import { Dropdown } from "antd";
import { Img } from "../../../components/Primitives";
import SVG from 'react-inlinesvg';

const ContractAndTenderUpload = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { currentView, SelectedAnomalData } = useSelector(
    (state) => state.global
  );
  const dispatch = useDispatch();

  const handlePagination = (pagination) => {
    setCurrentPage(pagination.current);
  };

  const handlePreviewReport = () => {
    dispatch(setCurrentView({ currentView: "anomalies" }));
    // Budget Anomalies
  };

  const handleBack = () => {
    if (currentView === "anomalies")
      dispatch(setCurrentView({ currentView: "budget" }));
    else if (currentView === "projectTitle")
      dispatch(setCurrentView({ currentView: "anomalies" }));
  };
  const reviewAnomal = (obj) => {
    console.log(obj);
    dispatch(
      setCurrentView({ currentView: "projectTitle", SelectedAnomalData: [obj] })
    );
  };

  return (
    <MainContent>
      <MiniHeaderStyle>
        {currentView === "budget" ? (
          <p className="title">Contracts & Tender Evaluation Schedule Upload</p>
        ) : currentView === "anomalies" ? (
          <p className="title">Contracts Anomalies</p>
        ) : currentView === "projectTitle" ? (
          // here the tabs
          <div className="title">
            <span className="header_past_title">Contracts Anomalies</span>{" "}
            <p className="header_current_title">
              {SelectedAnomalData[0]?.projectTitle}
            </p>
            <span className="current_title_btab contract_tab_left"></span>
          </div>
        ) : null}
      </MiniHeaderStyle>
      <Content>
        {currentView === "budget" && (
          <ContractsUpload
            component={
              <TableComponent
                currentPage={currentPage}
                handlePagination={handlePagination}
                columns={[
                  {
                    title: "S/N",
                    dataIndex: "id",
                    sorter: (a, b) => a.id - b.id,
                  },
                  {
                    title: "Data File",
                    dataIndex: "dataFile",
                    sorter: (a, b) => a.dataFile - b.dataFile,
                  },
                  {
                    title: "Date Uploaded",
                    dataIndex: "budgetYear",
                    sorter: (a, b) => a.budgetYear - b.budgetYear,
                  },
                  {
                    title: "Action",
                    dataIndex: "id",
                    render: (id, obj) => {
                      return (
                        <Dropdown
                          menu={{
                            items: [
                              {
                                key: "1",
                                label: (
                                  <p style={{ cursor: "pointer" }}>Download</p>
                                ),
                              },
                              {
                                key: "2",
                                label: (
                                  <p style={{ cursor: "pointer" }}>Remove</p>
                                ),
                              },
                            ],
                          }}
                          trigger={["click"]}
                        >
                          <div className="table_action">
                            <SVG
                              src={
                                require("../../../assets/images/table-action.svg")
                                  .default
                              }
                              alt="action"
                            />
                          </div>
                        </Dropdown>
                      );
                    },
                  },
                ]}
              />
            }
            handlePreviewReport={handlePreviewReport}
          />
        )}
        {currentView === "anomalies" && (
          <ContractsAnomalies
            component={
              <TableComponent
                currentPage={currentPage}
                handlePagination={handlePagination}
                handleBack={handleBack}
                columns={[
                  {
                    title: "Project Title",
                    dataIndex: "projectTitle",
                    sorter: (a, b) => a.projectTitle - b.projectTitle,
                    render: (projectTitle, obj) => {
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
                    sorter: (a, b) => a.projectCode - b.projectCode,
                  },
                  {
                    title: "Project Type",
                    dataIndex: "projectType",
                    sorter: (a, b) => a.projectType - b.projectType,
                  },

                  {
                    title: "Budget Amount",
                    dataIndex: "budgetAmount",
                    sorter: (a, b) => a.budgetAmount - b.budgetAmount,
                  },

                  {
                    title: "Sector",
                    dataIndex: "sector",
                    sorter: (a, b) => a.sector - b.sector,
                  },
                  {
                    title: "Action",
                    dataIndex: "id",
                    render: (id, obj) => {
                      return (
                        <>
                          {obj.errorAnomaly && (
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
          />
        )}
        {currentView === "projectTitle" && (
          <ContractsProjectName
            component={
              <TableComponent
                currentPage={currentPage}
                handlePagination={handlePagination}
                handleBack={handleBack}
                columns={[
                  {
                    title: "Project Title",
                    dataIndex: "projectTitle",
                    sorter: (a, b) => a.projectTitle - b.projectTitle,
                    render: (projectTitle, obj) => {
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
                    sorter: (a, b) => a.projectCode - b.projectCode,
                  },
                  {
                    title: "Project Type",
                    dataIndex: "projectType",
                    sorter: (a, b) => a.projectType - b.projectType,
                  },

                  {
                    title: "Budget Amount",
                    dataIndex: "budgetAmount",
                    sorter: (a, b) => a.budgetAmount - b.budgetAmount,
                  },

                  {
                    title: "Sector",
                    dataIndex: "sector",
                    sorter: (a, b) => a.sector - b.sector,
                  },
                  {
                    title: "Action",
                    dataIndex: "id",
                    render: (id, obj) => {
                      return (
                        <>
                          {obj.errorAnomaly && (
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
          />
        )}
      </Content>
    </MainContent>
  );
};

export default ContractAndTenderUpload;
