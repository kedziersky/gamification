import constate from 'constate';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../services/firebase';

type UserState = {
  availablePoints: number;
  totalPoints: number;
  userName: string;
  role: 'admin' | 'user';
};

function useUser() {
  const [user, setUser] = useState<any>();
  const [isPending, setIsPending] = useState<any>();

  const addUserData = (data: any) => setUser(data);

  const getUserData = async (currentUser: any) => {
    if (currentUser) {
      try {
        const usersRef = doc(db, 'users', currentUser.uid);
        const response = await getDoc(usersRef);

        setUser({ ...response.data(), userId: currentUser.uid });
      } catch (e) {}
    }
    setIsPending(false);
  };
  useEffect(() => {
    setIsPending(true);
    const unsubscribe = onAuthStateChanged(getAuth(), getUserData);
    return () => unsubscribe();
  }, []);

  const resetUser = () => {
    setUser(null);
  };

  return { user, addUserData, resetUser, isPending };
}

export const [UserProvider, useUserContext] = constate(useUser);
