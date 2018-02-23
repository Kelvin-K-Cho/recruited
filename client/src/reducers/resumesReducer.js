import { FETCH_RESUMES } from '../actions/types';

export default function (state = [], action) {
  Object.freeze(state);
  switch (action.type) {
    case FETCH_RESUMES:
      return action.payload;
    default:
      return state;
  }
}
