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
    <div>
      <button className="bg-red-500" onClick={handleGoogleSignIn}>
        Sign in
      </button>
    </div>
  );
};
