import React from "react";
import { Modal, Spin } from "antd";
import { ModalContainer } from "../../../../../../styles/layout";
import { Text, Box } from "../../../../../../components/Primitives";
import { useDispatch, useSelector } from "react-redux";
import SVG from "react-inlinesvg";
import { openModal } from "../../../../../../services/projectSelection/action";
import { ButtonContained } from "../../../../../../components/Button";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";

const SaveSampleSelectedModal = ({ handleUploadBudget }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { uploadBudgetPrompt, isUploading } = useSelector(
    (state) => state.projectSelection
  );

  const handleCancel = () => {
    dispatch(openModal({ uploadBudgetPrompt: false }));
  };

  return (
    <Modal
      title={null}
      open={uploadBudgetPrompt}
      footer={null}
      closable={false}
      width={450}
    >
      <ModalContainer>
        <header>
          <span className="modal-title">Upload Action</span>
          {/* icon delete */}
          <span onClick={handleCancel} className="close-modal-icon">
            <SVG
              src={
                require("../../../../../../assets/images/close-square.svg")
                  .default
              }
            />
          </span>
        </header>
        <section className="modal-mainContent">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text fontSize={2} mb={"20px"} textAlign="center">
              Do you want to upload the Project?
            </Text>

            {/* buttons here */}
            <Box display="flex" style={{ gap: "24px" }}>
              <ButtonContained
                width={"auto"}
                p={"8px 19px"}
                height="auto"
                fontWeight={4}
                borderColor={"#D0D4D7"}
                color={"#272E33"}
                bg={"#F1F3F3"}
                borderRadius={"4px"}
                style={{ textTransform: "capitalize" }}
                onClick={() => handleUploadBudget()}
              >
                {isUploading ? (
                  <Spin indicator={<LoadingOutlined />} />
                ) : (
                  "Yes, Continue"
                )}
              </ButtonContained>
              <ButtonContained
                width={"auto"}
                p={"8px 19px"}
                height="auto"
                fontWeight={4}
                borderColor={"#D0D4D7"}
                color={"#CC3366"}
                bg={"#F1F3F3"}
                borderRadius={"4px"}
                style={{ textTransform: "capitalize" }}
                onClick={handleCancel}
              >
                No, Cancel
              </ButtonContained>
            </Box>
          </div>
        </section>
      </ModalContainer>
    </Modal>
  );
};

export default SaveSampleSelectedModal;
