import { getAuth } from "firebase/auth";
import React from "react";

import "./App.css";
import { BottomNavigator } from "./components/bottomNavigator";
import { useAuthStatus } from "./hooks/useAuthStatus";
import { UserProvider } from "./hooks/useUser";
import { Auth } from "./screens/auth";
import { Main } from "./screens/main";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Loader } from "./components/loader";

function App() {
  const { loggedIn, checkingStatus } = useAuthStatus();
  const renderNavigator = () => {
    if (checkingStatus) return <Loader />;
    if (!loggedIn) {
      return <Auth />;
    }

    return (
      <UserProvider>
        <div className="pb-40 flex flex-col">
          <Main />
        </div>
        <BottomNavigator />
        <ToastContainer />
      </UserProvider>
    );
  };
  return <div className="p-4">{renderNavigator()}</div>;
}

export default App;
