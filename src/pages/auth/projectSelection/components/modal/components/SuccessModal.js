import { Modal } from "antd";
import React from "react";
import { Box, Text } from "../../Primitives";
import Button from "../../Button";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import SVG from "react-inlinesvg";
import { useNavigate } from "react-router-dom";
import {
  openModalSuccess,
  resetState,
} from "../../../containers/IntroductionLetter/reduxFunction/action";

const StyledText = styled(Text)`
  font-family: "Lato";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  text-align: center;
`;

const StyledContent = styled(Box)`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(3, max-content);
`;

const SuccessModal = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { successModal } = useSelector((state) => state.introLetter);

  const backtoHomePage = () => {
    props.setCurrentStep(0);
    sessionStorage.setItem("current_step", 0);
    dispatch(resetState({ requestCreated: null }));
    sessionStorage.removeItem("submitted");
    // intro letter
    sessionStorage.removeItem("IntroLetterRecipientAns");
    // reference letter
    sessionStorage.removeItem("filePayload")
    sessionStorage.removeItem("RequestRolesAns");
    sessionStorage.removeItem("RequestRefRecipientAns");
    sessionStorage.removeItem("RequestRolesQues");

    dispatch(openModalSuccess({ successModal: false }));
    navigate("/home");
  };

  return (
    <Modal
      visible={successModal}
      //   onCancel={() => dispatch(setAuth({ logout: false }))}
      closable={false}
      bodyStyle={{ padding: "20px 30px 45px" }}
      footer={null}
      width="400px"
    >
      <StyledContent>
        <Box justifySelf="center" mt={4} mb={4}>
          <SVG
            src={require("../../../assets/images/svg/success-icon.svg").default}
          />
        </Box>
        <Text
          as="p"
          mb={"12px"}
          color="#100711"
          fontWeight={6}
          lineHeight="19px"
          fontSize={2}
          textAlign={"center"}
        >
          Request Submitted Successfully!
        </Text>

        <StyledText>
          You will be notified as soon as your request is approved and the
          letter is available for download.
        </StyledText>

        <Box display="flex" alignItems="center" justifyContent="center">
          <Button
            width="auto"
            height="auto"
            m={0}
            mt={3}
            py={"5px"}
            px={"10px"}
            fontSize={12}
            fontWeight={5}
            onClick={() => backtoHomePage()}
            color="#005EB8"
            border="1px solid #005EB8"
            bg="transparent"
            borderRadius="4px"
            style={{ textTransform: "none" }}
          >
            Back to Homepage
          </Button>
        </Box>
      </StyledContent>
    </Modal>
  );
};

export default SuccessModal;
