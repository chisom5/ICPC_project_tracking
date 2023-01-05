import { Modal } from "antd";
import React from "react";
import { Box, Text } from "../../Primitives";
import Button from "../../Button";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import SVG from "react-inlinesvg";
import { useNavigate } from "react-router-dom";
import { openModalRequestApproved } from "../../../containers/Landing/reduxFunction/action";

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

const RequestApprovedModal = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { requestApprove } = useSelector((state) => state.home);

  return (
    <Modal
      visible={requestApprove}
      onCancel={() =>
        dispatch(openModalRequestApproved({ requestApprove: false }))
      }
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
          Request Approved!
        </Text>

        <StyledText>
          The generated letter is now available for download.
        </StyledText>
      </StyledContent>
    </Modal>
  );
};

export default RequestApprovedModal;
