import "./App.css";

import { UserProvider } from "./hooks/useUser";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import { Navigator } from "./navigation";

function App() {
  const renderNavigator = () => {
    return (
      <UserProvider>
        <div className="flex flex-col">
          <Navigator />
        </div>

        <ToastContainer />
      </UserProvider>
    );
  };
  return <div className="p-4">{renderNavigator()}</div>;
}

export default App;
