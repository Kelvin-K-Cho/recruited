import { combineReducers } from 'redux';
import jobsReducer from './jobsReducer';

export default combineReducers({
  jobs: jobsReducer,
});
