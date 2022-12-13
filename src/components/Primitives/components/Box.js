import React from "react";
import styled from "styled-components";
import { base } from "../../../styles/baseStyle";

const BoxWrapper = styled.div`
  ${base}
`;

const Box = ({ children, ...props }) => {
  return <BoxWrapper {...props}> {children}</BoxWrapper>;
};

export default Box;
