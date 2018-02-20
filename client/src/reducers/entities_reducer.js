import { combineReducers } from 'redux';
import jobsReducer from './jobs_reducer';
import companiesReducer from './companies_reducer';

export default combineReducers({
  jobs: jobsReducer,
  companies: companiesReducer
});
