import React from 'react';
import { Link } from 'react-router-dom';
// import JobIndexContainer from './job_index_container';
import '../../../styles/jobs.css';
import JobList from '../JobList';

const Dashboard = () => {
  return (
    <div className="logged-in-main-div">
      <span className="button-to-create-job">
        <Link className="link-to-create-job" 
          to="/jobs/new">
          New Job Form
        </Link>
      </span>
        <JobList />
    </div>
  );
};

export default Dashboard;
