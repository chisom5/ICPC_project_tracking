import React, { useState, useId } from "react";
import { Container } from "../../../styles/layout";
import { MainContent, MiniHeaderStyle, Content } from "../../../styles/layout";
import TableComponent from "./components/Table";
import { useSelector, useDispatch } from "react-redux";
import {
  ProjectList,
  SupportingDocument,
  ProjectAnomalies,
  ProjectOverview,
  FieldReport,
  Anomalies,
} from "./components/views";
import { Img } from "../../../components/Primitives";
import { LogoutModal } from "../../../components/Modal";
import SVG from "react-inlinesvg";
import { Dropdown } from "antd";
import { setCurrentTab } from "../../../services/projects/action";

const Projects = () => {
  // const [role] = useState("CEPTG");

  const [role] = useState("MDA");
  const [currentPage, setCurrentPage] = useState(1);
  const { currentTab, anomalies_type } = useSelector((state) => state.projects);
  const id = useId();

  const dispatch = useDispatch();

  const handlePagination = (pagination) => {
    setCurrentPage(pagination.current);
  };
  const handleTabChange = (item) => {
    dispatch(setCurrentTab({ currentTab: item }));
  };
  return (
    <Container minHeight="100vh">
      <MiniHeaderStyle>
        <div className="title">
          {[
            "Project List",
            "Supporting Documents",
            "Anomalies",
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
        </div>
      </MiniHeaderStyle>
      <Content>
        {currentTab.includes("List") && (
          <ProjectList
            component={
              <TableComponent
                currentPage={currentPage}
                handlePagination={handlePagination}
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
                        </div>
                      );
                    },
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
                    title: "Executing Agency",
                    dataIndex: "excutingAgency",
                    sorter: (a, b) => a.projectCode - b.projectCode,
                  },
                  {
                    title: "Sector",
                    dataIndex: "sector",
                    sorter: (a, b) => a.sector - b.sector,
                  },
                  {
                    title: "State",
                    dataIndex: "state",
                    sorter: (a, b) => a.sector - b.sector,
                  },
                  {
                    title: "Constituency",
                    dataIndex: "constituency",
                    sorter: (a, b) => a.sector - b.sector,
                  },
                  {
                    title: "Action",
                    dataIndex: "id",
                    render: (id, obj) => {
                      return <>{/* buttons here */}</>;
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
          />
        )}
        {currentTab.includes("Anomalies") && (
          <Anomalies>
            {anomalies_type.includes("Anomalies") && (
              <ProjectAnomalies
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
                                      <p style={{ cursor: "pointer" }}>
                                        Download
                                      </p>
                                    ),
                                  },
                                  {
                                    key: "2",
                                    label: (
                                      <p style={{ cursor: "pointer" }}>
                                        Remove
                                      </p>
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
              />
            )}
            {anomalies_type.includes("Overview") && <ProjectOverview />}
          </Anomalies>
        )}
        {currentTab.includes("Field Reports") && (
          <FieldReport
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
          />
        )}
      </Content>
      <LogoutModal />
    </Container>
  );
};

export default Projects;
