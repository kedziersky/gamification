import { collection, orderBy, query, where } from 'firebase/firestore';
import { isEmpty } from 'ramda';
import { useCollection } from 'react-firebase-hooks/firestore';
import { EmptyList } from '../../../components/emptyList';
import { ScreenHeader } from '../../../components/screenHeader';
import { db } from '../../../services/firebase';
import { SubmissionItem } from './submissionItem';

export const SubmissionsComponent = () => {
  const submissionsRef = collection(db, 'submissions');

  const [value, loading, error] = useCollection(
    query(submissionsRef, where('status', '==', 'pending'), orderBy('createdOnDate', 'desc'))
  );

  const submissions = value?.docs;
  if (loading) return <progress className="progress w-56" />;

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
      <div className="overflow-x-auto overflow-y-auto h-[calc(100vh-300px)]">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th></th>
              <th>Activity</th>
              <th>Player</th>
              <th>Submission date</th>
            </tr>
          </thead>
          <tbody>{renderSubmissions()}</tbody>
        </table>
      </div>
    );
  };

  return (
    <div>
      <ScreenHeader title="Submissions" />
      <p className="mb-5">As an admin you can review and accept or reject the submissions.</p>
      {renderContainer()}
    </div>
  );
};
