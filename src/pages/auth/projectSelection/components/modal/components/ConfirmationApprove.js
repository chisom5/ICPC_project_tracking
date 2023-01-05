import { Modal, Spin } from "antd";
import React, { useEffect } from "react";
import { Box, Text } from "../../Primitives";
import Button from "../../Button";
import styled from "styled-components";
import { LoadingOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import SVG from "react-inlinesvg";
import { useNavigate } from "react-router-dom";
import {
  openModalRequestApproved,
  openModalConfirmApprove,
  handleApproveRequestForEmbassy,
  handleApproveRequestForBank,
  handleApproveRequestForOtherOrg,
  handleApproveRequestForImmgration,
  handleApproveRequestForWork,
} from "../../../containers/Landing/reduxFunction/action";

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

const ConfirmationSuccess = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { confirmApprove, letterDetails, isApproving, actionedApproved } =
    useSelector((state) => state.home);

  const handleYesButton = () => {
    handleExactApproveAction();
  };

  useEffect(() => {
    if (actionedApproved !== null) {
      dispatch(openModalConfirmApprove({ confirmApprove: false }));
      dispatch(openModalRequestApproved({ requestApprove: true }));
    }
  }, [actionedApproved]);

  const handleExactApproveAction = () => {
    switch (letterDetails.type) {
      case "An Embassy":
      case "Embassy":
        dispatch(
          handleApproveRequestForEmbassy({ id: letterDetails?.id }, navigate)
        );
        break;

      case "Bank":
        dispatch(
          handleApproveRequestForBank({ id: letterDetails?.id }, navigate)
        );
        break;

      case "OtherOrganisation":
        dispatch(
          handleApproveRequestForOtherOrg({ id: letterDetails?.id }, navigate)
        );
        break;

      case "Immigration":
        dispatch(
          handleApproveRequestForImmgration({ id: letterDetails?.id }, navigate)
        );
        break;

      case "Work":
        dispatch(
          handleApproveRequestForWork({ id: letterDetails?.id }, navigate)
        );
        break;

      default:
        return;
    }
  };
  return (
    <Modal
      visible={confirmApprove}
      onCancel={() =>
        dispatch(openModalConfirmApprove({ confirmApprove: false }))
      }
      closable={false}
      bodyStyle={{ padding: "20px 30px 45px" }}
      footer={null}
      width="400px"
    >
      <StyledContent>
        <Box justifySelf="center" mt={4} mb={4}>
          <SVG
            src={require("../../../assets/images/svg/questionMark.svg").default}
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
          Are you sure you want to approve this request?
        </Text>

        <StyledText>This action cannot be undone</StyledText>

        <Box display="flex" alignItems="center" justifyContent="center">
          <Button
            width="auto"
            height="auto"
            m={0}
            mt={3}
            mr={4}
            py={"5px"}
            px={"10px"}
            fontSize={12}
            fontWeight={5}
            color="#403941"
            bg="#E7E6E7"
            borderRadius="4px"
            style={{ textTransform: "none" }}
            onClick={() =>
              dispatch(openModalConfirmApprove({ confirmApprove: false }))
            }
          >
            No
          </Button>

          <Button
            width="auto"
            height="auto"
            m={0}
            mt={3}
            py={"5px"}
            px={"10px"}
            fontSize={12}
            fontWeight={5}
            color="#ffffff"
            bg="#005EB8"
            borderRadius="4px"
            style={{ textTransform: "none" }}
            onClick={() => handleYesButton()}
          >
            {isApproving ? (
              <div style={{ display: "flex", alignItems: "center" }}>
                <Spin size="small" indicator={<LoadingOutlined />} />{" "}
                <Text ml={2}>Loading...</Text>
              </div>
            ) : (
              "Yes, Approve"
            )}
          </Button>
        </Box>
      </StyledContent>
    </Modal>
  );
};

export default ConfirmationSuccess;
