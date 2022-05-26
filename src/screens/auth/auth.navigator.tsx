import { Route, Routes } from "react-router-dom";
import { RequireAuth } from "../../modules/auth/auth.module";
import { Home } from "../main/home";
import { SignIn } from "./signin";

export const AuthNavigator = () => {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
    </Routes>
  );
};
