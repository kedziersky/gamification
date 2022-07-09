import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../../hooks/useUser";

import { db } from "../../../services/firebase";

import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt } from "@fortawesome/free-solid-svg-icons";

import { triggerToast } from "../../../utils/triggerToast";

export const SignInComponent = () => {
  const navigate = useNavigate();

  const { user } = useUserContext();
  const auth = getAuth();

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    hd: "apptension.com",
  });

  const validateAccountCheck = () => {
    const currentUser = auth.currentUser;
    let profileInfo = {
      totalPoints: 0,
      seasonPoints: 0,
      availablePoints: 0,
      userName: currentUser?.displayName,
      role: "user",
    };

    return setDoc(doc(db, "users", currentUser!.uid), profileInfo)
      .then(() => true)
      .catch((err) => {
        return false;
      });
  };
  useEffect(() => {
    if (user) {
      const origin = /* location.state?.from?.pathname || */ "/";
      navigate(origin);
    }
  }, [user]);
  const handleGoogleSignIn = async () => {
    signInWithPopup(auth, provider).then(async () => {
      const validAccount = await validateAccountCheck();
      if (validAccount) {
      } else {
        triggerToast(
          "Please login with @apptension.com domain!",
          "error",
          "🛑"
        );
        signOut(auth);
      }
    });
  };

  return (
    <div className="h-screen flex flex-col justify-center">
      <FontAwesomeIcon
        icon={faBolt}
        color="#83E933"
        size="5x"
        className="mb-8"
      />
      <h1 className="text-center text-6xl mb-36 font-bold">Sparky</h1>
      <button className="btn" onClick={handleGoogleSignIn}>
        Sign in
      </button>
    </div>
  );
};
