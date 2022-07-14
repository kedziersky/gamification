import { faBolt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { doc, updateDoc } from 'firebase/firestore';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { BackNavigation } from '../../../components/backNavgation';
import { DetailsItem } from '../../../components/detailsItem';
import { Loader } from '../../../components/loader';
import { ScreenHeader } from '../../../components/screenHeader';
import { Status } from '../../../components/status';
import { useUserContext } from '../../../hooks/useUser';
import { db } from '../../../services/firebase';
import { triggerToast } from '../../../utils/triggerToast';

export const SubmissionDetailsComponent = () => {
  const { id } = useParams();
  const submissionRef = doc(db, 'submissions', id!);

  const { user } = useUserContext();
  const [value, loading, error] = useDocumentData(doc(db, 'submissions', id!));

  const navigate = useNavigate();

  const handleAccept = async () => {
    try {
      await updateDoc(submissionRef, {
        status: 'accepted',
        acceptedOnDate: Date.now(),
        reviewer: user.userName,
      });
      triggerToast(
        'The submission was accepted successfuly!',
        'success',
        <FontAwesomeIcon icon={faBolt} color="#83E933" />
      );
      navigate('/submissions');
    } catch (e) {
      triggerToast('Some error occurred', 'error', false);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      await updateDoc(submissionRef, {
        status: 'rejected',
        rejectionMessage: data.rejectMessage,
        rejectedOnDate: Date.now(),
        reviewer: user.userName,
      });
      triggerToast(
        'The submission was rejected successfuly!',
        'success',
        <FontAwesomeIcon icon={faBolt} color="#83E933" />
      );
      navigate('/submissions');
    } catch (e) {
      triggerToast('Some error occurred', 'error', false);
    }
  };

  if (loading) return <Loader />;

  const renderViewCondition = () => {
    if (user?.role === 'admin') {
      return (
        <>
          <button className="btn btn-primary w-full mb-5" onClick={handleAccept}>
            Accept
          </button>

          <label htmlFor="my-modal-4" className="btn btn-error w-full mb-5">
            Reject
          </label>

          <input type="checkbox" id="my-modal-4" className="modal-toggle" />
          <label htmlFor="my-modal-4" className="modal cursor-pointer">
            <label className="modal-box relative flex flex-col " htmlFor="">
              <h3 className="text-lg font-bold">You're about to reject the submission!</h3>
              <p>Please write an explanation why</p>
              <form onSubmit={handleSubmit(onSubmit)}>
                <textarea
                  className="p-4 text-black mt-5 mb-5 resize-none w-full h-40"
                  placeholder=""
                  required
                  {...register('rejectMessage', { required: true })}
                />

                <button className="btn w-full" type="submit">
                  Submit
                </button>
              </form>
            </label>
          </label>
        </>
      );
    }

    return (
      <>
        <DetailsItem label="Status" />
        <Status status={value?.status} />
        <div className="mb-3" />
        <DetailsItem label="Reviewed by" text={value?.reviewer} />
        <div className="mb-3" />
        {value?.rejectionMessage && <DetailsItem label="Rejection message" text={value?.rejectionMessage} />}
      </>
    );
  };
  return (
    <div>
      <BackNavigation />
      <ScreenHeader title="Submission Details" />
      <DetailsItem label="Activity name" text={value?.name} />
      <DetailsItem label="Activity description" text={value?.description} />
      <DetailsItem
        label="Volts"
        text={value?.points}
        icon={<FontAwesomeIcon icon={faBolt} color="#83E933" className="mr-2" />}
      />
      <DetailsItem label="User" text={value?.userName} />
      <DetailsItem label="Solution" text={value?.solution} />
      {value?.attachment && <DetailsItem label="Attachment" attachmentURL={value?.attachment} />}
      {renderViewCondition()}
    </div>
  );
};
