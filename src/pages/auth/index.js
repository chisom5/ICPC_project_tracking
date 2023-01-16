import { useEffect, useState } from "react";
import { Container, Main, OtherContent } from "../../styles/layout";
import HeaderComponent from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const AuthViewWrapper = () => {
  //   const { authUsers } = useAppSelector((state) => state.authReducer);
  const [role] = useState("CEPTG");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/d") {
      navigate("/d/welcome");
    }
  }, [location, navigate]);

  const menu = [
    {
      id: 0,
      icon_default: require("../../assets/images/nav/budget-inactive.svg")
        .default,
      icon_active: require("../../assets/images/nav/budget-active.svg").default,
      icon_completed: require("../../assets/images/nav/budget-completed.svg")
        .default,
      path: "/d/budget",
      name: "Budget Upload",
    },
    {
      id: 1,
      icon_default:
        require("../../assets/images/nav/projectSelection-inactive.svg")
          .default,
      icon_active:
        require("../../assets/images/nav/projectSelection-active.svg").default,
      icon_completed:
        require("../../assets/images/nav/projectSelection-completed.svg")
          .default,

      path: "/d/project-selection",
      name: "Project Selection",
    },

    {
      id: 2,
      icon_default:
        require("../../assets/images/nav/contracts-inactive.svg")
          .default,
      icon_active:
        require("../../assets/images/nav/contracts-active.svg").default,
      icon_completed:
        require("../../assets/images/nav/contracts-completed.svg")
          .default,

      path: "/d/contracts",
      name: "Contracts & Tender Upload",
    },
    {
      id: 3,
      icon_default:
      require("../../assets/images/nav/projects-inactive.svg")
        .default,
    icon_active:
      require("../../assets/images/nav/projects-active.svg").default,
    icon_completed:
      require("../../assets/images/nav/projects-completed.svg")
        .default,

      path: "/d/projects",
      name: "Projects",
    },
  ];

  return (
    <Container>
      <HeaderComponent role={role} />

      <Main>
        <Sidebar menu={menu} />

        <OtherContent>
          <Outlet />
        </OtherContent>
      </Main>
    </Container>
  );
};

export default AuthViewWrapper;
