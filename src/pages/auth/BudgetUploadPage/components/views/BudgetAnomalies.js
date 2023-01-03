import React from "react";
import { OtherContentContainer } from "../../../../../styles/layout";
import TableComponent from "../Table";

const BudgetAnomalies = ({component}) => {
  return (
    <OtherContentContainer padding={"17px 16px 0px 16px"} >
      {component}
    </OtherContentContainer>
  );
};

export default BudgetAnomalies;
