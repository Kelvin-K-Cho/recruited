import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import App from './components/App';
import reducers from './reducers'; //how does it know what file to take?
import reduxThunk from 'redux-thunk';
import logger from 'redux-logger';

import {fetchJob} from './actions/index';

const store = createStore(reducers, {}, applyMiddleware(reduxThunk, logger));

window.axios = axios;
window.fetchJob = fetchJob;

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.querySelector("#root")
);
