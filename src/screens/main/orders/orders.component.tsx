import { collection, query, where } from "firebase/firestore";
import { isEmpty } from "ramda";
import {
  useCollection,
  useCollectionData,
} from "react-firebase-hooks/firestore";
import { EmptyList } from "../../../components/emptyList";
import { ScreenHeader } from "../../../components/screenHeader";
import { db } from "../../../services/firebase";
import { OrdersItem } from "./ordersItem";

export const OrdersComponent = () => {
  const ordersRef = collection(db, "orders");

  const [value, loading, error] = useCollection(
    query(ordersRef, where("status", "==", "pending"))
  );
  const orders = value?.docs;
  if (loading) return <progress className="progress w-56" />;

  const renderSubmissions = () => {
    return orders?.map((item, index) => {
      return (
        <OrdersItem
          item={item.data()}
          index={index + 1}
          id={item.id}
          key={item.id}
        />
      );
    });
  };

  const renderContainer = () => {
    if (isEmpty(orders)) {
      return <EmptyList text="Currently there are no orders!" />;
    }
    return (
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th></th>
              <th>Prize name</th>
              <th>Player</th>
              <th>Order date</th>
            </tr>
          </thead>
          <tbody>{renderSubmissions()}</tbody>
        </table>
      </div>
    );
  };

  return (
    <div>
      <ScreenHeader title="Orders" />
      <p className="mb-5">
        Here admin can find orders that were submitted by players
      </p>
      {renderContainer()}
    </div>
  );
};
