import React, { useState, useEffect } from "react";
import {
  MainContent,
  MiniHeaderStyle,
  Content,
  Main,
  TableWrapper,
} from "../../../styles/layout";
import TableComponent from "./components/table";
import {
  RevokeUsersModal,
  EditUserModal,
  AddNewUserModal,
} from "./components/modal";
import Sidebar from "../../../components/Sidebar";
import { ErrorComponent } from "../../../components/ErrorBoundry/errorComponent";
import { useDispatch, useSelector } from "react-redux";
import { LogoutModal } from "../../../components/Modal";
import {
  clearGlobalErrorMessage,
  clearGlobalSuccessMessage,
} from "../../../services/global/action";
import {
  clearErrorMessage,
  clearSuccessMessage,
  fetchAllUsers,
} from "../../../services/users/action";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { globalError, globalSuccess, authUser } = useSelector(
    (state) => state.global
  );
  const { error, success } = useSelector((state) => state.users);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menu, setMenu] = useState([
    {
      id: 0,
      icon_default: require("../../../assets/images/nav/budget-inactive.svg")
        .default,
      icon_active: require("../../../assets/images/nav/budget-active.svg")
        .default,
      icon_completed: require("../../../assets/images/nav/budget-completed.svg")
        .default,
      path: "/d/budget",
      name: "Budget Upload",
    },
    // {
    //   id: 1,
    //   icon_default:
    //     require("../../../assets/images/nav/projectSelection-inactive.svg")
    //       .default,
    //   icon_active:
    //     require("../../../assets/images/nav/projectSelection-active.svg")
    //       .default,
    //   icon_completed:
    //     require("../../../assets/images/nav/projectSelection-completed.svg")
    //       .default,

    //   path: "/d/project-selection",
    //   name: "Project Selection",
    // },

    // {
    //   id: 2,
    //   icon_default: require("../../../assets/images/nav/contracts-inactive.svg")
    //     .default,
    //   icon_active: require("../../../assets/images/nav/contracts-active.svg")
    //     .default,
    //   icon_completed:
    //     require("../../../assets/images/nav/contracts-completed.svg").default,

    //   path: "/d/contracts",
    //   name: "Project Details Upload",
    // },
    // {
    //   id: 3,
    //   icon_default: require("../../../assets/images/nav/projects-inactive.svg")
    //     .default,
    //   icon_active: require("../../../assets/images/nav/projects-active.svg")
    //     .default,
    //   icon_completed:
    //     require("../../../assets/images/nav/projects-completed.svg").default,

    //   path: "/d/projects",
    //   name: "Projects",
    // },
    {
      id: 4,
      icon_default:
        require("../../../assets/images/nav/userManagement-inactive.svg")
          .default,
      icon_active:
        require("../../../assets/images/nav/userManagement-active.svg").default,
      icon_completed:
        require("../../../assets/images/nav/projects-completed.svg").default,

      path: "/d/users",
      name: "User Management",
    },
  ]);
  const [currentUserObj, setCurrentUserObj] = useState(null);

  useEffect(() => {
    if (authUser?.roleName.toLowerCase() !== "admin") {
      navigate("/");
    } else {
      dispatch(fetchAllUsers({ CurrentPage: 1, pageSize: 10 }, navigate));
    }
  }, []);

  useEffect(() => {
    if (error !== null || success !== null) {
      setTimeout(() => dispatch(clearSuccessMessage()), 5000);
      setTimeout(() => dispatch(clearErrorMessage()), 5000);
    }
    if (globalError !== null || globalSuccess !== null) {
      setTimeout(() => dispatch(clearGlobalSuccessMessage()), 5000);
      setTimeout(() => dispatch(clearGlobalErrorMessage()), 5000);
    }
  }, [dispatch, success, error, globalError, globalSuccess]);

  const handlePagination = (pagination, filters, sorter) => {};

  const handleClearErrorMessage = () => {
    if (error !== null) {
      dispatch(clearErrorMessage());
    } else if (globalError !== null) {
      dispatch(clearGlobalErrorMessage());
    }
  };
  const handleClearSuccessMessage = () => {
    if (success !== null) {
      dispatch(clearSuccessMessage());
    } else if (globalSuccess !== null) {
      dispatch(clearGlobalSuccessMessage());
    }
  };

  const handleSetCurrentUserObj = (obj) => {
    setCurrentUserObj(obj);
  };
  console.log(currentUserObj)
  return (
    <ErrorComponent
      error={error || globalError}
      success={success || globalSuccess}
      clearErrorMessage={handleClearErrorMessage}
      clearSuccessMessage={handleClearSuccessMessage}
    >
      <Main>
        <Sidebar menu={menu} setMenu={setMenu} />
        <MainContent>
          <MiniHeaderStyle>
            <p className="title">User Management</p>
          </MiniHeaderStyle>

          <Content>
            <TableWrapper padding={"17px 16px 0px 16px"}>
              <TableComponent
                currentPage={currentPage}
                handlePagination={handlePagination}
                handleSetCurrentUserObj={handleSetCurrentUserObj}
              />
            </TableWrapper>
            <RevokeUsersModal
              userObj={currentUserObj}
              handleSetCurrentUserObj={handleSetCurrentUserObj}
            />
            <EditUserModal
              userObj={currentUserObj}
              handleSetCurrentUserObj={handleSetCurrentUserObj}
            />
            <AddNewUserModal />
            <LogoutModal />
          </Content>
        </MainContent>
      </Main>
    </ErrorComponent>
  );
};

export default Users;
