import { FETCH_JOBS, FETCH_JOB, REMOVE_JOB } from '../actions/types';
import merge from 'lodash/merge';

export default function (state = {}, action) {
  let newState;
  Object.freeze(state);
  switch (action.type) {
    case FETCH_JOBS:
      return action.payload;
    case FETCH_JOB:
      newState = Object.assign({}, state);
      newState[action.payload._id] = action.payload;
      // console.log(action.payload);
      return newState;
    case REMOVE_JOB:
      newState = merge({}, state);
      delete newState[action.payload._id];
      return newState;
    default:
      return state;
  }
}
