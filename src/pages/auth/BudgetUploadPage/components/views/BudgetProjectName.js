import React from "react";
import { OtherContentContainer } from "../../../../../styles/layout";
import ProjectWarning from "../projectWarning";
import colors from '../../../../../theme/colors';

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
