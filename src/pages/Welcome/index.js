import React, { useState } from "react";
import HeaderComponent from "../../components/Header";
import { Container } from "../../styles/layout";
import { Text, Img, Box } from "../../components/Primitives";
import styled from "styled-components";
import colors from "../../theme/colors";
import { useNavigate } from "react-router-dom";


const WelcomeCardContainer = styled.section`
padding-top: 160px;
`
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

    .card-click {
      cursor: pointer;
    }
    .disable-click {
      cursor: not-allowed;
    }
    .card-item {
      position: relative;
      height: 100%;

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
`;
const Welcome = () => {
  const navigate = useNavigate();
  // const [role] = useState("CEPTG");
  const [role] = useState('MDA')

  const handleInitiateProject = () => {
    if (role === "CEPTG") {
      navigate("/d/budget");
    }else if(role === 'MDA'){
      navigate("/d/projects")
    }
  };
  const handleContinueProject = () => {
    console.log("continue");
  };
  return (
    <Container minHeight="100vh">
      <HeaderComponent role={role} />
      {/*  */}
      <WelcomeCardContainer>
        <WelcomeCardStyle>
          <Text as="h3">Welcome, Akande Micheal</Text>

          <Box className="card-container">
            <div
              className={[
                "card-item",
                role === "CEPTG" ? "card-click" : "disable-click",
              ].join(" ")}
              onClick={handleInitiateProject}
            >
              <Img src={require("../../assets/images/welcome_1.svg").default} />

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
                    src={require("../../assets/images/arrow_right.svg").default}
                  />
                </Text>
              </Box>
              {role !== "CEPTG" ? <div className="disabled-bg"></div> : null}
            </div>

            <div
              className={[
                "card-item",
                role === "CEPTG" ? "disable-click" : "card-click",
              ].join(" ")}
              onClick={handleInitiateProject}
            >
              <Img src={require("../../assets/images/welcome_2.svg").default} />

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
                    src={require("../../assets/images/arrow_right.svg").default}
                  />
                </Text>
              </Box>
              {role === "CEPTG" ? <div className="disabled-bg"></div> : null}
            </div>
          </Box>
        </WelcomeCardStyle>
      </WelcomeCardContainer>
    </Container>
  );
};

export default Welcome;
