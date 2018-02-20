import React from 'react';
import { Link } from 'react-router-dom';
// import JobIndexContainer from './job_index_container';
import '../../../styles/jobs.css';
import JobList from '../JobList';

const Dashboard = () => {
  return (
    <div className="logged-in-main-div">
      <Link to="/jobs/new">
        New Job Form
      </Link>
      <JobList />
    </div>
  );
};

export default Dashboard;
