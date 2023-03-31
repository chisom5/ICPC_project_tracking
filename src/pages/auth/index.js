import { useEffect } from "react";
import { Container, OtherContent } from "../../styles/layout";
import HeaderComponent from "../../components/Header";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthViewWrapper = () => {
  const { authUser } = useSelector((state) => state.global);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/d") {
      navigate("/d/welcome");
    }
  }, [location, navigate]);

  return (
    <Container>
      <HeaderComponent user={authUser} />

      <OtherContent>
        <Outlet />
      </OtherContent>
    </Container>
  );
};

export default AuthViewWrapper;
