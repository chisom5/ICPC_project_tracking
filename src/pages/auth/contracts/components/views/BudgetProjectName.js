import React from "react";
import { OtherContentContainer } from "../../../../../styles/layout";
import ProjectWarning from "../projectWarning";

const BudgetProjectName = ({ component }) => {
  return (
    <OtherContentContainer padding={"17px 16px 0px 16px"}>
      {component}

      <ProjectWarning />
    </OtherContentContainer>
  );
};

export default BudgetProjectName;
