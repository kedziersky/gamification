import { faBolt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { collection, doc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BackNavigation } from '../../../../components/backNavgation';
import { ScreenHeader } from '../../../../components/screenHeader';
import { db } from '../../../../services/firebase';
import { useUserContext } from '../../../../hooks/useUser';

import { triggerToast } from '../../../../utils/triggerToast';

export const AddPointsComponent = () => {
  const { register: registerPlayer, handleSubmit: handleSubmitPlayer, reset: resetPlayer } = useForm();

  const { register: registerOption, handleSubmit: handleSubmitOption, reset: resetOptions } = useForm();
  const logsRef = doc(collection(db, 'logs'));

  const [player, setPlayer] = useState<any>();

  const { user } = useUserContext();

  const onPlayerSearch = async (data: any) => {
    const usersRef = collection(db, `users`);
    const q = query(usersRef, where('email', '==', data.email));
    const response = await getDocs(q);

    if (!response.docs.length) {
      return triggerToast('There is no player with this address email 👀', 'error', null);
    }

    /* if (data.email === user.email) {
      return triggerToast("You're not able to add points to yourself! 🧐", 'error', null);
    } */
    setPlayer({ ...response.docs[0].data(), userId: response.docs[0].id });
  };

  const onPointsSubmit = async (data: any) => {
    const userRef = doc(db, 'users', player.userId);
    if (data.option === 'add') {
      await updateDoc(userRef, {
        totalPoints: parseInt(player.totalPoints) + parseInt(data.points),
        seasonPoints: parseInt(player.seasonPoints) + parseInt(data.points),
        availablePoints: parseInt(player.availablePoints) + parseInt(data.points),
      });
      const log = {
        action: { name: 'Points added', value: data.points },
        user: { ...player },
        admin: user.userName,
        createdOnDate: Date.now(),
      };
      await setDoc(logsRef, log);
      resetOptions();
      resetPlayer();
      setPlayer(null);
      triggerToast("You've added Volts successfuly!", 'success', <FontAwesomeIcon icon={faBolt} color="#83E933" />);
    }
    if (data.option === 'remove' && parseInt(player.totalPoints) < parseInt(data.points)) {
      return triggerToast('You want to remove more Volts than this player has! 👀', 'error', null);
    }
    if (data.option === 'remove') {
      await updateDoc(userRef, {
        totalPoints: parseInt(player.totalPoints) - parseInt(data.points),
        seasonPoints: parseInt(player.seasonPoints) - parseInt(data.points),
        availablePoints: parseInt(player.availablePoints) - parseInt(data.points),
      });

      const log = {
        action: { name: 'Points removed', value: data.points },
        user: { ...player },
        admin: user.userName,
        createdOnDate: Date.now(),
      };
      await setDoc(logsRef, log);

      resetOptions();
      resetPlayer();
      setPlayer(null);
      triggerToast("You've removed Volts successfuly!", 'success', <FontAwesomeIcon icon={faBolt} color="#83E933" />);
    }
  };

  const renderOptions = () => {
    if (player) {
      return (
        <form className="form-control mt-5" onSubmit={handleSubmitOption(onPointsSubmit)}>
          <label className="label">
            <span className="label-text">Volts amount</span>
          </label>
          <input
            type="number"
            placeholder="Type here"
            className="input input-bordered w-full"
            {...registerOption('points', { required: true, max: 500 })}
          />
          <div className="form-control mb-5 mt-5">
            <label className="cursor-pointer flex items-center">
              <input
                type="radio"
                className="radio checked:bg-green-500 mr-5"
                checked
                value={'add'}
                {...registerOption('option')}
              />
              <span className="label-text">Add Volts</span>
            </label>
          </div>
          <div className="form-control mb-5">
            <label className="cursor-pointer flex items-center">
              <input
                type="radio"
                value={'remove'}
                className="radio checked:bg-red-500 mr-5"
                {...registerOption('option', { required: true })}
              />
              <span className="label-text">Remove Volts</span>
            </label>
          </div>
          <button className="btn">Submit</button>
        </form>
      );
    }
  };

  return (
    <div>
      <BackNavigation />
      <ScreenHeader title="Add/Remove Points" />
      <div className="form-control w-full">
        <form className="form-control" onSubmit={handleSubmitPlayer(onPlayerSearch)}>
          <label className="label">
            <span className="label-text">Address email</span>
          </label>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full"
            {...registerPlayer('email', { required: true })}
          />

          <button className="btn mt-5">Search</button>
        </form>
        {renderOptions()}
      </div>
    </div>
  );
};
