import React, { useEffect, useState } from "react";
import HeaderComponent from "../../components/Header";
import { Container } from "../../styles/layout";
import { Text, Img, Box } from "../../components/Primitives";
import styled from "styled-components";
import colors from "../../theme/colors";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ErrorComponent } from "../../components/ErrorBoundry/errorComponent";
import {
  clearGlobalErrorMessage,
  clearGlobalSuccessMessage,
  fetchProjectTrackingId,
  setInitiateNewProject,
} from "../../services/global/action";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const WelcomeCardContainer = styled.section`
  padding-top: 160px;
`;
const WelcomeCardStyle = styled.section`
  background: #ffffff;
  border-radius: 6px;
  width: 60%;
  margin: auto;
  padding: 42px 32px;

  .card-container {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 1rem;
    margin-top: 4rem;

    .card-item {
      position: relative;
      height: 100%;
      cursor: pointer;

      .disabled-bg {
        position: absolute;
        background: rgba(255, 255, 255, 0.65);
        top: 0px;
        width: 100%;
        height: 100%;
        z-index: 10000;
      }
    }
  }

  @media (max-width: 1024px) {
    width: 85%;
  }
`;
const Welcome = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(true);
  const [cardLabel, setCardLabel] = useState("");

  const { trackingId, globalError, globalSuccess, trackingStatus, authUser } =
    useSelector((state) => state.global);

  useEffect(() => {
    if (globalError !== null || globalSuccess !== null) {
      setTimeout(() => dispatch(clearGlobalSuccessMessage()), 5000);
      setTimeout(() => dispatch(clearGlobalErrorMessage()), 5000);
    }
  }, [dispatch, globalSuccess, globalError]);

  useEffect(() => {
    if (trackingId !== null) {
      setLoaded(true);
      // means I am to check the status.
      const params = {
        id: trackingId,
      };
      dispatch(fetchProjectTrackingId(params, navigate));
    }
    // if (roleName === "CEPTG" && trackingId === null)
    else {
      // means they are initiating the project
      setLoaded(false);
    }
  }, [trackingId]);

  useEffect(() => {
    setLoaded(true);
    if (
      authUser !== null &&
      (authUser.roleName === "ADMIN" || authUser.roleName === "CEPTG")
    ) {
      if (
        trackingStatus !== null &&
        Object.keys(trackingStatus.tracking).length !== 0
      ) {
        const { Status } = trackingStatus.tracking;
        // 1 - tracking instance created
        if (Status !== 1) {
          setCardLabel("Continue");
          setLoaded(false);
        } else {
          setCardLabel("Initiate");
          setLoaded(false);
        }
      } else {
        setCardLabel("Initiate");
        setLoaded(false);
      }
    } else {
      setCardLabel("Continue");
      setLoaded(false);
    }
  }, [trackingStatus]);

  const handleInitiateProject = () => {
    // check the user role first.
    if (
      authUser !== null &&
      (authUser.roleName === "ADMIN" || authUser.roleName === "CEPTG")
    ) {
      navigate("/d/budget");
      // reset storedTrackingYeear: "" and trackingStatus object to null
      dispatch(
        setInitiateNewProject({
          storedTrackingYear: "",
          trackingId: null,
          trackingStatus: { tracking: {} },
        })
      );
    }
  };

  const handleContinueProject = () => {
    if (authUser !== null && authUser.roleName === "ADMIN") {
      navigate("/d/users");
    } else if (
      authUser !== null &&
      (authUser.roleName === "MDA" ||
        authUser.roleName.toLowerCase().includes("field") ||
        authUser.roleName.toLowerCase().split("-")[0].includes("field"))
    ) {
      navigate("/d/projects");
    } else if (authUser !== null && authUser.roleName === "CEPTG") {
      if (
        trackingStatus !== null &&
        Object.keys(trackingStatus.tracking).length !== 0
      ) {
        const { Status } = trackingStatus.tracking;
        // 0 - tracking  instance created
        // 1 - tracking instance started

        if (Status === 2) {
          navigate("/d/project-selection");
        } else if (Status === 3 || Status === 4 || Status === 5) {
          navigate("/d/project-selection");
          // 2- Budget(s) uploaded;
          //3 - executing agencies and constituency data uploaded
          //4 - project selected
          //5 - project selection saved and sent for review
          //6 - project selection reviewed, approved and finalised
        } else if (Status === 6 || Status === 7) {
          navigate("/d/contracts");
        } else if (Status > 7) {
          navigate("/d/projects");
        }
      }
    }
  };

  console.log(cardLabel);
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
      <Container minHeight="100vh">
        <HeaderComponent user={authUser} />

        {loaded ? (
          <Spin indicator={<LoadingOutlined />} />
        ) : (
          <WelcomeCardContainer>
            <WelcomeCardStyle>
              <Text as="h3">
                Welcome,{" "}
                {`${
                  authUser?.firstname !== "" ? authUser?.firstname : "Akande"
                } ${
                  authUser?.lastname !== "" ? authUser?.lastname : "Micheal"
                }`}
              </Text>

              <Box className="card-container">
                <div
                  className={[
                    "card-item",
                    // setCardLabel === "Initiate" ? "card-click" : "disable-click",
                  ].join(" ")}
                  onClick={handleInitiateProject}
                >
                  <Img
                    src={require("../../assets/images/welcome_1.svg").default}
                  />

                  <Box
                    position="absolute"
                    display="flex"
                    alignItems="center"
                    bottom="20px"
                    left="16px"
                    right="16px"
                  >
                    <Text
                      color={colors.modes.light.white}
                      fontSize={"18px"}
                      fontWeight={7}
                      lineHeight="25px"
                      letterSpacing={"-0.02em"}
                      flexBasis="180px"
                    >
                      Initiate New Project Tracking
                    </Text>
                    <Text marginLeft="10px">
                      <Img
                        src={
                          require("../../assets/images/arrow_right.svg").default
                        }
                      />
                    </Text>
                  </Box>
                  {cardLabel !== "Initiate" ? (
                    <div className="disabled-bg"></div>
                  ) : null}
                </div>

                <div
                  className={[
                    "card-item",
                    // cardLabel === "Continue" ? "disable-click" : "card-click",
                  ].join(" ")}
                  onClick={handleContinueProject}
                >
                  <Img
                    src={require("../../assets/images/welcome_2.svg").default}
                  />

                  <Box
                    position="absolute"
                    display="flex"
                    alignItems="center"
                    bottom="20px"
                    left="16px"
                    right="16px"
                  >
                    <Text
                      color={colors.modes.light.white}
                      fontSize={"18px"}
                      fontWeight={7}
                      lineHeight="25px"
                      letterSpacing={"-0.02em"}
                      // flexBasis="200px"
                    >
                      Continue Project Tracking
                    </Text>
                    <Text marginLeft="10px">
                      <Img
                        src={
                          require("../../assets/images/arrow_right.svg").default
                        }
                      />
                    </Text>
                  </Box>
                  {cardLabel !== "Continue" ? (
                    <div className="disabled-bg"></div>
                  ) : null}
                </div>
              </Box>
            </WelcomeCardStyle>
          </WelcomeCardContainer>
        )}
      </Container>
    </ErrorComponent>
  );
};

export default Welcome;
