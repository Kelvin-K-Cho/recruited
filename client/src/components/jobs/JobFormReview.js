import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';

const JobFormReview = ({ onCancel, formValues, submitJob, history }) => {

  const reviewFields = _.map(formFields, ({name, label}) => {
    return (
      <div key={name}>
        <label>{label}</label>
        <div>
          {formValues[name]}
        </div>
      </div>
    );
  });

  return (
    <div>
      <h5>Confirm your job listing</h5>
      {reviewFields}
      <button onClick={onCancel}>Back</button>
      <button onClick={() => submitJob(formValues, history)}>Submit</button>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    formValues: state.form.jobForm.values
  };
}

export default connect(mapStateToProps, actions)(withRouter(JobFormReview));
