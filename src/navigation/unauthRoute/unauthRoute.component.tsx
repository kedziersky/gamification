import { Navigate, Outlet, Route } from "react-router-dom";
import { Loader } from "../../components/loader";
import { useUserContext } from "../../hooks/useUser";

export const UnauthRouteComponent = ({ component: C, ...props }: any) => {
  const { user, isPending } = useUserContext();
  if (isPending) return <Loader />;
  return !user ? <Outlet /> : <Navigate to="/" replace />;
};
