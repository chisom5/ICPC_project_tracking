import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import styled from "styled-components";
import colors from "../../theme/colors";

const Sidebar = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

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
    switch ((id, path)) {
      case 0:
        setActiveIndex(0);
        navigate(path);
        break;

      case 1:
        setActiveIndex(1);
        navigate(path);
        break;
      case 2:
        setActiveIndex(2);
        navigate(path);
        break;

      case 3:
        setActiveIndex(3);
        navigate(path);
        break;

      default:
        setActiveIndex(0);
        navigate(path);
        break;
    }
  };
  return (
    <StyledSidebar>
      <div className="sidebar__inner">
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
              {item.id === activeIndex ? item.icon_active : item.icon_default}

              <p>{item.name}</p>
            </div>
          );
        })}
      </div>
    </StyledSidebar>
  );
};

export default Sidebar;

const StyledSidebar = styled.aside`
  width: 85px;
  height: 100%;
  position: fixed;
  background-color: ${colors.modes.light.sidebarColor};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  // border-radius: 0px 20px 20px 0px;

  .sidebar__inner {
    height: inherit;
    padding-top: 4.2rem;

    .menu_item {
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 48px;
      justify-content: center;
      margin-bottom: 1.2rem;
      cursor: pointer;
      color: rgba(255, 255, 255, 0.25);

      p {
        text-align: center;
        font-weight: 700;
        font-size: 9px;
        line-height: 12px;
        display: flex;
        align-items: center;
        letter-spacing: -0.02em;
        margin-top: 10px;
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
