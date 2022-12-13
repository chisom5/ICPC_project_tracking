import React from "react";
import styled from "styled-components";
// import SVG from "react-inlinesvg";
import colors from "../../theme/colors";
import { Text, Main, Img, Box } from "../../components/Primitives";
import { HomeHeader, UserManual } from "./components";

const HomeContainer = styled.div`
  width: 100%;
  height: 100vh;
  overflow-y: auto;

  .home-card {
    min-height: 40vh;
  }

  .home-bg-inner {
    position: relative;
  }
  .home-bg-wrapper {
    position: relative;

    .bg-img {
      height: 100%;
    }
    .home-img-overlay {
      position: absolute;
      top: 0px;
    }
  }

  .home-text-wrapper {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    display: flex;
    align-items: center;
  }
`;

const Homepage = () => {
  return (
    <HomeContainer>
      <HomeHeader />

      <Main className="home-card">
        <div className="home-bg-inner">
          <div className="home-bg-wrapper">
            <Img
              src={require("../../assets/images/home_bg.jpg")}
              alt=""
              className="bg-img"
            />
            <div className="home-img-overlay">
              <Img
                src={require("../../assets/images/home_overlay.svg").default}
                alt=""
              />
            </div>
          </div>

          <Box className="home-text-wrapper" pl={"3rem"}>
            <Box flex={1}>
              <Text
                as="p"
                color={colors.modes.light.white}
                textAlign="justify"
                fontWeight={700}
                lineHeight="25px"
                fontSize={"36px"}
                mb={"2.18rem"}
              >
                {" "}
                Project Tracking System
              </Text>

              <Box
                fontWeight={300}
                color={colors.modes.light.white}
                lineHeight="60px"
                fontSize={3}
                textAlign="justify"
              >
                <Text as="p">
                  Track and investigate projects from conception to execution.
                </Text>

                <div style={{ lineHeight: "22px" }}>
                  <Text as="p">
                    Create link analysis to show probable connections between
                    entities such beneficial ownership of companies.
                  </Text>
                </div>
                <Text as="p">Perform project tracking analysis.</Text>
              </Box>
            </Box>

            <Box flex={1} display='flex' justifyContent='center'>
              <UserManual />
            </Box>
          </Box>
        </div>
      </Main>
    </HomeContainer>
  );
};

export default Homepage;
