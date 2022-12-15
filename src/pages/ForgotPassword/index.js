import React from "react";
import styled from "styled-components";
import colors from "../../theme/colors";
import {  Main, Box, Img } from "../../components/Primitives";
import { HomeHeader, FormComponent } from "./components";
import { useSelector } from "react-redux";

const ForgotPContainer = styled.div`
  width: 100%;
  height: 100vh;
  overflow-y: auto;

  .row {
    background: ${colors.modes.light.grayShade};
    width: 80%;
    height: auto;
    margin: 0px auto;
    padding: 45px 40px 40px 40px;
    position: relative;

    .col {
      padding: 0px;
    }
  }
  .floating-formImg {
    position: relative;
    left: -120px;
    min-width: 120%;
  }

  .col-md-6 {
  }
`;

const ForgotPassword = () => {
  const { page } = useSelector((state) => state.forgetP);
  return (
    <ForgotPContainer>
      <HomeHeader />

      <Main className="row">
        <Box className="col">
          <Box className="floating-formImg">
            {page === "forgetP1" && (
              <Img src={require("../../assets/images/forgotP1.svg").default} />
            )}
            {page === "forgetP2" && (
              <Img src={require("../../assets/images/forgotP2.svg").default} />
            )}
          </Box>
        </Box>

        <Box className="col-md-5 col">
          <FormComponent />
        </Box>
      </Main>
    </ForgotPContainer>
  );
};

export default ForgotPassword;
