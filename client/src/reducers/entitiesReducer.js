import { combineReducers } from 'redux';
import jobsReducer from './jobsReducer';
import resumesReducer from './resumesReducer';
import profileReducer from './profileReducer';

export default combineReducers({
  jobs: jobsReducer,
  resumes: resumesReducer,
  profile: profileReducer
});
