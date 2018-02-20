import React from 'react';
import { Link } from 'react-router-dom';
import JobList from './jobs/JobList';
import '../styles/jobs.css';

const Dashboard = () => {
  return (
    <div className="logged-in-main-div">
      <JobList />
      <Link to="/jobs/new">
        New Job Form
      </Link>
    </div>
  );
};

export default Dashboard;
