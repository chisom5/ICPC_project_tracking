import React, { useState } from "react";
import {
  OtherContentContainer,
  TableWrapper,
} from "../../../../../styles/layout";
import { Box, Label } from "../../../../../components/Primitives";
import update from "immutability-helper";
// import colors from "../../../../../theme/colors";

const ProjectOverview = ({ component }) => {
  return (
    <OtherContentContainer>
      <TableWrapper padding={"17px 16px 0px 16px"}>{component}</TableWrapper>
    </OtherContentContainer>
  );
};

export default ProjectOverview;
