import axios from "axios";
import { FETCH_USER, FETCH_JOBS } from "./types";

// export const changeLogin = shouldBeLoggedIn => {
//   return {
//     type: 'change_auth',
//     payload: shouldBeLoggedIn
//   };
// };
//

export const fetchUser = () => dispatch => (
  axios.get('/api/current_user')
    .then(res => dispatch({
      type: FETCH_USER,
      payload: res.data
    }))
);

export const submitJob = (values, history) => dispatch => (
  axios.post('/api/jobs', values)
    .then(res => dispatch({ type: FETCH_USER, payload: res.data }))
    .then(history.push('/jobs'))
);

export const fetchJobs = () => dispatch => (
  axios.get('api/jobs')
    .then(res => dispatch({
      type: FETCH_JOBS,
      payload: res.data
    }))
);
