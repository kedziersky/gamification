import { getAuth, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../../../hooks/useUser";

export const SettingsComponent = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const { user } = useUserContext();
  const handleButton = () => {
    signOut(auth);
    navigate("/signin");
  };

  const adminOptions = [
    {
      name: "Leaderboard",
      url: "/leaderboard",
    },
    {
      name: "activities",
      url: "/",
    },
  ];

  const renderAdminOptions = () => {
    if (user?.role === "admin") {
      return adminOptions.map((item, index) => (
        <Link key={index} to={item.url} className="btn w-full mb-3">
          {item.name}
        </Link>
      ));
    }
  };

  return (
    <div>
      {renderAdminOptions()}
      <button onClick={handleButton} className="btn w-full">
        Sign out
      </button>
    </div>
  );
};
