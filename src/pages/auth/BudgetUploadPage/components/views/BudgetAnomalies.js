import React from "react";
import { OtherContentContainer } from "../../../../../styles/layout";
import colors from '../../../../../theme/colors';

const BudgetAnomalies = ({component}) => {
  return (
    <OtherContentContainer padding={"17px 16px 0px 16px"} bg={colors.modes.light.white}
    borderRadius="10px">
      {component}
    </OtherContentContainer>
  );
};

export default BudgetAnomalies;
