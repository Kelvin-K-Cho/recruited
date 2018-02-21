import _ from 'lodash';
import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import JobField from './JobField';
import JobFieldTextArea from './JobFieldTextArea';
import formFields from './formFields';
import formFieldsTextArea from './formFieldsTextArea';
import formFieldsRemainder from './formFieldsRemainder';

class JobForm extends React.Component {

  renderFields() {
    return _.map(formFields, ({ label, name }) => {
      return <Field key={name} component={JobField} type="text" label={label} name={name}/>;
    });
  }

  renderFieldsTextArea() {
    return _.map(formFieldsTextArea, ({ label, name}) => {
      return <Field key={name} component={JobFieldTextArea} type="textarea" label={label} name={name}/>;
    });
  }
  
  renderFieldsRemainder() {
    return _.map(formFieldsRemainder, ({ label, name }) => {
      return <Field key={name} component={JobField} type="text" label={label} name={name}/>;
    });
  }
  
  render(){
    return (
      <div className="job-form-main-div">
        <form className="job-form-main-inner-div" onSubmit={this.props.handleSubmit(this.props.onJobSubmit)}>
          {this.renderFields()}
          {this.renderFieldsTextArea()}
          {this.renderFieldsRemainder()}
          <button className="button-to-cancel-new-job">
            <Link className="link-to-cancel-new-job" to="/jobs">Cancel</Link>
          </button>
          
          <button className="button-to-create-new-job" type="submit">Next</button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};
  // debugger;
  _.each(formFields, ({ name }) => {
    if (!values[name]) {
      errors[name] = 'You must provide a value';
    }
  });
  _.each(formFieldsRemainder, ({ name }) => {
    if (!values[name]) {
      errors[name] = 'You must provide a value';
    }
  });
  _.each(formFieldsTextArea, ({ name }) => {
    if (!values[name]) {
      errors[name] = 'You must provide a value';
    }
  });

  return errors;
}

export default reduxForm({
  validate,
  form: 'jobForm',
  destroyOnUnmount: false
})(JobForm);
