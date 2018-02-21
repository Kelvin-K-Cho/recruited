import React from 'react';
import { reduxForm } from 'redux-form';
import JobForm from './JobForm';
import JobFormReview from './JobFormReview';

class JobNew extends React.Component {

  state = { showFormReview: false };

  renderContent(){
    if (this.state.showFormReview) {
      return (
        <JobFormReview
          onCancel={() => this.setState({ showFormReview: false })}
        />
      )
    }
    return (
      <JobForm
      onJobSubmit={() => this.setState({ showFormReview: true })}
      />
    )
  }

  render() {
    console.log('rendering form');
    return (
      <div>
        {this.renderContent()}
      </div>
    );
  }
}

export default reduxForm({
  form: 'jobForm'
})(JobNew);
