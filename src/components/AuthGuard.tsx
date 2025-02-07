import { Navigate, Outlet } from "react-router-dom";
import { ReactNode } from "react";


interface AuthGuardProps {
    children: ReactNode ;
}
const AuthGuard = ({children}: AuthGuardProps) => {
  const token = localStorage.getItem("token");


  <>{children}</>
  return token ? <Outlet /> : <Navigate to="/login" replace />;

};

export default AuthGuard;
