import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router";
import styled from "styled-components";
import {
  openLogoutModal,
  fetchProjectTrackingId,
} from "../../services/global/action";
import { Box, Img, Text } from "../Primitives";
import colors from "../../theme/colors";
import update from "immutability-helper";
import { setCurrentView } from "../../services/budgetPage/action";
import { setContractView } from "../../services/contracts/action";
import { setProjectView } from "../../services/projectSelection/action";
import { setCurrentTab } from "../../services/projects/action";
// if a nav has been completed show icon_completed.

// 1 - tracking instance created
// 2- Budget(s) uploaded;

//3 - executing agencies and constituency data uploaded
//4 - project selected
//5 - project selection saved and sent for review
//6 - project selection reviewed, approved and finalised

const Sidebar = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { logoutIcon, trackingStatus, authUser, trackingId } = useSelector(
    (state) => state.global
  );
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
    } else if (pathname.includes("users")) {
      setActiveIndex(4);
    }
  }, [pathname]);

  useEffect(() => {
    if (props.menu.length !== 0 &&
      authUser !== null &&
      authUser.roleName !== "ADMIN" 
      ) {
      if (
        trackingStatus !== null &&
        (trackingStatus?.tracking.Status === 2 ||
          trackingStatus?.tracking.Status === 3 ||
          trackingStatus?.tracking.Status === 4 ||
          trackingStatus?.tracking.Status === 5)
      ) {
        // completed budget upload.
        props.setMenu((menu) =>
          update(menu, {
            [0]: {
              $merge: {
                completed: true,
              },
            },
          })
        );
      } else if (
        trackingStatus !== null &&
        (trackingStatus?.tracking.Status === 6 ||
          trackingStatus?.tracking.Status === 7)
      ) {
        // completed project selection.
        props.setMenu((menu) =>
          update(menu, {
            [0]: {
              $merge: {
                completed: true,
              },
            },
            [1]: {
              $merge: {
                completed: true,
              },
            },
          })
        );
      } else if (
        trackingStatus !== null &&
        trackingStatus?.tracking.Status === 8
      ) {
        // completed project selection.
        props.setMenu((menu) =>
          update(menu, {
            [0]: {
              $merge: {
                completed: true,
              },
            },
            [1]: {
              $merge: {
                completed: true,
              },
            },
            [2]: {
              $merge: {
                completed: true,
              },
            },
          })
        );
      }
    }
  }, [props.menu.length]);

  const handleNav = (id, path) => {
    if (
      authUser !== null &&
      (authUser.roleName === "ADMIN" || authUser.roleName === "CEPTG")
    ) {
      const params = {
        id: trackingId,
      };
      dispatch(fetchProjectTrackingId(params, navigate));

      if (id === 0) {
        setActiveIndex(0);
        dispatch(setCurrentView({ currentView: "budget" }));
        navigate(path);
      } else if (id === 1) {
        dispatch(setProjectView({ projectView: "selection" }));
        setActiveIndex(1);
        dispatch(setCurrentView({ currentView: "selection" }));
        navigate(path);
      } else if (id === 2) {
        dispatch(setContractView({ contractView: "contractUpload" }));
        setActiveIndex(2);
        navigate(path);
      } else if (id === 3) {
        dispatch(setCurrentTab({ currentTab: "Project Tracking Instances" }));
        setActiveIndex(3);
        navigate(path);
      } else if (id === 4) {
        setActiveIndex(4);
        navigate(path);
      }
    }
  };

  const handleLogout = () => {
    dispatch(openLogoutModal({ logoutIcon: true, logout: true }));
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
                      : item.completed
                      ? item.icon_completed
                      : item.icon_default
                  }
                />

                <p>{item.name}</p>
              </div>
            );
          })}
        </div>

        <Box width="100%" position="absolute" bottom="12vh">
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mb={2}
            style={{ cursor: "pointer" }}
            onClick={handleLogout}
          >
            <Img
              src={
                logoutIcon
                  ? require("../../assets/images/nav/logout-active.svg").default
                  : require("../../assets/images/nav/logout-default.svg")
                      .default
              }
            />

            <Text
              as="p"
              mt={"8px"}
              color={"#fff"}
              // fontFamily="Lato"
              opacity={0.7}
              fontSize={"9px"}
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
    height: 100%;
    position: relative;
  }
  .sidebar__inner_top {
    padding: 4.2rem 0.28rem 0rem 0.28rem;

    .menu_item {
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 48px;
      justify-content: center;
      margin-bottom: 1.2rem;
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
