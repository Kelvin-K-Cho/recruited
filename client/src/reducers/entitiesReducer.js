import { combineReducers } from 'redux';
import jobsReducer from './jobsReducer';
import resumesReducer from './resumesReducer';

export default combineReducers({
  jobs: jobsReducer,
  resumes: resumesReducer
});
