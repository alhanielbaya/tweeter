import React from 'react';

import './Login.scss';

import { GoogleLogin } from 'react-google-login';
import { googleSuccess } from '../../oauth-helpers/google';
import FacebookLogin from 'react-facebook-login';
import { facebookSuccess } from '../../oauth-helpers/facebook';
import { useHistory } from 'react-router';
import { setAuth, setProfile } from '../../store/user/userActions';
import { useDispatch } from 'react-redux';
import Axios from 'axios';
import { Iprofile } from '../../oauth-helpers/oauthTypes';

const Login: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  function loginCB(status: boolean) {
    dispatch(setAuth(status));
    Axios.get('users/').then((res: { data: { profile: Iprofile } }) => {
      dispatch(setProfile(res.data.profile));
      history.push('/home');
    });
  }

  function handleGoogle(res: any) {
    googleSuccess(res, (status: boolean) => loginCB(status));
  }
  function handleFacebook(res: any) {
    facebookSuccess(res, (status: boolean) => loginCB(status));
  }

  return (
    <div className='login-page-container'>
      <div className='text-container '>
        <h1 className='text-primary'>Login.</h1>

        <p>In order to post you need to log in.</p>
      </div>

      <div className='google-container icon-container'>
        <svg
          aria-hidden='true'
          focusable='false'
          data-prefix='fab'
          data-icon='google'
          className='text-primary'
          role='img'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 488 512'
        >
          <path
            fill='currentColor'
            d='M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z'
          ></path>
        </svg>
        <GoogleLogin
          clientId='343873122331-554k1urv7koadivfqikh0v8dgjedntdk.apps.googleusercontent.com'
          buttonText='Login'
          render={renderProps => (
            <button
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              id='my-signin2'
              className='btn btn-primary'
            >
              Login with Google
            </button>
          )}
          onSuccess={handleGoogle}
          onFailure={() => 0}
          cookiePolicy={'single_host_origin'}
        />
      </div>

      <div className='facebook-container icon-container'>
        <svg
          aria-hidden='true'
          focusable='false'
          data-prefix='fab'
          data-icon='facebook'
          className='text-primary'
          role='img'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 512 512'
          style={{ width: '250px', height: '250px', color: 'red' }}
        >
          <path
            fill='currentColor'
            d='M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z'
          ></path>
        </svg>
        <FacebookLogin
          appId='578602849606849'
          autoLoad={false}
          fields='name,email,picture'
          callback={handleFacebook}
          cssClass='btn btn-primary'
        />
      </div>

      <a href='/home' className='back-to-home btn btn-secondary'>
        Back to home
      </a>
    </div>
  );
};

export default Login;
