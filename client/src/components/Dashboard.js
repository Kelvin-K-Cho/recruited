import React from 'react';
import { Link } from 'react-router-dom';
import JobList from './jobs/JobList';

const Dashboard = () => {
  return (
    <div>
      <JobList />
      <Link to="/jobs/new">
        New Job Form
      </Link>
    </div>
  );
};

export default Dashboard;
