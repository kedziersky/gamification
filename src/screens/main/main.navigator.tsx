import { Route, Routes } from "react-router-dom";
import { RequireAuth } from "../../modules/auth/auth.module";
import { Submissions } from "./submissions";
import { ActivityDetails } from "./activityDetails";
import { Home } from "./home";
import { SubmissionDetails } from "./submissionDetails";
import { Prizes } from "./prizes";
import { PrizeDetails } from "./prizeDetails";
import { Orders } from "./orders";
import { Leaderboard } from "./leaderboard";
import { Settings } from "./settings";
import { OrderDetails } from "./orderDetails";
import { useUserContext } from "../../hooks/useUser";
import { getAuth } from "firebase/auth";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import { db } from "../../services/firebase";
import { useEffect } from "react";
import { Add } from "./add";
import { AddActivity } from "./add/activity";
import { AddPrize } from "./add/prize";

export const MainNavigator = () => {
  const { addUserData } = useUserContext();

  const { currentUser } = getAuth();
  const [value, loading, error] = useDocumentData(
    doc(db, "users", currentUser!.uid)
  );

  useEffect(() => {
    if (value) {
      addUserData(value);
    }
  }, [loading, value]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        }
      />
      <Route
        path={`/activity/:id`}
        element={
          <RequireAuth>
            <ActivityDetails />
          </RequireAuth>
        }
      />
      <Route
        path="/submissions"
        element={
          <RequireAuth>
            <Submissions />
          </RequireAuth>
        }
      />
      <Route
        path="/submissions/:id"
        element={
          <RequireAuth>
            <SubmissionDetails />
          </RequireAuth>
        }
      />
      <Route
        path="/prizes"
        element={
          <RequireAuth>
            <Prizes />
          </RequireAuth>
        }
      />
      <Route
        path="/prizes/:id"
        element={
          <RequireAuth>
            <PrizeDetails />
          </RequireAuth>
        }
      />
      <Route
        path="/orders"
        element={
          <RequireAuth>
            <Orders />
          </RequireAuth>
        }
      />
      <Route
        path="/orders/:id"
        element={
          <RequireAuth>
            <OrderDetails />
          </RequireAuth>
        }
      />
      <Route
        path="/leaderboard"
        element={
          <RequireAuth>
            <Leaderboard />
          </RequireAuth>
        }
      />
      <Route
        path="/settings"
        element={
          <RequireAuth>
            <Settings />
          </RequireAuth>
        }
      />
      <Route
        path="/add"
        element={
          <RequireAuth>
            <Add />
          </RequireAuth>
        }
      />
      <Route
        path="/add/activity"
        element={
          <RequireAuth>
            <AddActivity />
          </RequireAuth>
        }
      />
      <Route
        path="/add/prize"
        element={
          <RequireAuth>
            <AddPrize />
          </RequireAuth>
        }
      />
    </Routes>
  );
};
