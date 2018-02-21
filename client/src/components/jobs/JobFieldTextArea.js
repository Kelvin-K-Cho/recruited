import React from 'react';

export default ({ input, label, meta: { error, touched } }) => {
  return (
    <div className="new-job-criteria-div">
      <label className="new-job-label">{label}</label>
      <textarea className="new-job-textarea" {...input} />
      <div>
        {touched && error}
      </div>
    </div>
  );
};
