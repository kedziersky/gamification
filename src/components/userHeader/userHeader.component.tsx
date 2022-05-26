import { getAuth } from "firebase/auth";
import { PointsHeader } from "../pointsHeader";

export const UserHeaderComponent = () => {
  const { currentUser } = getAuth();
  const getName = currentUser?.displayName!.substring(
    0,
    currentUser?.displayName!.indexOf(" ")
  );
  return (
    <div>
      <div className="flex flex-row items-center justify-between">
        <h2 className="text-4xl text-white font-semibold">Hi {getName}!</h2>
        <img src={currentUser?.photoURL!} className="rounded-full w-12 " />
      </div>
      <PointsHeader uid={currentUser?.uid} />
    </div>
  );
};
