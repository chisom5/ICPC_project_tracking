import React, { useEffect } from "react";
import styled from "styled-components";
import colors from "../../theme/colors";
import { Main, Box, Img } from "../../components/Primitives";
import { HomeHeader, FormComponent } from "./components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ErrorComponent } from "../../components/ErrorBoundry/errorComponent";
import {
  clearGlobalErrorMessage,
  clearGlobalSuccessMessage,
  dismissLogoutModal,
} from "../../services/global/action";

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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authUser, globalError, globalSuccess } = useSelector(
    (state) => state.global
  );

  useEffect(() => {
    if (globalError !== null || globalSuccess !== null) {
      setTimeout(() => dispatch(clearGlobalSuccessMessage()), 5000);
      setTimeout(() => dispatch(clearGlobalErrorMessage()), 5000);
    }
  }, [dispatch, globalSuccess, globalError]);

  const initialState = {
    isAuthenticating: false,
    loggingOut: false,
    successModal: false,
    isFetching: false,
    logout: false,
    logoutIcon: false,
    globalError: null,
    globalSuccess: null,
    authUser: null,
  };

  useEffect(() => {
    // reset state here.
    dispatch(dismissLogoutModal(initialState));
  }, []);

  const handleClearErrorMessage = () => {
    dispatch(clearGlobalErrorMessage());
  };
  const handleClearSuccessMessage = () => {
    dispatch(clearGlobalSuccessMessage());
  };

  return (
    <ErrorComponent
      error={globalError}
      success={globalSuccess}
      clearErrorMessage={handleClearErrorMessage}
      clearSuccessMessage={handleClearSuccessMessage}
    >
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
    </ErrorComponent>
  );
};

export default SignIn;
