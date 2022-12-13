import React from "react";
import styled from "styled-components";
import SVG from "react-inlinesvg";
import colors from "../../theme/colors";
import { Text, Box } from "../Primitives";
import { useNavigate } from "react-router-dom";

const HeaderStyle = styled.header`
  width: 100%;
  height: 70px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
  border-bottom: 1px solid #e8e9eb;

  .logo {
    max-width: 250px;
  }
`;

const Header = () => {
  const navigate = useNavigate();

  return (
    <HeaderStyle>
      <SVG
        src={require("../../assets/images/logo.svg").default}
        className="logo"
      />

      <Text
        fontSize={"24px"}
        color={colors.modes.light.mainBlack}
        lineHeight="25px"
        fontWeight={700}
      >
        Project Tracking System
      </Text>
      <Box display="flex" alignItems="center">
        {/* notification */}
        <Text as="p">
          {/* img */}
          <Text>Notifications</Text>
        </Text>
        <Box></Box>
      </Box>
    </HeaderStyle>
  );
};
export default Header;
