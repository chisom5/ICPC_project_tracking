import React, { useState } from "react";
import { MainContent, MiniHeaderStyle, Content } from "../../../styles/layout";
import TableComponent from "./components/Table";
import { useSelector, useDispatch } from "react-redux";
import {
  BudgetUpload,
  BudgetAnomalies,
  BudgetProjectName,
} from "./components/views";
import { setCurrentView } from "../../../services/global/action";

const BudgetuploadPage = () => {
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
  return (
    <MainContent>
      <MiniHeaderStyle>
        {currentView === "budget" ? (
          <p className="title">Budget / Project File Upload</p>
        ) : currentView === "anomalies" ? (
          <p className="title">Budget Anomalies</p>
        ) : currentView === "projectTitle" ? (
          // here the tabs
          <div className="title">
            <span className="header_past_title">Budget Anomalies</span>{" "}
            <p className="header_current_title">{SelectedAnomalData[0]?.projectTitle}</p>
            <span className="current_title_btab"></span>
          </div>
        ) : null}
      </MiniHeaderStyle>
      <Content>
        {currentView === "budget" && (
          <BudgetUpload
            component={
              <TableComponent
                currentPage={currentPage}
                handlePagination={handlePagination}
              />
            }
            handlePreviewReport={handlePreviewReport}
          />
        )}
        {currentView === "anomalies" && (
          <BudgetAnomalies
            component={
              <TableComponent
                currentPage={currentPage}
                handlePagination={handlePagination}
                handleBack={handleBack}
              />
            }
          />
        )}
        {currentView === "projectTitle" && (
          <BudgetProjectName
            component={
              <TableComponent
                currentPage={currentPage}
                handlePagination={handlePagination}
                handleBack={handleBack}
              />
            }
          />
        )}
      </Content>
    </MainContent>
  );
};

export default BudgetuploadPage;
