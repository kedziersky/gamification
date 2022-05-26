import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faCog,
  faHome,
  faList,
  faPlusSquare,
  faShoppingBasket,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";
import { getAuth } from "firebase/auth";
import { useUserContext } from "../../hooks/useUser";

export const BottomNavigatorComponent = () => {
  const { user } = useUserContext();
  const SharedOptions = [
    {
      name: "Settings",
      url: "/settings",
      icon: faCog,
    },
  ];
  const UserOptions = [
    {
      name: "Home",
      url: "/",
      icon: faHome,
    },
    {
      name: "Prizes",
      url: "/prizes",
      icon: faShoppingBasket,
    },
    {
      name: "Leaderboard",
      url: "/leaderboard",
      icon: faTrophy,
    },
    ...SharedOptions,
  ];

  const AdminOptions = [
    {
      name: "Submissions",
      url: "/submissions",
      icon: faList,
    },
    {
      name: "Orders",
      url: "/orders",
      icon: faCartShopping,
    },
    {
      name: "Add",
      url: "/add",
      icon: faPlusSquare,
    },
    ...SharedOptions,
  ];

  const renderOptions = () => {
    if (user?.role === "admin") {
      return AdminOptions.map((item, index) => (
        <Link to={item.url} key={index} className="flex flex-col items-center">
          <FontAwesomeIcon icon={item.icon} />
        </Link>
      ));
    }
    return UserOptions.map((item, index) => (
      <Link to={item.url} key={index} className="flex flex-col items-center">
        <FontAwesomeIcon icon={item.icon} />
      </Link>
    ));
  };

  return (
    <div className="grid grid-cols-4 fixed bottom-0 right-0 left-0 bg-neutral py-10 z-50">
      {renderOptions()}
    </div>
  );
};
