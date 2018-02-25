import React from 'react';
import { reduxForm } from 'redux-form';
import JobForm from './JobForm';
import JobFormReview from './JobFormReview';

class JobNew extends React.Component {

  constructor(props) {
    super(props);
    this.state = {showFormReview: false};
  }

  // state = { showFormReview: false };

  renderContent(){
    if (this.state.showFormReview) {
      return (
        <JobFormReview
          onCancel={() => this.setState({ showFormReview: false })}
        />
      );
    }
    return (
      <JobForm
      onJobSubmit={() => this.setState({ showFormReview: true })}
      />
    );
  }

  render() {
    // console.log('rendering form');
    debugger;
    return (
      <div className="job-form-outer-div">
        <div className="job-form-container-div">
          <div className="create-new-job-header">Create New Job Listing</div>
          {this.renderContent()}
        </div>
      </div>
    );
  }
}

export default reduxForm({
  form: 'jobForm'
})(JobNew);
