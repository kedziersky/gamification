import { Navigate, useLocation } from "react-router-dom";

import { useUserContext } from "../../hooks/useUser";

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { user } = useUserContext();

  let location = useLocation();

  if (!user) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
};
