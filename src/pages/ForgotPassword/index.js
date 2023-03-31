import React, { useEffect } from "react";
import styled from "styled-components";
import colors from "../../theme/colors";
import { ErrorComponent } from "../../components/ErrorBoundry/errorComponent";
import { Main, Box, Img } from "../../components/Primitives";
import { HomeHeader, FormComponent } from "./components";
import {
  clearErrorMessage,
  clearSuccessMessage,
} from "../../services/forgetPassword/action";
import {
  clearGlobalErrorMessage,
  clearGlobalSuccessMessage,
} from "../../services/global/action";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from 'react-router-dom';
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { page, error, success, successResetP } = useSelector((state) => state.forgetP);
  const { globalError, globalSuccess } = useSelector((state) => state.global);

  useEffect(() => {
    if (error !== null || success !== null) {
      setTimeout(() => dispatch(clearSuccessMessage()), 5000);
      setTimeout(() => dispatch(clearErrorMessage()), 5000);
    }
    if (globalError !== null || globalSuccess !== null) {
      setTimeout(() => dispatch(clearGlobalSuccessMessage()), 5000);
      setTimeout(() => dispatch(clearGlobalErrorMessage()), 5000);
    }
  }, [dispatch, success, error]);

  useEffect(() => {
    if (successResetP !== null) {
      navigate("/signIn");
    }
  }, [successResetP]);
  const handleClearErrorMessage = () => {
    if (error !== null) {
      dispatch(clearErrorMessage());
    } else if (globalError !== null) {
      dispatch(clearGlobalErrorMessage());
    }
  };
  const handleClearSuccessMessage = () => {
    if (success !== null) {
      dispatch(clearSuccessMessage());
    } else if (globalSuccess !== null) {
      dispatch(clearGlobalSuccessMessage());
    }
  };
  return (
    <ErrorComponent
      error={error || globalError}
      success={success || globalSuccess}
      clearErrorMessage={handleClearErrorMessage}
      clearSuccessMessage={handleClearSuccessMessage}
    >
      <ForgotPContainer>
        <HomeHeader />

        <Main className="row">
          <Box className="col">
            <Box className="floating-formImg">
              {page === "forgetP1" && (
                <Img
                  src={require("../../assets/images/forgotP1.svg").default}
                />
              )}
              {page === "forgetP2" && (
                <Img
                  src={require("../../assets/images/forgotP2.svg").default}
                />
              )}
            </Box>
          </Box>

          <Box className="col-md-5 col">
            <FormComponent />
          </Box>
        </Main>
      </ForgotPContainer>
    </ErrorComponent>
  );
};

export default ForgotPassword;
