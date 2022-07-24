import { Route, Routes } from 'react-router-dom';

import { Submissions } from '../screens/main/submissions';
import { ActivityDetails } from '../screens/main/activityDetails';
import { Home } from '../screens/main/home';
import { SubmissionDetails } from '../screens/main/submissionDetails';
import { Prizes } from '../screens/main/prizes';
import { PrizeDetails } from '../screens/main/prizeDetails';
import { Orders } from '../screens/main/orders';
import { Leaderboard } from '../screens/main/leaderboard';
import { Settings } from '../screens/main/settings';
import { OrderDetails } from '../screens/main/orderDetails';

import { Add } from '../screens/main/add';
import { AddActivity } from '../screens/main/add/activity';
import { AddPrize } from '../screens/main/add/prize';
import { AuthRoute } from './authRoute';
import { UnauthRoute } from './unauthRoute';
import { SignIn } from '../screens/auth/signin';
import { LayoutBottomNavigator } from '../layouts/layoutBottomNavigator';
import { SubmissionHistory } from '../screens/main/submissionHistory';
import { AddPoints } from '../screens/main/add/points';
import { Logs } from '../screens/main/logs';

export const NavigatorComponent = () => {
  return (
    <Routes>
      <Route path="/signin" element={<UnauthRoute />}>
        <Route path="/signin" element={<SignIn />} />
      </Route>
      <Route path="/" element={<AuthRoute />}>
        <Route
          path="/"
          element={
            <LayoutBottomNavigator>
              <Home />
            </LayoutBottomNavigator>
          }
        />
      </Route>
      <Route path="/activity/:id" element={<AuthRoute />}>
        <Route
          path={`/activity/:id`}
          element={
            <LayoutBottomNavigator>
              <ActivityDetails />
            </LayoutBottomNavigator>
          }
        />
      </Route>
      <Route path="/submissions" element={<AuthRoute />}>
        <Route
          path="/submissions"
          element={
            <LayoutBottomNavigator>
              <Submissions />
            </LayoutBottomNavigator>
          }
        />
      </Route>
      <Route path="/submissions/:id" element={<AuthRoute />}>
        <Route
          path="/submissions/:id"
          element={
            <LayoutBottomNavigator>
              <SubmissionDetails />
            </LayoutBottomNavigator>
          }
        />
      </Route>
      <Route path="/prizes" element={<AuthRoute />}>
        <Route
          path="/prizes"
          element={
            <LayoutBottomNavigator>
              <Prizes />
            </LayoutBottomNavigator>
          }
        />
      </Route>
      <Route path="/prizes/:id" element={<AuthRoute />}>
        <Route
          path="/prizes/:id"
          element={
            <LayoutBottomNavigator>
              <PrizeDetails />
            </LayoutBottomNavigator>
          }
        />
      </Route>
      <Route path="/orders" element={<AuthRoute />}>
        <Route
          path="/orders"
          element={
            <LayoutBottomNavigator>
              <Orders />
            </LayoutBottomNavigator>
          }
        />
      </Route>
      <Route path="/orders/:id" element={<AuthRoute />}>
        <Route
          path="/orders/:id"
          element={
            <LayoutBottomNavigator>
              <OrderDetails />
            </LayoutBottomNavigator>
          }
        />
      </Route>
      <Route path="/leaderboard" element={<AuthRoute />}>
        <Route
          path="/leaderboard"
          element={
            <LayoutBottomNavigator>
              <Leaderboard />
            </LayoutBottomNavigator>
          }
        />
      </Route>
      <Route path="/settings" element={<AuthRoute />}>
        <Route
          path="/settings"
          element={
            <LayoutBottomNavigator>
              <Settings />
            </LayoutBottomNavigator>
          }
        />
      </Route>
      <Route path="/add" element={<AuthRoute />}>
        <Route
          path="/add"
          element={
            <LayoutBottomNavigator>
              <Add />
            </LayoutBottomNavigator>
          }
        />
      </Route>
      <Route
        path="/add/activity"
        element={
          <LayoutBottomNavigator>
            <AuthRoute />
          </LayoutBottomNavigator>
        }
      >
        <Route
          path="/add/activity"
          element={
            <LayoutBottomNavigator>
              <AddActivity />
            </LayoutBottomNavigator>
          }
        />
      </Route>
      <Route path="/add/prize" element={<AuthRoute />}>
        <Route
          path="/add/prize"
          element={
            <LayoutBottomNavigator>
              <AddPrize />
            </LayoutBottomNavigator>
          }
        />
      </Route>
      <Route path="/add/points" element={<AuthRoute />}>
        <Route
          path="/add/points"
          element={
            <LayoutBottomNavigator>
              <AddPoints />
            </LayoutBottomNavigator>
          }
        />
      </Route>
      <Route path="/history" element={<AuthRoute />}>
        <Route
          path="/history"
          element={
            <LayoutBottomNavigator>
              <SubmissionHistory />
            </LayoutBottomNavigator>
          }
        />
      </Route>
      <Route path="/logs" element={<AuthRoute />}>
        <Route
          path="/logs"
          element={
            <LayoutBottomNavigator>
              <Logs />
            </LayoutBottomNavigator>
          }
        />
      </Route>
    </Routes>
  );
};
