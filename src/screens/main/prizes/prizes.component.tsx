import { getAuth } from "firebase/auth";
import { collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { Loader } from "../../../components/loader";
import { PointsHeader } from "../../../components/pointsHeader";
import { ScreenHeader } from "../../../components/screenHeader";
import { TabView } from "../../../components/tabView";
import { UserOrders } from "../../../components/userOrders";
import { db } from "../../../services/firebase";
import { PrizesItem } from "./prizesItem";

export const PrizesComponent = () => {
  const prizeSRef = collection(db, "prizes");
  const { currentUser } = getAuth();

  const [value, loading, error] = useCollection(prizeSRef);
  const prizes = value?.docs;
  if (loading) return <Loader />;

  const renderPrizes = () => {
    return prizes?.map((item, index) => {
      return (
        <PrizesItem
          item={item.data()}
          index={index + 1}
          id={item.id}
          key={item.id}
        />
      );
    });
  };

  const renderView = [
    {
      name: "Available",
      component: (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>{renderPrizes()}</tbody>
          </table>
        </div>
      ),
    },
    {
      name: "Ordered",
      component: <UserOrders />,
    },
  ];

  return (
    <div>
      <ScreenHeader title="Prizes" />
      <p className="mb-5">Here you can spend the points that you've earned!</p>
      <PointsHeader uid={currentUser!.uid} onlyAvailable />
      <TabView renderView={renderView} />
    </div>
  );
};
