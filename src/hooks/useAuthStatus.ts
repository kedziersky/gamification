import { onAuthStateChanged, getAuth } from "firebase/auth";
import { useEffect, useState } from "react";

export const useAuthStatus = () => {
  // assume user to be logged out
  const [loggedIn, setLoggedIn] = useState(false);
  const auth = getAuth();
  // keep track to display a spinner while auth status is being checked
  const [checkingStatus, setCheckingStatus] = useState(true);

  useEffect(() => {
    // auth listener to keep track of user signing in and out
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
      }

      setCheckingStatus(false);
    });
  }, []);

  return { loggedIn, checkingStatus };
};
