import React from "react";
import styled from "styled-components";
import { Button, Modal } from "antd";
import SVG from "react-inlinesvg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {dismissLogoutModal} from '../../../services/globalReduxFunction/action';

const LogoutContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(3, max-content);

  p {
    text-align: center;
  }
  .svg_container {
    display: flex;
    justify-self: center;
    margin: 16px 0px;
  }

  #logout_btn_container {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  #btn_cancel_logout {
    width: 150px;
    height: 48px;
    margin: 16px 10px 0px 0px;
    font-weight: 500;
    color: #002e5a;
    background-color: rgba(0, 46, 90, 0.15);
  }
  #btn_logout {
    width: 150px;
    height: 48px;
    margin-top: 16px;
    font-weight: 500;
    background-color: #d9534f;
    color: #fff;
  }
`;

const LogoutModal = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { logout } = useSelector((state) => state.global);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };
  const dismissModal = () => {
    dispatch(dismissLogoutModal());
  };
  return (
    <Modal
      visible={logout}
      //   onCancel={() => dispatch(setAuth({ logout: false }))}
      closable={false}
      bodyStyle={{ padding: "20px 30px 45px" }}
      footer={null}
      width="400px"
    >
      <LogoutContent>
        <div className="svg_container">
          <SVG
            src={
              require("../../../assets/images/svg/error-warning.svg").default
            }
            alt="error"
          />
        </div>
        <p>
          If you log out, your session will end. Are you sure you want to log
          out?
        </p>
        <div id="logout_btn_container">
          <Button id="btn_cancel_logout" onClick={dismissModal}>
            Cancel
          </Button>
          <Button id="btn_logout" onClick={handleLogout}>
            Yes, log out
          </Button>
        </div>
      </LogoutContent>
    </Modal>
  );
};

export default LogoutModal;
