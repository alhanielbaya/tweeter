import React from 'react';

import { useDispatch } from 'react-redux';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import { isAuthenticated } from './auth/auth';
import {
  setAuth,
  setProfile,
  setFollowedUsers
} from './store/user/userActions';
import Axios from 'axios';
import { Iprofile } from './oauth-helpers/oauthTypes';
import Logout from './components/Logout/Logout';
import ProtectedRoute from './components/ProtectedRoute';
import LoginAuth from './components/LoginAuth';
import { useSocket } from './custom-hooks/custom-hooks';

const App: React.FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const socket = useSocket();
  isAuthenticated().then(isAuthenticated => {
    dispatch(setAuth(isAuthenticated));
    if (isAuthenticated) {
      Axios.get('users/').then((user: { data?: { profile: Iprofile } }) => {
        if (user.data) dispatch(setProfile(user.data.profile));
        Axios.get('users/followedUsers').then(
          (followedUsers: { data: number[] }) => {
            dispatch(setFollowedUsers(followedUsers.data));
          }
        );
      });
    }
  });

  React.useEffect(() => {
    // isAuthenticated().then(auth => {
    //   dispatch(setAuth(auth));
    // });

    socket.on('follow success', (data: any) => {
      dispatch(setFollowedUsers(data));
    });

    socket.on('unfollow success', (data: any) => {
      dispatch(setFollowedUsers(data));
    });

    return () => {
      socket.off('follow success');
      socket.off('unfollow success');
    };
  }, []);

  return (
    <>
      {location.pathname === '/' ? <Redirect to='/home'></Redirect> : ''}
      <Switch>
        <Route exact path='/home' component={Home}></Route>
        <ProtectedRoute
          exact
          path='/followed'
          component={Home}
        ></ProtectedRoute>
        <LoginAuth exact path='/login' component={Login}></LoginAuth>
        <Route exact path='/logout' component={Logout}></Route>
        <Route
          path='*'
          component={() => <Redirect to='/home'></Redirect>}
        ></Route>
      </Switch>
    </>
  );
};

export default App;
