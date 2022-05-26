import { getAuth } from "firebase/auth";
import { doc } from "firebase/firestore";
import { useEffect } from "react";
import {
  useDocumentData,
  useDocumentDataOnce,
} from "react-firebase-hooks/firestore";
import { Activities } from "../../../components/activities";
import { ScreenHeader } from "../../../components/screenHeader";
import { SubmittedActivities } from "../../../components/submittedActivities";
import { TabView } from "../../../components/tabView";
import { UserHeader } from "../../../components/userHeader";
import { useUserContext } from "../../../hooks/useUser";
import { db } from "../../../services/firebase";

export const HomeComponent = () => {
  const renderView = [
    {
      name: "Available",
      component: <Activities />,
    },
    {
      name: "Submitted",
      component: <SubmittedActivities />,
    },
  ];

  return (
    <div>
      <UserHeader />
      <ScreenHeader title="Activities list" />
      <TabView renderView={renderView} />
    </div>
  );
};
