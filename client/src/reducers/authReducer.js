import { FETCH_USER } from '../actions/types';

export default function (state = {}, action) {
  console.log(action);
  switch(action.type) {
    default:
      return state;
  }
}
