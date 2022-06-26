import { Activities } from "../../../components/activities";
import { ScreenHeader } from "../../../components/screenHeader";
import { SubmittedActivities } from "../../../components/submittedActivities";
import { TabView } from "../../../components/tabView";
import { UserHeader } from "../../../components/userHeader";

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
