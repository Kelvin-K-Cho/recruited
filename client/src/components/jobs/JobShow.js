import React from 'react';
import { connect } from 'react-redux';
import { fetchJob } from '../../actions/index';

import {Link} from 'react-router-dom';

class JobShow extends React.Component {

  componentDidMount() {
    this.props.fetchJob(this.props.match.params.id);
  }

  renderJob(){
    const {job} = this.props;
    return (
      <div className="job-show-page-inner-div" key={job._id}>
        <div className="job-show-page-main-div">
          <div className="job-show-page-title">{job.title} - {job.type}</div>
          <div className="job-show-page-url">
            <a className="job-show-page-link" target="_blank" href={`http://${job.company_url}`}>{job.company}</a>
            &#160;- {job.location}
          </div>
          <div className="job-show-page-salary">Salary: $ {job.salaryEstimate}</div>
          <div className="job-show-page-summary-header">Summary: </div>
          <div className="job-show-page-summary">{job.summary}</div>
          <div className="job-show-page-responsibility-header">Responsibilities: </div>
          <div className="job-show-page-responsibility">{job.responsibilities}</div>
          <div className="job-show-page-qual-header">Qualifications: </div>
          <div className="job-show-page-qual">{job.qualifications}</div>
          <p className="job-show-page-posted-date">Post On:{new Date(job.dateCreated).toLocaleDateString()}</p>
        </div>
      </div>
    );
  }

  render() {
    console.log(this.props);
    if (!this.props.job) return (<div></div>);
    return (
      <div className="job-show-page-outer-div">
        {this.renderJob()}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  console.log(ownProps);
  console.log(state.entities.jobs[ownProps.match.params.id]);
  return { job: state.entities.jobs[ownProps.match.params.id] };
}

function mapDispatchToProps(dispatch, ownProps) {
  console.log(ownProps.match.params.id);
  return {
    fetchJob: (id) => dispatch(fetchJob(id))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(JobShow);
