import axios from "axios";
export const GET_JOBS = "GET_JOBS";
export const GET_JOB = "GET_JOB";

export const getJobs = (res) => ({
  type: GET_JOBS,
  jobs: res.jobs,
  companies: res.companies
});

export const getJob = (res) => ({
  type: GET_JOB,
  job: res.job,
  company: res.company
});

export const fetchJobs = () => dispatch => (
  axios.get('/api/jobs')
    .then(res => dispatch(getJobs(res)))
);

export const fetchJob = (id) => dispatch => (
  axios.get(`/api/jobs/${id}`)
    .then(res => dispatch(getJob(res)))
);
