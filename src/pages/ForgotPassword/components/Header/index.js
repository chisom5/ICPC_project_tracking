import React from "react";
import styled from "styled-components";
import SVG from "react-inlinesvg";

const HeaderStyle = styled.header`
  background: #fff;
  display: flex;
  justify-content: space-between;
  padding: 10px 15px;
`;

const HomeHeader = () => {
  return (
    <HeaderStyle>
      <SVG src={require("../../../../assets/images/logo.svg").default} />
    </HeaderStyle>
  );
};
export default HomeHeader;
