import { getAuth } from 'firebase/auth';
import { collection, orderBy, query } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useNavigate } from 'react-router-dom';
import { db } from '../../services/firebase';
import { EmptyList } from '../emptyList';
import { Loader } from '../loader';
import { UserOrdersItem } from './userOrdersItem';

export const UserOrdersComponent = () => {
  const { currentUser } = getAuth();
  console.log(currentUser?.uid);
  const ordersRef = collection(db, 'users', `${currentUser!.uid}/orders`);
  const navigate = useNavigate();

  const handleNavigation = (id: string) => {
    navigate(`/orders/${id}`);
  };
  const [value, loading] = useCollection(query(ordersRef, orderBy('createdOnDate', 'desc')));

  if (loading) return <Loader />;

  if (!value?.docs.length) return <EmptyList text="No orders yet 👀" />;

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
      <div className="overflow-y-auto h-[calc(100vh-330px)]">
        <table className="table table-zebra w-full table-fixed">
          <thead>
            <tr>
              <th>Prize</th>
            </tr>
          </thead>
          <tbody>{renderActivities()}</tbody>
        </table>
      </div>
    </div>
  );
};
