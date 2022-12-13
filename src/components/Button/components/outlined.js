import React from "react";
import { variant } from "styled-system";
import styled from "styled-components";
import { base } from "../../../styles/baseStyle";

const StyledBtnOutlined = styled("button")`
  outline: 0;
  background: ${(props) => (props.bg ? props.bg : "transparent")};
  border: ${(props) => `1px solid ${props.borderColor}`};
  text-align: center;
  line-height: 1.5;
  vertical-align: middle;
  text-decoration: none;

  // &:disabled {
  //   opacity: 0.8,
  //   cursor: "not-allowed",
  // },

  ${base}
`;

StyledBtnOutlined.defaultProps = {
  p: 1,
  borderRadius: 3,
  display: "inline-block",
};

const ButtonOutlined = ({ children, ...props }) => {
  return <StyledBtnOutlined {...props}>{children}</StyledBtnOutlined>;
};

export default ButtonOutlined;
