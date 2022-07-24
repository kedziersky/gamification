import { collection } from 'firebase/firestore';
import { isEmpty } from 'ramda';
import { useCollection, useCollectionOnce } from 'react-firebase-hooks/firestore';
import { BackNavigation } from '../../../components/backNavgation';
import { EmptyList } from '../../../components/emptyList';
import { Loader } from '../../../components/loader';
import { ScreenHeader } from '../../../components/screenHeader';
import { db } from '../../../services/firebase';
import { LogsItemComponent } from './logsItem/logsItem.component';

export const LogsComponent = () => {
  const logsRef = collection(db, 'logs');

  const [value, loading, error] = useCollection(logsRef);
  const logs = value?.docs;

  const renderSubmissions = () => {
    return logs?.map((item, index) => {
      return <LogsItemComponent item={item.data()} index={index + 1} id={item.id} key={item.id} />;
    });
  };

  const renderContainer = () => {
    if (isEmpty(logs)) {
      return <EmptyList text="Currently there are no logs!" />;
    }
    return (
      <div className="overflow-y-auto h-[calc(100vh-330px)]">
        <table className="table table-zebra w-full table-fixed">
          <thead>
            <tr>
              <th>Log</th>
            </tr>
          </thead>
          <tbody>{renderSubmissions()}</tbody>
        </table>
      </div>
    );
  };

  if (loading) return <Loader />;

  return (
    <div>
      <BackNavigation />
      <ScreenHeader title="Logs" />
      {renderContainer()}
    </div>
  );
};
