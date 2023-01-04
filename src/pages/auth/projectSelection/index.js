import React, { useState } from "react";
import { MainContent, MiniHeaderStyle, Content } from "../../../styles/layout";
// import TableComponent from "./components/Table";
import { useSelector, useDispatch } from "react-redux";
// import {
//   BudgetUpload,
//   BudgetAnomalies,
//   BudgetProjectName,
// } from "./components/views";

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
      <Content></Content>
    </MainContent>
  );
};

export default ProjectSelection;
