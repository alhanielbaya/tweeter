/// <reference types="react-dom/experimental" />
/// <reference types="react/experimental" />

import React from 'react';
import ReactDOM from 'react-dom';

import { applyMiddleware, createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import * as serviceWorker from './serviceWorker';
import './index.scss';
import './_variables.scss';
import 'spectre.css';

import { userReducer } from './store/user/userReducer';
import { tweetsReducer } from './store/tweets/tweetsReducer';
import { IuserState } from './store/user/userTypes';
import { ItweetsState } from './store/tweets/tweetsTypes';
import thunk from 'redux-thunk';
import { socketReducer } from './store/socketReducer';

export interface IRootState {
  user: IuserState;
  tweets: ItweetsState;
  socket: {
    socket: any;
  };
}

const rootReducer = combineReducers({
  user: userReducer,
  tweets: tweetsReducer,
  socket: socketReducer
});
const store = createStore(rootReducer, applyMiddleware(thunk));

const root = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();

// hrllo
