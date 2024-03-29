import { faBolt, faRemove } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { collection, deleteDoc, doc, setDoc, where, query, getDocs } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';
import { useState } from 'react';
import { useDocument } from 'react-firebase-hooks/firestore';
import { useUploadFile } from 'react-firebase-hooks/storage';
import Compressor from 'compressorjs';
import Zoom from 'react-medium-image-zoom';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import { BackNavigation } from '../../../components/backNavgation';
import { DetailsItemComponent } from '../../../components/detailsItem/detailsItem.component';
import { Loader } from '../../../components/loader';
import { ScreenHeader } from '../../../components/screenHeader';
import { useUserContext } from '../../../hooks/useUser';
import { db, storage } from '../../../services/firebase';
import { triggerToast } from '../../../utils/triggerToast';

export const ActivityDetailsComponent = () => {
  const navigate = useNavigate();
  const [submissionLimit, setSubmissionLimit] = useState(0);
  const { id } = useParams();

  const { user } = useUserContext();

  const [value, loading, error] = useDocument(doc(db, 'activities', id!));

  const submissionsRef = collection(db, `submissions`);
  const userSubmissionsRef = collection(db, `users/${user.userId}/submissions`);
  const activity = value?.data();

  if (activity?.submissionLimit) {
    const q = query(userSubmissionsRef, where('activityId', '==', id), where('status', '!=', 'rejected'));

    const querySnapshot = async () => {
      try {
        const response = await getDocs(q);
        setSubmissionLimit(response.docs.length);
      } catch (e) {
        console.log(e);
      }
    };
    querySnapshot();
  }

  const [uploadFile, uploading, snapshot, errorUpload] = useUploadFile();

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
    watch,
  } = useForm();

  const watchFile = watch('attachment', null);

  const handleResetImage = () => {
    resetField('attachment');
  };

  const onSubmit = async (data: any) => {
    let url = null;

    try {
      const currentDate = new Date();
      const timestamp = currentDate.getTime();
      if (data?.attachment.length) {
        const time = Date.now();
        const file = data.attachment[0];
        new Compressor(file, {
          quality: 0.8,
          success: async (compressedResult) => {
            const storageRef = ref(storage, `/submissions/${file.name}-${time}`);

            const result = await uploadFile(storageRef, compressedResult, {
              contentType: 'image/png',
            });

            if (result) {
              url = await getDownloadURL(result.ref);
              await setDoc(doc(submissionsRef), {
                ...activity,
                userName: user?.userName,
                userId: user?.userId,
                solution: data.solution,
                attachment: url,
                status: 'pending',
                activityId: id,
                createdOnDate: timestamp,
                acceptedOnDate: null,
                rejectedOnDate: null,
              });
            }
          },
          error: (e) => console.log(e),
        });
      }

      if (!data?.attachment.length) {
        await setDoc(doc(submissionsRef), {
          ...activity,
          userName: user?.userName,
          userId: user?.userId,
          solution: data.solution,
          attachment: null,
          status: 'pending',
          activityId: id,
          createdOnDate: timestamp,
          acceptedOnDate: null,
          rejectedOnDate: null,
        });
      }
      triggerToast('The submission was successful!', 'success', <FontAwesomeIcon icon={faBolt} color="#83E933" />);

      navigate('/', { replace: true });
    } catch (e) {
      console.log(e);
      triggerToast('Some error occured during the submission.', 'error', '😢');
    }
  };
  const handleRemove = () => {
    deleteDoc(doc(db, 'activities', id!));
    navigate('/');
  };
  const renderButton = () => {
    if (submissionLimit >= activity?.submissionLimit && user.role === 'admin') {
      return (
        <>
          <label htmlFor="modal-remove" className="btn w-full modal-button bg-error text-black">
            Remove activity
          </label>
          <p className="mt-5">You've reached the submission limit!</p>
        </>
      );
    }
    if (submissionLimit >= activity?.submissionLimit) {
      return <p>You've reached the submission limit!</p>;
    }
    if (user.role === 'admin') {
      return (
        <>
          <label htmlFor="modal-remove" className="btn w-full modal-button bg-error text-black">
            Remove activity
          </label>
          <label htmlFor="modal-submit" className="btn modal-button w-full mt-5">
            Submit activity
          </label>
        </>
      );
    }
    return (
      <label htmlFor="modal-submit" className="btn modal-button w-full">
        Submit activity
      </label>
    );
  };
  const renderModalSubmit = () => {
    return (
      <>
        <input type="checkbox" id="modal-submit" className="modal-toggle" />

        <label htmlFor="modal-submit" className="modal cursor-pointer">
          <label className="modal-box relative flex flex-col " htmlFor="">
            <h3 className="text-lg font-bold">Prove that you've done this activity!</h3>
            <p>
              Below provide your inputs on this activity. It can be an URL, a message explaining what you've done, etc..
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <textarea
                className="p-4 text-black mt-5 mb-5 resize-none w-full h-40"
                placeholder=""
                required
                {...register('solution', { required: true })}
              />
              <input
                type="file"
                accept="image/png,image/jpeg"
                className="hidden"
                {...register('attachment')}
                name="attachment"
                id="attachment"
              />
              <div className="flex items-center">
                <label
                  htmlFor="attachment"
                  className="inline-block mb-7 text-sm text-grey-500
            mr-5 py-2 px-6
            rounded-full border-0
            font-medium
            bg-accent text-white
            cursor-pointer w-fit"
                >
                  Choose a file
                </label>
                {watchFile?.length > 0 && (
                  <div className="relative">
                    <Zoom>
                      <img src={URL.createObjectURL(watchFile[0])} className="w-24" />
                    </Zoom>
                    <button
                      onClick={handleResetImage}
                      className="absolute -right-1 -top-1 rounded-full bg-red-600 w-5 h-5 flex items-center justify-center"
                    >
                      <FontAwesomeIcon icon={faRemove} color="white" size="xs" />
                    </button>
                  </div>
                )}
              </div>
              <button className="btn w-full mt-5" type="submit">
                Submit
              </button>
            </form>
          </label>
        </label>
      </>
    );
  };
  const renderModalRemove = () => {
    return (
      <>
        <input type="checkbox" id="modal-remove" className="modal-toggle" />
        <label htmlFor="modal-remove" className="modal cursor-pointer">
          <label className="modal-box relative flex flex-col " htmlFor="">
            <h3 className="text-lg font-bold">You're about to remove the Actvity!</h3>
            <p>Are you sure you want to do that?</p>

            <button className="btn bg-error w-full text-black mt-10" onClick={handleRemove}>
              Remove!
            </button>
          </label>
        </label>
      </>
    );
  };

  if (loading) return <Loader />;

  return (
    <div>
      <BackNavigation />
      <ScreenHeader title="Activity Details" />
      <DetailsItemComponent label="Name" text={activity?.name} />
      <DetailsItemComponent label="Description" text={activity?.description} />
      <DetailsItemComponent
        label="Volts"
        text={activity?.points}
        icon={<FontAwesomeIcon icon={faBolt} color="#83E933" className="mr-2" />}
      />

      {activity?.submissionLimit && <DetailsItemComponent label="Submission limit" text={activity?.submissionLimit} />}

      {renderButton()}

      {renderModalRemove()}
      {renderModalSubmit()}
    </div>
  );
};
