import { Navigate, Outlet } from "react-router-dom";
import { Loader } from "../../components/loader";
import { useUserContext } from "../../hooks/useUser";

export const AuthRouteComponent = ({ component: C, ...props }: any) => {
  const { user, isPending } = useUserContext();

  if (isPending) return <Loader />;

  /*  if (user?.role === "admin" && location.pathname === "/") {
    return <Navigate to="/submissions" replace />;
  } */

  return user ? <Outlet /> : <Navigate to="/signin" replace />;
};
