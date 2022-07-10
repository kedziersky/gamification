import { faBolt, faRemove } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { collection, doc, setDoc } from 'firebase/firestore';
import { useForm } from 'react-hook-form';
import { BackNavigation } from '../../../../components/backNavgation';
import { ScreenHeader } from '../../../../components/screenHeader';
import { db, storage } from '../../../../services/firebase';
import { triggerToast } from '../../../../utils/triggerToast';
import { getDownloadURL, ref } from 'firebase/storage';
import { useUploadFile } from 'react-firebase-hooks/storage';
import Compressor from 'compressorjs';
import Zoom from 'react-medium-image-zoom';

export const AddPrizeComponent = () => {
  const {
    register,
    handleSubmit,
    reset,
    resetField,
    watch,
    formState: { errors },
  } = useForm();
  const submissionsRef = collection(db, 'prizes');
  const [uploadFile, uploading, snapshot, errorUpload] = useUploadFile();
  const watchFile = watch('attachment', null);

  const handleResetImage = () => {
    resetField('attachment');
  };

  const onSubmit = async (data: any) => {
    data.price = parseInt(data.price);
    try {
      if (data?.attachment.length) {
        const time = Date.now();
        const file = data.attachment[0];
        new Compressor(file, {
          quality: 0.8,
          success: async (compressedResult) => {
            const storageRef = ref(storage, `/prizes/${file.name}-${time}`);

            const result = await uploadFile(storageRef, compressedResult, {
              contentType: 'image/png',
            });

            if (result) {
              const url = await getDownloadURL(result.ref);
              await setDoc(doc(submissionsRef), {
                ...data,
                attachment: url,
              });
            }
          },
          error: (e) => console.log(e),
        });
      }
      if (!data?.attachment.length) {
        await setDoc(doc(submissionsRef), {
          ...data,
          createdOnDate: Date.now(),
          attachment: null,
        });
      }
      triggerToast("You've added the prize successfuly!", 'success', <FontAwesomeIcon icon={faBolt} color="#83E933" />);
      reset();
    } catch (e) {
      console.log(e);
      triggerToast('Some error occured during the submission.', 'error', '😢');
    }
  };

  return (
    <div>
      <BackNavigation />
      <ScreenHeader title="Add Prize" />
      <div className="form-control w-full">
        <form className="form-control" onSubmit={handleSubmit(onSubmit)}>
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full "
            {...register('name', { required: true })}
          />
          <label className="label">
            <span className="label-text">Price</span>
          </label>
          <input
            type="number"
            placeholder="Type here"
            className="input input-bordered w-full"
            {...register('price', { required: true })}
          />
          <label className="label">
            <span className="label-text">Prize url</span>
          </label>
          <input type="text" className="input input-bordered w-full " {...register('url')} defaultValue={''} />

          <label className="label">
            <span className="label-text">Is it available?</span>
          </label>
          <input type="checkbox" checked className="toggle toggle-primary" {...register('isAvailable')} />
          <label className="label">
            <span className="label-text">Image</span>
          </label>

          <input
            type="file"
            accept="image/png,image/jpeg"
            className="hidden"
            {...register('attachment')}
            name="attachment"
            id="attachment"
          />
          <div className="flex items-center mb-5">
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
          <button className="btn">Submit</button>
        </form>
      </div>
    </div>
  );
};
