import React, { useState } from "react";
import { MainContent, MiniHeaderStyle, Content } from "../../../styles/layout";
import TableComponent from "./components/Table";

import { BudgetUpload, BudgetAnomalies } from "./components/views";

const BudgetuploadPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentView, setCurrentView] = useState("budget");

  const handlePagination = (pagination) => {
    setCurrentPage(pagination.current);
  };

  const handlePreviewReport = () => {
    setCurrentView("anomalies");
    // Budget Anomalies
  };

  const handleBack = () => {
    if (currentView === "anomalies") setCurrentView("budget");
    else if (currentView === "projectTitle") setCurrentView("anomalies");
  };
  return (
    <MainContent>
      <MiniHeaderStyle>
        {currentView === "budget" ? (
          <p className="title">Budget / Project File Upload</p>
        ) : currentView === "anomalies" ? (
          <p className="title">Budget Anomalies</p>
        ) : null}
      </MiniHeaderStyle>
      <Content>
        {currentView === "budget" && (
          <BudgetUpload
            component={
              <TableComponent
                currentView={currentView}
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
                currentView={currentView}
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
