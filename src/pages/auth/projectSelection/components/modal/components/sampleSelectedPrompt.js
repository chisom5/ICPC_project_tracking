import React from "react";
import { Modal } from "antd";
import { ModalContainer } from "../../../../../../styles/layout";
import { Text } from "../../../../../../components/Primitives";
import { useDispatch, useSelector } from "react-redux";
import SVG from "react-inlinesvg";
import { openModal } from "../../../../../../services/projectSelection/action";

const SaveSampleSelectedModal = () => {
  const dispatch = useDispatch();

  const { sampleSelected } = useSelector((state) => state.projectSelection);

  const handleCancel = () => {
    dispatch(openModal({ sampleSelected: false }));
  };

  return (
    <Modal
      title={null}
      open={sampleSelected}
      footer={null}
      closable={false}
      width={480}
    >
      <ModalContainer>
        <header>
          <span className="modal-title">Project Selection Criteria</span>
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
          <div>
            <Text fontSize={2}>
              Save project samples selected for Steering Committee review
              approval?
            </Text>

            {/* buttons here */}
          </div>
        </section>
      </ModalContainer>
    </Modal>
  );
};

export default SaveSampleSelectedModal;
