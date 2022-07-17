import { collection, orderBy, query } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../hooks/useUser';
import { db } from '../../services/firebase';
import { EmptyList } from '../emptyList';
import { Loader } from '../loader';
import { SubmittedActivitiesItem } from './submittedActivitiesItem';

export const SubmittedActivitiesComponent = () => {
  const { user } = useUserContext();

  const submissionssRef = collection(db, 'users', `${user.userId}/submissions`);
  const navigate = useNavigate();

  const handleNavigation = (id: string) => {
    navigate(`/submissions/${id}`);
  };
  const [value, loading, error] = useCollection(query(submissionssRef, orderBy('createdOnDate', 'desc')));

  if (loading) return <Loader />;

  if (!value?.docs.length) {
    return <EmptyList text="No submissions yet 👀" />;
  }
  const renderActivities = () => {
    return value?.docs?.map((item, index) => {
      const id = item.id;

      return (
        <SubmittedActivitiesItem
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
      <div className="overflow-y-auto h-[calc(100vh-330px)]">
        <table className="table table-zebra w-full table-fixed">
          <thead>
            <tr>
              <th>Activity</th>
            </tr>
          </thead>
          <tbody>{renderActivities()}</tbody>
        </table>
      </div>
    </div>
  );
};
