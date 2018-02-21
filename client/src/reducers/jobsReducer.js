import { FETCH_JOBS, FETCH_JOB } from '../actions/types';

export default function (state = {}, action) {
  Object.freeze(state);
  switch (action.type) {
    case FETCH_JOBS:
      return action.payload;
    case FETCH_JOB:
      let newState = Object.assign({}, state);
      newState[action.payload._id] = action.payload;
      console.log(action.payload);
      return newState;
    default:
      return state;
  }
}
