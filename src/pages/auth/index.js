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
      icon_default: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14 2V8H20" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16 13H8" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16 17H8" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10 9H9H8" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

      ),
      icon_active: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M14 2V8H20"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M16 13H8"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M16 17H8"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M10 9H9H8"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),

      path: "/d/budget",
      name: "Budget Upload",
    },
    {
      id: 1,
      icon_default: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.25"
            d="M20.206 0C20.8621 0 21.3946 0.5376 21.3946 1.2V5.7084L19.0174 8.1084V2.4H2.37718V21.6H19.0174V18.2904L21.3946 15.8904V22.8C21.3946 23.4624 20.8621 24 20.206 24H1.18859C0.532488 24 0 23.4624 0 22.8V1.2C0 0.5376 0.532488 0 1.18859 0H20.206ZM22.3193 8.1696L24 9.8664L14.7552 19.2L13.0721 19.1976L13.0745 17.5032L22.3193 8.1696V8.1696ZM11.8859 12V14.4H5.94295V12H11.8859ZM15.4517 7.2V9.6H5.94295V7.2H15.4517Z"
            fill="white"
          />
        </svg>
      ),
      icon_active: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.206 0C20.8621 0 21.3946 0.5376 21.3946 1.2V5.7084L19.0174 8.1084V2.4H2.37718V21.6H19.0174V18.2904L21.3946 15.8904V22.8C21.3946 23.4624 20.8621 24 20.206 24H1.18859C0.532488 24 0 23.4624 0 22.8V1.2C0 0.5376 0.532488 0 1.18859 0H20.206ZM22.3193 8.1696L24 9.8664L14.7552 19.2L13.0721 19.1976L13.0745 17.5032L22.3193 8.1696ZM11.8859 12V14.4H5.94295V12H11.8859ZM15.4517 7.2V9.6H5.94295V7.2H15.4517Z"
            fill="white"
          />
        </svg>
      ),

      path: "/d/project-selection",
      name: "Project Selection",
    },

    {
      id: 2,
      icon_default: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
      icon_active: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),

      path: "/d/contracts",
      name: "Contracts & Tender Upload",
    },
    {
      id: 3,
      icon_default: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="white"
          fillOpacity={0.45}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 21H17V7H16V5.5C16 4.83696 15.7366 4.20107 15.2678 3.73223C14.7989 3.26339 14.163 3 13.5 3H10.5C9.83696 3 9.20107 3.26339 8.73223 3.73223C8.26339 4.20107 8 4.83696 8 5.5V7H7V21ZM10 5.5C10 5.36739 10.0527 5.24021 10.1464 5.14645C10.2402 5.05268 10.3674 5 10.5 5H13.5C13.6326 5 13.7598 5.05268 13.8536 5.14645C13.9473 5.24021 14 5.36739 14 5.5V7H10V5.5Z"
            fill="white"
          />
          <path
            d="M19 7V21C19.7956 21 20.5587 20.6839 21.1213 20.1213C21.6839 19.5587 22 18.7956 22 18V10C22 9.20435 21.6839 8.44129 21.1213 7.87868C20.5587 7.31607 19.7956 7 19 7Z"
            fill="white"
          />
          <path
            d="M5 7C4.20435 7 3.44129 7.31607 2.87868 7.87868C2.31607 8.44129 2 9.20435 2 10V18C2 18.7956 2.31607 19.5587 2.87868 20.1213C3.44129 20.6839 4.20435 21 5 21V7Z"
            fill="white"
          />
        </svg>
      ),
      icon_active: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 21H17V7H16V5.5C16 4.83696 15.7366 4.20107 15.2678 3.73223C14.7989 3.26339 14.163 3 13.5 3H10.5C9.83696 3 9.20107 3.26339 8.73223 3.73223C8.26339 4.20107 8 4.83696 8 5.5V7H7V21ZM10 5.5C10 5.36739 10.0527 5.24021 10.1464 5.14645C10.2402 5.05268 10.3674 5 10.5 5H13.5C13.6326 5 13.7598 5.05268 13.8536 5.14645C13.9473 5.24021 14 5.36739 14 5.5V7H10V5.5Z"
            fill="white"
          />
          <path
            d="M19 7V21C19.7956 21 20.5587 20.6839 21.1213 20.1213C21.6839 19.5587 22 18.7956 22 18V10C22 9.20435 21.6839 8.44129 21.1213 7.87868C20.5587 7.31607 19.7956 7 19 7Z"
            fill="#FD349C"
          />
          <path
            d="M5 7C4.20435 7 3.44129 7.31607 2.87868 7.87868C2.31607 8.44129 2 9.20435 2 10V18C2 18.7956 2.31607 19.5587 2.87868 20.1213C3.44129 20.6839 4.20435 21 5 21V7Z"
            fill="#FD349C"
          />
        </svg>
      ),
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
