import { GET_JOBS } from '../actions/job_actions';
import { GET_JOB } from '../actions/job_actions';

const companiesReducer = (state = {}, action) => {
  console.log(action);
  switch(action.type) {
    case GET_JOBS:
      return action.companies;  // replace companies
    case GET_JOB:
      return action.companies;  // replace companies
    default:
      return state;
  }
};

export default companiesReducer;
