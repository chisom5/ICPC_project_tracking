import React from "react";
import { OtherContentContainer } from "../../../../../styles/layout";
import colors from "../../../../../theme/colors";
import ProjectWarning from "../projectWarning";

const BudgetProjectName = ({ component }) => {
  return (
    <OtherContentContainer
      padding={"17px 16px 0px 16px"}
      bg={colors.modes.light.white}
      borderRadius="10px"
    >
      {component}

      <ProjectWarning />
    </OtherContentContainer>
  );
};

export default BudgetProjectName;
