import { getAuth } from "firebase/auth";
import { collection, orderBy, query } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../../services/firebase";
import { Loader } from "../loader";
import { UserOrdersItem } from "./userOrdersItem";

export const UserOrdersComponent = () => {
  const { currentUser } = getAuth();

  const ordersRef = collection(db, "users", `${currentUser!.uid}/orders`);
  const navigate = useNavigate();
  console.log("ref", ordersRef);
  const handleNavigation = (id: string) => {
    navigate(`/orders/${id}`);
  };
  const [value, loading, error] = useCollection(
    query(ordersRef, orderBy("orderDate", "desc"))
  );
  console.log("ORDERS", currentUser?.uid);
  if (loading) return <Loader />;

  const renderActivities = () => {
    return value?.docs?.map((item, index) => {
      const id = item.id;

      return (
        <UserOrdersItem
          item={item.data()}
          index={index + 1}
          id={id}
          handleClick={() => handleNavigation(id)}
          key={id}
        />
      );
    });
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th></th>
              <th>Prize</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>{renderActivities()}</tbody>
        </table>
      </div>
    </div>
  );
};
