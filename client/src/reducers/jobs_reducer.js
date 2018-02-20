import { GET_JOBS } from '../actions/job_actions';
import { GET_JOB } from '../actions/job_actions';

const jobsReducer = (state = {}, action) => {
  console.log(action);
  Object.freeze(state);
  switch(action.type) {
    case GET_JOBS:
      return action.jobs;
    case GET_JOB:
      let newState = Object.assign({}, state);  // Dup state
      newState[action.job.id] = action.job; // Add/ Update specific job information
      return newState;
    default:
      return state;
  }
};

export default jobsReducer;
