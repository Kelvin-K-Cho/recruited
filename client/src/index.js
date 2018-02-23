/*eslint max-len: ["error", { "ignoreComments": true }]*/
/*
Axios is a javascript library that allows us to to make http requests from Nodejs and it
supports promises. As a bonus.  Axios automatically converts the promise into a json data object.
*/
import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import App from './components/App';
//reducers searches for and takes index.js if present
import reducers from './reducers';
import reduxThunk from 'redux-thunk';
import logger from 'redux-logger';

// import { fetchJob } from './actions/index';

const store = createStore(reducers, {}, applyMiddleware(reduxThunk, logger));

window.axios = axios;
// window.fetchJob = fetchJob;
window.getState = store.getState;

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.querySelector("#root")
);
