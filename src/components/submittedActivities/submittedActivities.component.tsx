import { getAuth } from "firebase/auth";
import { collection, orderBy, query } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../../services/firebase";
import { Loader } from "../loader";
import { SubmittedActivitiesItem } from "./submittedActivitiesItem";

export const SubmittedActivitiesComponent = () => {
  const { currentUser } = getAuth();

  const submissionssRef = collection(
    db,
    "users",
    `${currentUser!.uid}/submissions`
  );
  const navigate = useNavigate();

  const handleNavigation = (id: string) => {
    navigate(`/submissions/${id}`);
  };
  const [value, loading, error] = useCollection(
    query(submissionssRef, orderBy("createdOnDate", "desc"))
  );

  if (loading) return <Loader />;

  const renderActivities = () => {
    return value?.docs?.map((item, index) => {
      const id = item.id;

      return (
        <SubmittedActivitiesItem
          item={item.data()}
          index={index + 1}
          id={id}
          handleClick={() => handleNavigation(id)}
          key={id}
        />
      );
    });
  };

  return (
    <div>
      <div className="overflow-x-auto overflow-y-auto max-h-96">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th></th>
              <th>Activity</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>{renderActivities()}</tbody>
        </table>
      </div>
    </div>
  );
};
