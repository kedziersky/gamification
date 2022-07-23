import { collection, orderBy, query, where } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { Loader } from '../../../components/loader';
import { ScreenHeader } from '../../../components/screenHeader';
import { useCollectionOnce } from '../../../hooks/useCollectionOnce';
import { db } from '../../../services/firebase';
import { LeaderboardItem } from './leaderboardItem';

export const LeaderboardComponent = () => {
  const usersRef = collection(db, 'users');
  const queryUsers = query(usersRef, orderBy('totalPoints', 'desc'));
  const { value, loading, error } = useCollectionOnce(queryUsers);
  console.log(error);
  if (loading) return <Loader />;

  const renderLeaderboard = () => {
    return value?.docs.map((item, index) => {
      return <LeaderboardItem item={item.data()} index={index + 1} id={item.id} key={item.id} />;
    });
  };
  return (
    <div>
      <ScreenHeader title="Leaderboard" />
      <div className="overflow-x-auto overflow-y-auto h-[calc(100vh-190px)]">
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
