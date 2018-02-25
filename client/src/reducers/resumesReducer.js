import { FETCH_RESUMES, UPDATE_RESUME } from '../actions/types';

export default function (state = {}, action) {
  Object.freeze(state);
  switch (action.type) {
    case FETCH_RESUMES:
      return action.payload;
    case UPDATE_RESUME:
    // console.log("reducer");
      let newState = Object.assign({}, state);
      newState[action.payload._id] = action.payload;
      return newState;
    default:
      return state;
  }
}
