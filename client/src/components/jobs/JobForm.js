import _ from 'lodash';
import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import JobField from './JobField';

const FIELDS = [
  { label: 'Job Title', name: 'title'},
  { label: 'Summary', name: 'summary'},
  { label: 'Responsibilities', name: 'responsibilities'},
  { label: 'Qualifications', name: 'qualifications'},
  { label: 'Type', name: 'type'},
  { label: 'Experience', name: 'experience'},
  { label: 'Salary Estimate', name: 'salaryEstimate'}
];

class JobForm extends React.Component {

  renderFields() {
    return _.map(FIELDS, ({ label, name }) => {
      return <Field key={name} component={JobField} type="text" label={label} name={name}/>;
    });
  }

  render(){
    return (
      <div>
      <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
        {this.renderFields()}
        <Link to="/jobs">Cancel</Link>
        <button type="submit">Next</button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.title) {
    errors.title = "You must provide a title";
  }

  return errors;
}

export default reduxForm({
  validate,
  form: 'jobForm'
})(JobForm);
