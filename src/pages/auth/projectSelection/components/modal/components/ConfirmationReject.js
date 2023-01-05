import { Modal, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { Box, Text, Label } from "../../Primitives";
import Button from "../../Button";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";
import { TextAreaInput } from "../../TextField";
import { useNavigate } from "react-router-dom";
import {
  openModalRequestRejected,
  openModalConfirmReject,
  handleRejectRequestForEmbassy,
  handleRejectRequestForBank,
  handleRejectRequestForOtherOrg,
  handleRejectRequestForImmgration,
  handleRejectRequestForWork,
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

const ConfirmationReject = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const { confirmReject, letterDetails, isRejecting, actionedRejected } =
    useSelector((state) => state.home);

  const handleRejectButton = () => {
    handleExactRejectAction();
  };

  useEffect(() => {
    if (actionedRejected !== null) {
      dispatch(openModalConfirmReject({ confirmReject: false }));
      dispatch(openModalRequestRejected({ requestReject: true }));
    }
  }, [actionedRejected]);

  const handleExactRejectAction = () => {
    switch (letterDetails.type) {
      case "An Embassy":
      case "Embassy":
        dispatch(
          handleRejectRequestForEmbassy(
            { id: letterDetails?.id, comment: comment },
            navigate
          )
        );
        break;

      case "Bank":
        dispatch(
          handleRejectRequestForBank(
            { id: letterDetails?.id, comment: comment },
            navigate
          )
        );
        break;

      case "OtherOrganisation":
        dispatch(
          handleRejectRequestForOtherOrg(
            { id: letterDetails?.id, comment: comment },
            navigate
          )
        );
        break;

      case "Immigration":
        dispatch(
          handleRejectRequestForImmgration(
            { id: letterDetails?.id, comment: comment },
            navigate
          )
        );
        break;

      case "Work":
        dispatch(
          handleRejectRequestForWork(
            { id: letterDetails?.id, comment: comment },
            navigate
          )
        );
        break;

      default:
        return;
    }
  };
  const handleChange = (e) => {
    setComment(e.target.value);
  };
  return (
    <Modal
      visible={confirmReject}
      onCancel={() =>
        dispatch(openModalConfirmReject({ confirmReject: false }))
      }
      closable={false}
      bodyStyle={{ padding: "20px 30px 45px" }}
      footer={null}
      width="400px"
    >
      <StyledContent>
        {/* header */}
        <Text fontWeight={5} fontSize={2} lineHeight="19px" color="#100711">
          Reject Request?
        </Text>
        <Box mt={3}>
          <Label mb={1}>Reason</Label>
          <TextAreaInput
            rows={5}
            placeholder={"Give detailed reason for rejecting this requets"}
            value={comment}
            onChange={handleChange}
          />
        </Box>

        <Box display="flex" alignItems="center" justifyContent="flex-end">
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
            onClick={() => handleRejectButton()}
          >
            {isRejecting ? (
              <div style={{ display: "flex", alignItems: "center" }}>
                <Spin size="small" indicator={<LoadingOutlined />} />{" "}
                <Text ml={2}>Loading...</Text>
              </div>
            ) : (
              "Reject Request"
            )}
          </Button>
        </Box>
      </StyledContent>
    </Modal>
  );
};

export default ConfirmationReject;
