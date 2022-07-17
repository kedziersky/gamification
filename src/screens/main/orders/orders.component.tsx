import { collection, orderBy, query, where } from 'firebase/firestore';
import { isEmpty } from 'ramda';
import { useCollection } from 'react-firebase-hooks/firestore';
import { EmptyList } from '../../../components/emptyList';
import { Loader } from '../../../components/loader';
import { ScreenHeader } from '../../../components/screenHeader';
import { db } from '../../../services/firebase';
import { OrdersItem } from './ordersItem';

export const OrdersComponent = () => {
  const ordersRef = collection(db, 'orders');

  const [value, loading, error] = useCollection(
    query(ordersRef, where('status', '==', 'pending'), orderBy('createdOnDate', 'desc'))
  );
  const orders = value?.docs;

  if (loading) return <Loader />;

  const renderSubmissions = () => {
    return orders?.map((item, index) => {
      return <OrdersItem item={item.data()} index={index + 1} id={item.id} key={item.id} />;
    });
  };

  const renderContainer = () => {
    if (isEmpty(orders)) {
      return <EmptyList text="Currently there are no orders!" />;
    }
    return (
      <div className="overflow-y-auto h-[calc(100vh-330px)]">
        <table className="table table-zebra w-full table-fixed">
          <thead>
            <tr>
              <th>Prize</th>
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
      <p className="mb-5">Here admin can find orders that were submitted by players</p>
      {renderContainer()}
    </div>
  );
};
