import { Link } from "react-router-dom";
import { ScreenHeader } from "../../../components/screenHeader";

export const AddComponent = () => {
  return (
    <div>
      <ScreenHeader title="Add" />
      <p className="mb-5">
        As an admin you can add here a new activity or prize
      </p>
      <Link to="/add/activity" className="btn w-full mb-3">
        Add activity
      </Link>
      <Link to="/add/prize" className="btn w-full mb-3">
        Add prize
      </Link>
    </div>
  );
};
