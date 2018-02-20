import React from 'react';

const JobIndexItem = (props) => {
  return (
    <li>
      <div>props.job.title</div>
      <div>props.job.type</div>
      <div>props.company.name</div>
      <div>props.job.location</div>
      <div>props.job.salary</div>
      <div>props.job.summary</div>
    </li>
  );
};

export default JobIndexItem;
