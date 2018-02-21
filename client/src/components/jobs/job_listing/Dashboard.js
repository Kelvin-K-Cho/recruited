import React from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/jobs.css';
import JobsIndexContainer from './jobs_index_container';
import JobList from '../JobList';

const Dashboard = () => {
  return (
    <div className="logged-in-main-div">
      <p className="button-to-create-job">
        <Link className="link-to-create-job" 
          to="/jobs/new">
          New Job Form
        </Link>
      </p>
      <div className="logged-in-header">
      All Jobs - Sorted By :  
      <span className="logged-in-recent">
      [ Recent ] 
      </span>
      </div>
        <JobList />
    </div>
  );
};

export default Dashboard;
