import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, getDocFromServer } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserContext } from "../../../hooks/useUser";
import { firebaseService } from "../../../services";
import { db } from "../../../services/firebase";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt } from "@fortawesome/free-solid-svg-icons";

export const SignInComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = getAuth();
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  useEffect(() => {
    if (user) {
      const origin = /* location.state?.from?.pathname || */ "/";
      navigate(origin);
    }
  }, [user]);
  const handleGoogleSignIn = async () => {
    signInWithGoogle();
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
