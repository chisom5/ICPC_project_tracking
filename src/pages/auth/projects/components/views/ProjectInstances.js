import React, { useState } from "react";
import {
  OtherContentContainer,
  TableWrapper,
} from "../../../../../styles/layout";
import { Box, Label } from "../../../../../components/Primitives";
import { ButtonOutlined } from "../../../../../components/Button";
import update from "immutability-helper";
import colors from "../../../../../theme/colors";
import { useDispatch, useSelector } from "react-redux";


const ProjectInstances = ({ component }) => {

  return (
    <OtherContentContainer>
      <TableWrapper padding={"17px 16px 0px 16px"}>{component}</TableWrapper>
    </OtherContentContainer>
  );
};

export default ProjectInstances;
