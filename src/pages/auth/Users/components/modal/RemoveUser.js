import React from "react";
import { Modal, Button } from "antd";
import { ModalContainer } from "../../../../../styles/layout";
import { useDispatch, useSelector } from "react-redux";
import SVG from "react-inlinesvg";
import {
  openRevokeModal,
  handleDeleteuser,
} from "../../../../../services/users/action";
import { useNavigate } from "react-router-dom";

const RevokeUsersModal = ({ userObj, ...props }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { revokeUser, isDeleting } = useSelector((state) => state.users);
  const handleCancel = () => {
    dispatch(
      openRevokeModal({
        revokeUser: false,
      })
    );
    props.handleSetCurrentUserObj(null);
  };

  const handleAccessRevoke = () => {
    dispatch(handleDeleteuser({ userId: userObj.Id }, navigate));
  };

  return (
    <Modal
      title={null}
      open={revokeUser}
      footer={null}
      closable={false}
      width={480}
    >
      <ModalContainer>
        <header>
          <span className="modal-title">Revoke Access</span>
          {/* icon delete */}
          <span onClick={handleCancel} className="close-modal-icon">
            <SVG
              src={
                require("../../../../../assets/images/close-square.svg").default
              }
            />
          </span>
        </header>
        <section className="modal-mainContent">
          <div>
            <p>Are you sure you want to revoke this user’s access?</p>
          </div>
          <div className="buttonContainer">
            <Button
              key="back"
              type="text"
              className="buttonCancel"
              onClick={handleCancel}
            >
              No
            </Button>
            <Button
              key="confirm"
              onClick={handleAccessRevoke}
              className="confirmButton"
              loading={isDeleting}
            >
              Yes, Revoke Access
            </Button>
          </div>
        </section>
      </ModalContainer>
    </Modal>
  );
};

export default RevokeUsersModal;
