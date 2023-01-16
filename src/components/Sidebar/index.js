import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router";
import styled from "styled-components";
import { setCurrentView, openLogoutModal } from "../../services/global/action";
import { Box, Img, Text } from "../Primitives";
import colors from "../../theme/colors";

const Sidebar = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.includes("budget")) {
      setActiveIndex(0);
    } else if (pathname.includes("project-selection")) {
      setActiveIndex(1);
    } else if (pathname.includes("contracts")) {
      setActiveIndex(2);
    } else if (pathname.includes("projects")) {
      setActiveIndex(3);
    }
  }, [pathname]);

  const handleNav = (id, path) => {
    if(id === 0){
      setActiveIndex(0);
      dispatch(setCurrentView({ currentView: "budget" })); // check the role of the user login.
      navigate(path);
    }else if(id === 1){
      setActiveIndex(1);
      navigate(path);
    }else if(id === 2){
      setActiveIndex(2);
      navigate(path);
    }else if(id === 3){
      setActiveIndex(3);
        navigate(path);
    }

  };
  return (
    <StyledSidebar>
      <div className="sidebar__inner">
        <div className="sidebar__inner_top">
          {props.menu?.map((item) => {
            return (
              <div
                key={item.id}
                className={[
                  "menu_item",
                  item.id === activeIndex ? "menu_item_active" : null,
                ].join(" ")}
                onClick={() => handleNav(item.id, item.path)}
              >
                <Img
                  src={
                    item.id === activeIndex
                      ? item.icon_active
                      // if a nav has been completed show icon_completed.
                      : item.icon_default
                  }
                />
                <p>{item.name}</p>
              </div>
            );
          })}
        </div>
        <Box width="100%" position="absolute" bottom="0px">
          <Box
            display="flex"
            alignItems="center"
            mb={2}
            style={{ cursor: "pointer" }}
            onClick={() => dispatch(openLogoutModal())}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.25"
                d="M3.78947 19.2H6.31579V21.6H21.4737V2.4H6.31579V4.8H3.78947V1.2C3.78947 0.88174 3.92256 0.576515 4.15944 0.351472C4.39633 0.126428 4.71762 0 5.05263 0H22.7368C23.0719 0 23.3931 0.126428 23.63 0.351472C23.8669 0.576515 24 0.88174 24 1.2V22.8C24 23.1183 23.8669 23.4235 23.63 23.6485C23.3931 23.8736 23.0719 24 22.7368 24H5.05263C4.71762 24 4.39633 23.8736 4.15944 23.6485C3.92256 23.4235 3.78947 23.1183 3.78947 22.8V19.2ZM6.31579 10.8H15.1579V13.2H6.31579V16.8L0 12L6.31579 7.2V10.8Z"
                fill="white"
              />
            </svg>

            <Text
              as="p"
              ml={"8px"}
              color={"#fff"}
              fontFamily="Lato"
              opacity={0.7}
              fontSize={12}
              fontWeight={400}
            >
              Logout
            </Text>
          </Box>
        </Box>
      </div>
    </StyledSidebar>
  );
};

export default Sidebar;

const StyledSidebar = styled.aside`
  width: 90px;
  height: 100%;
  position: fixed;
  background-color: ${colors.modes.light.sidebarColor};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 0px 20px 20px 0px;

  sidebar__inner {
    position: relative;
  }
  .sidebar__inner_top {
    height: inherit;
    padding-top: 4.2rem;

    .menu_item {
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 48px;
      justify-content: center;
      margin-bottom: 1.5rem;
      cursor: pointer;

      p {
        text-align: center;
        font-weight: 700;
        font-size: 9px;
        line-height: 12px;
        display: flex;
        align-items: center;
        margin-top: 5px;
        color: rgba(255, 255, 255, 0.25);
      }
    }
    .menu_item_active {
      p {
        color: ${colors.modes.light.white};
        font-weight: 600;
      }
    }
  }
`;
