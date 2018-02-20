import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div>
      Dashboard
      <Link to="/jobs/new">
        New Job Form
      </Link>
    </div>
  );
};

export default Dashboard;
