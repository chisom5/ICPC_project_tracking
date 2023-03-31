import React from "react";
import styled from "styled-components";
import SVG from "react-inlinesvg";
import colors from "../../../../theme/colors";
import { SearchInput } from "../../../../components/TextField";
import { Text, Img, Box } from "../../../../components/Primitives";
import { useNavigate } from "react-router-dom";

const HeaderStyle = styled.header`
  background: #fff;
  display: flex;
  justify-content: space-between;
  padding: 10px 15px;
`;

const SocialIconGroup = styled.div`
  display: flex;
  margin-left: 12px;
`;

const HomeHeader = () => {
  const navigate = useNavigate();

  return (
    <HeaderStyle>
      <SVG src={require("../../../../assets/images/logo.svg").default} />

      <div>
        <Box display='flex'>
          <SearchInput
            border="1px solid #D3D5D7"
            borderRadius="3px"
            background="#F4F4F5"
            placeholder="Search"
          />
          <SocialIconGroup>
            <Img
              src={require("../../../../assets/images/social-icons.svg").default}
            />
          </SocialIconGroup>
        </Box>
        <Text
          display="flex"
          justifyContent="flex-end"
          fontSize={2}
          lineHeight="24px"
          fontWeight={4}
          mr={'1rem'}
          style={{ cursor: "pointer" }}
          color={colors.modes.light.lightGrayScale}
          onClick={() => navigate("/signIn")}
        >
          Login
        </Text>
      </div>
    </HeaderStyle>
  );
};
export default HomeHeader;
