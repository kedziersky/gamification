import { collection, orderBy, query, where } from 'firebase/firestore';
import { isEmpty } from 'ramda';
import { useCollection } from 'react-firebase-hooks/firestore';
import { EmptyList } from '../../../components/emptyList';
import { Loader } from '../../../components/loader';
import { ScreenHeader } from '../../../components/screenHeader';
import { db } from '../../../services/firebase';
import { SubmissionItem } from './submissionItem';

export const SubmissionHistoryComponent = () => {
  const submissionsRef = collection(db, 'submissions');

  const [value, loading, error] = useCollection(query(submissionsRef, where('status', '!=', 'pending')));

  const submissions = value?.docs;
  if (loading) return <Loader />;

  const renderSubmissions = () => {
    return submissions?.map((item, index) => {
      return <SubmissionItem item={item.data()} index={index + 1} id={item.id} key={item.id} />;
    });
  };

  const renderContainer = () => {
    if (isEmpty(submissions)) {
      return <EmptyList text={`Currently there are no submissions! Grab a coffee and relax! ☕️`} />;
    }
    return (
      <div className="overflow-y-auto h-[calc(100vh-330px)]">
        <table className="table table-zebra w-full table-fixed">
          <thead>
            <tr>
              <th>Activity</th>
            </tr>
          </thead>
          <tbody>{renderSubmissions()}</tbody>
        </table>
      </div>
    );
  };

  return (
    <div>
      <ScreenHeader title="Submissions History" />
      <p className="mb-5">As an admin you can see the submissions history here.</p>
      {renderContainer()}
    </div>
  );
};
