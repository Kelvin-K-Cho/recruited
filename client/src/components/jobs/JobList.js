import React from 'react';
import { connect } from 'react-redux';
import { fetchJobs } from '../../actions';

import {Link} from 'react-router-dom';

class JobList extends React.Component {

  componentDidMount() {
    this.props.fetchJobs();
  }

  renderJobs(){
    return this.props.jobs.reverse().map(job => {
      return (
        <div className="job-index-item-outer-div"key={job._id}>
          <div className="job-index-item-inner-div">
            <div className="job-index-item-name">{job.title} - {job.type}</div>
            <div className="job-index-item-info">
              <Link to={`${job.company_url}`}>{job.company}</Link>
              &#160;- {job.location}
            </div>
            <span className="job-index-item-estimate">Estimated Salary: </span>
            <div className="job-index-item-salary">$ {job.salaryEstimate}</div>
            <p className="job-index-item-description">Job Description: </p>
            <div className="job-index-item-summary">{job.summary}</div>
            <p className="job-index-item-post-date">Posted On:</p>
            <p className="job-index-item-date">
            {new Date(job.dateCreated).toLocaleDateString()}
            </p>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="job-index-item-container-div">
        {this.renderJobs()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { jobs: Object.values(state.entities.jobs) };
}

export default connect(mapStateToProps, { fetchJobs })(JobList);
