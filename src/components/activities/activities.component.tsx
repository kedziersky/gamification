import { useEffect } from "react";
import { useQuery } from "react-query";
import { collection, doc } from "firebase/firestore";

import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../services/firebase";
import { useNavigate } from "react-router-dom";
import { ActivityItem } from "./activityItem";
import { getAuth } from "firebase/auth";
import { Loader } from "../loader";

export const ActivitiesComponent = () => {
  const { currentUser } = getAuth();

  const [value, loading, error] = useCollection(collection(db, "activities"));

  const navigate = useNavigate();

  const handleNavigation = (id: string) => {
    navigate(`/activity/${id}`);
  };
  if (loading) return <Loader />;
  const renderActivities = () => {
    return value?.docs?.map((item, index) => {
      const id = item.id;
      return (
        <ActivityItem
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
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th></th>
              <th>Activity</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>{renderActivities()}</tbody>
        </table>
      </div>
    </div>
  );
};
