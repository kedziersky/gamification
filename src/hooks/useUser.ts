import constate from "constate";
import { useState } from "react";

type UserState = {
  availablePoints: number;
  totalPoints: number;
  userName: string;
  role: "admin" | "user";
};

function useUser() {
  const [user, setUser] = useState<UserState>();
  const addUserData = (data: any) => setUser(data);
  return { user, addUserData };
}

export const [UserProvider, useUserContext] = constate(useUser);
