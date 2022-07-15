import { collection, orderBy, query } from 'firebase/firestore';

import { db } from '../../services/firebase';
import { useNavigate } from 'react-router-dom';
import { ActivityItem } from './activityItem';

import { Loader } from '../loader';
import { useCollectionOnce } from '../../hooks/useCollectionOnce';

export const ActivitiesComponent = () => {
  const activitiesRef = collection(db, 'activities');
  const queryActivities = query(activitiesRef, orderBy('points', 'desc'));
  const { value, loading } = useCollectionOnce(queryActivities);

  const navigate = useNavigate();

  const handleNavigation = (id: string) => {
    navigate(`/activity/${id}`);
  };
  if (loading) return <Loader />;
  const renderActivities = () => {
    return value?.docs?.map((item, index) => {
      const id = item.id;

      return <ActivityItem item={item.data()} id={id} handleClick={() => handleNavigation(id)} key={id} />;
    });
  };

  return (
    <div>
      <div className="overflow-x-auto overflow-y-auto h-[calc(100vh-300px)]">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Activity</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>{renderActivities()}</tbody>
        </table>
      </div>
    </div>
  );
};
