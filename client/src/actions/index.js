import axios from "axios";
import { FETCH_USER,
  FETCH_JOBS,
  FETCH_JOB,
  FETCH_RESUMES,
  FETCH_MY_CREATED_JOBS
} from "./types";

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
  axios.get('/api/jobs')
    .then(res => dispatch({
      type: FETCH_JOBS,
      payload: res.data
    }))
);

export const fetchJob = (id) => dispatch => (
  axios.get(`/api/jobs/${id}`)
    .then(res => dispatch({
      type: FETCH_JOB,
      payload: res.data // because it returns as an array
    }))
);

export const fetchResumes = (jobId) => dispatch => {
  axios.get(`/api/jobs/${jobId}/resumes`)
    .then(res => dispatch({
      type: FETCH_RESUMES,
      payload: res.data
    }));
};

export const submitResume = (values) => dispatch => {
  axios.post('/api/resumes', values)
    .then(res => console.log(res));
};

export const fetchMyJobs = (userId) => dispatch => {
  axios.get(`/api/users/${userId}`)
    .then(res =>
        console.log(res.data)
    );
};


// dispatch({
//   type: FETCH_MY_CREATED_JOBS,
//   payload: res.data
