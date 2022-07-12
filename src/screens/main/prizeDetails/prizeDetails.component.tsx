import { faBolt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getAuth } from 'firebase/auth';
import { collection, deleteDoc, doc, setDoc, updateDoc } from 'firebase/firestore';

import { useDocumentData } from 'react-firebase-hooks/firestore';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { BackNavigation } from '../../../components/backNavgation';
import { DetailsItem } from '../../../components/detailsItem';
import { Loader } from '../../../components/loader';
import { ScreenHeader } from '../../../components/screenHeader';
import { db } from '../../../services/firebase';
import { triggerToast } from '../../../utils/triggerToast';

export const PrizeDetailsComponent = () => {
  const { id } = useParams();
  const prizesRef = doc(db, 'prizes', id!);
  const { currentUser } = getAuth();
  const usersRef = doc(db, 'users', currentUser!.uid);
  const ordersRef = doc(collection(db, 'orders'));
  const [value, loading, error] = useDocumentData(prizesRef);
  const [user, userLoading, userError] = useDocumentData(usersRef);

  const { register, handleSubmit, watch } = useForm();

  const { register: registerEditField, handleSubmit: handleEditSubmit, watch: watchEdit } = useForm();

  const watchIsHomeAddress = watch('isHomeAddress', false);
  const watchIsPaczkomat = watch('isPaczkomat', false);
  const watchIsAvailable = watchEdit('isAvailable');

  const navigate = useNavigate();

  const handleOrder = async (data: any) => {
    await setDoc(ordersRef, {
      prizeId: id,
      prizeName: value?.name,
      price: value?.price,
      status: 'pending',
      userId: currentUser?.uid,
      userName: currentUser?.displayName,
      createdOnDate: Date.now(),
      orderStreet: data?.orderStreet ?? null,
      orderCity: data?.orderCity ?? null,
      orderPostcode: data?.orderPostcode ?? null,
      orderCountry: data?.orderCountry ?? null,
      isHomeAddress: data?.isHomeAddress,
      isPaczkomat: data?.isPaczkomat,
      paczkomatNumber: data?.paczkomatNumber ?? null,
      additionalInfo: data?.additionalInfo,
      fulfilledOnDate: null,
    });
    triggerToast('The order was successful!', 'success', <FontAwesomeIcon icon={faBolt} color="#83E933" />);
    navigate('/prizes', { replace: true });
  };

  const handleEdit = async (data: any) => {
    await updateDoc(prizesRef, { ...data });
  };

  const handleRemove = () => {
    deleteDoc(doc(db, 'prizes', id!));
    navigate('/prizes');
  };

  const renderPaczkomat = () => {
    return (
      <>
        <label className="label">
          <span className="label-text">Paczkomat number</span>
        </label>
        <input
          placeholder="Type here"
          className="input input-bordered w-full"
          {...register('paczkomatNumber', {
            required: watchIsPaczkomat,
            value: null,
          })}
        />
      </>
    );
  };

  const renderAddressFields = () => (
    <>
      <label className="label">
        <span className="label-text">Street and apartment number</span>
      </label>
      <input
        placeholder="Type here"
        className="input input-bordered w-full"
        {...register('orderStreet', {
          required: watchIsHomeAddress,
          value: null,
        })}
      />
      <label className="label">
        <span className="label-text">City</span>
      </label>
      <input
        placeholder="Type here"
        className="input input-bordered w-full"
        {...register('orderCity', {
          required: watchIsHomeAddress,
          value: null,
        })}
      />
      <label className="label">
        <span className="label-text">Postcode</span>
      </label>
      <input
        placeholder="Type here"
        className="input input-bordered w-full"
        {...register('orderPostcode', {
          required: watchIsHomeAddress,
          value: null,
        })}
      />
      <label className="label">
        <span className="label-text">Country</span>
      </label>
      <input
        placeholder="Type here"
        className="input input-bordered w-full mb-5"
        {...register('orderCountry', { required: watchIsHomeAddress })}
      />
    </>
  );

  const renderAdminContent = () => {
    if (user?.role === 'admin') {
      return (
        <>
          <form onSubmit={handleEditSubmit(handleEdit)}>
            <label className="label">
              <span className="label-text">Is available?</span>
            </label>
            <input
              type="checkbox"
              className="toggle toggle-primary"
              {...registerEditField('isAvailable', {
                value: value?.isAvailable,
              })}
            />
            <button
              className="btn bg-info w-full text-black mt-10 mb-5"
              disabled={watchIsAvailable === value?.isAvailable}
            >
              Save changes
            </button>
          </form>
          <label htmlFor="my-modal-4" className="btn w-full modal-button bg-error text-black">
            Remove prize
          </label>
          <input type="checkbox" id="my-modal-4" className="modal-toggle" />
          <label htmlFor="my-modal-4" className="modal cursor-pointer">
            <label className="modal-box relative flex flex-col " htmlFor="">
              <h3 className="text-lg font-bold">You're about to remove the prize!</h3>
              <p>Are you sure you want to do that?</p>

              <button className="btn bg-error w-full text-black mt-10" onClick={handleRemove}>
                Remove!
              </button>
            </label>
          </label>
        </>
      );
    }

    return (
      <>
        <label htmlFor="my-modal-4" className="btn w-full btn-primary modal-button">
          Order prize
        </label>
        <input type="checkbox" id="my-modal-4" className="modal-toggle" />
        <label htmlFor="my-modal-4" className="modal cursor-pointer">
          <label className="modal-box relative flex flex-col " htmlFor="">
            <h3 className="text-lg font-bold">You're about to order the prize!</h3>
            <p>Do you want to collect it in the office or send it to your home address?</p>
            <form onSubmit={handleSubmit(handleOrder)}>
              <label className="label mt-5">
                <span className="label-text">Send it to home address</span>
              </label>
              <input type="checkbox" className="toggle toggle-primary" {...register('isHomeAddress')} />
              {watchIsHomeAddress && renderAddressFields()}
              <label className="label">
                <span className="label-text">Send it to Paczkomat</span>
              </label>
              <input type="checkbox" className="toggle toggle-primary" {...register('isPaczkomat')} />
              {watchIsPaczkomat && renderPaczkomat()}
              <label className="label">
                <span className="label-text">Additional info</span>
              </label>
              <textarea
                className="p-4 text-black mb-5 resize-none w-full h-40"
                placeholder=""
                {...register('additionalInfo')}
              />
              <button className={`btn btn-primary w-full mt-3`}>Order</button>
            </form>
          </label>
        </label>
      </>
    );
  };

  const renderOrderCondition = () => {
    if (user?.role !== 'admin' && user?.availablePoints < value?.price) {
      return <p className="text-error">You don't have enough points to order this prize</p>;
    }
    return renderAdminContent();
  };

  if (loading) return <Loader />;
  return (
    <div>
      <BackNavigation />
      <ScreenHeader title="Prize details" />
      <DetailsItem label="Name" text={value?.name} />
      <DetailsItem label="Price" text={value?.price} />
      {value?.url && <DetailsItem label="Prize URL" text={value?.url} />}
      {value?.attachment && <DetailsItem label="Photo" attachmentURL={value?.attachment} />}

      {renderOrderCondition()}
    </div>
  );
};
