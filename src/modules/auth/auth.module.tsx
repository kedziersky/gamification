import { onAuthStateChanged, getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Loader } from "../../components/loader";
import { useAuthStatus } from "../../hooks/useAuthStatus";
import { firebaseService } from "../../services";

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { loggedIn, checkingStatus } = useAuthStatus();

  let location = useLocation();
  if (checkingStatus) return <Loader />;
  if (!loggedIn) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
};
