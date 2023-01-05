import React, { useState } from "react";
import { MainContent, MiniHeaderStyle, Content } from "../../../styles/layout";
import TableComponent from "./components/Table";
import { useSelector, useDispatch } from "react-redux";
import { ProjectSelectionView } from "./components/views";
import { Img } from "../../../components/Primitives";

const ProjectSelection = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();

  const handlePagination = (pagination) => {
    setCurrentPage(pagination.current);
  };

  return (
    <MainContent>
      <MiniHeaderStyle>
        <p className="title">Project Selection</p>
      </MiniHeaderStyle>
      <Content>
        <ProjectSelectionView
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
                
              ]}
            />
          }
        />
      </Content>
    </MainContent>
  );
};

export default ProjectSelection;
