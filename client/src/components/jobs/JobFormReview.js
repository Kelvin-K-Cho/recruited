import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import formFieldsTextArea from './formFieldsTextArea';
import formFieldsRemainder from './formFieldsRemainder';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';

const JobFormReview = ({ onCancel, formValues, submitJob, history }) => {

  const reviewFields = _.map(formFields, ({name, label}) => {
    return (
      <div className="review-main-div" key={name}>
        <label className="review-label">{label}</label>
        <div className="review-value">
          {formValues[name]}
        </div>
      </div>
    );
  });
  
  const reviewFieldsTextArea = _.map(formFieldsTextArea, ({name, label}) => {
    return (
      <div className="review-main-div" key={name}>
        <label className="review-label">{label}</label>
        <div className="review-value-textarea">
          {formValues[name]}
        </div>
      </div>
    );
  });
  
  const reviewFieldsRemainder = _.map(formFieldsRemainder, ({name, label}) => {
    return (
      <div className="review-main-div" key={name}>
        <label className="review-label">{label}</label>
        <div className="review-value">
          {formValues[name]}
        </div>
      </div>
    );
  });

  return (
    <div className="outer-review-form-div">
      <h5 className="confirm-job-header">Confirm Your Job Listing</h5>
      {reviewFields}
      {reviewFieldsTextArea}
      {reviewFieldsRemainder}
      <button className="back-button-new-job" onClick={onCancel}>Back</button>
      <button className="submit-button-new-job" onClick={() => submitJob(formValues, history)}>Submit</button>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    formValues: state.form.jobForm.values
  };
}

export default connect(mapStateToProps, actions)(withRouter(JobFormReview));
