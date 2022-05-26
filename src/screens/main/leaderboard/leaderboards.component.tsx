import { collection, orderBy, query, where } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { ScreenHeader } from "../../../components/screenHeader";
import { db } from "../../../services/firebase";
import { LeaderboardItem } from "./leaderboardItem";

export const LeaderboardComponent = () => {
  const usersRef = collection(db, "users");
  const [value, loading, error] = useCollection(
    query(usersRef, orderBy("totalPoints", "desc"))
  );
  const renderLeaderboard = () => {
    return value?.docs.map((item, index) => {
      return (
        <LeaderboardItem
          item={item.data()}
          index={index + 1}
          id={item.id}
          key={item.id}
        />
      );
    });
  };
  return (
    <div>
      <ScreenHeader title="Leaderboard" />
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th></th>
              <th>Player</th>
              <th>Total points</th>
            </tr>
          </thead>
          <tbody>{renderLeaderboard()}</tbody>
        </table>
      </div>
    </div>
  );
};
