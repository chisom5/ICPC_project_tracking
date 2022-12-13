import React, { useEffect } from "react";
import styled from "styled-components";
import SVG from "react-inlinesvg";
import colors from "../../theme/colors";
import { Text, Main, Box, Img } from "../../components/Primitives";
import { HomeHeader, FormComponent } from "./components";
import { useDispatch } from "react-redux";
import {togglePage} from '../../services/forgetPassword/action';

const SignContainer = styled.div`
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

const SignIn = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(togglePage({ page: "forgetP1" }));
  }, []);
  return (
    <SignContainer>
      <HomeHeader />

      <Main className="row">
        <Box className="col">
          <Box className="floating-formImg">
            <Img src={require("../../assets/images/signIn.svg").default} />
          </Box>
        </Box>

        <Box className="col-md-5 col">
          <FormComponent />
        </Box>
      </Main>
    </SignContainer>
  );
};

export default SignIn;
