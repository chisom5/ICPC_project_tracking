import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const authUser = JSON.parse(sessionStorage.getItem("IWPW_3ing_Token") || "{}");

  //   console.log()

  return authUser !== null && authUser?.access_token ? <Outlet /> : <Navigate to="/" />;
};
