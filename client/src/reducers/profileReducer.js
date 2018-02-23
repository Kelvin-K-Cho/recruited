import { FETCH_MY_CREATED_JOBS } from '../actions/types';

export default function (state = {}, action) {
  Object.freeze(state);
  switch (action.type) {
    case FETCH_MY_CREATED_JOBS:
      return action.payload;
    default:
      return state;
  }
}
