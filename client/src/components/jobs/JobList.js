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
        <Link to={`/jobs/${job._id}`}>
          <div key={job._id}>
            <div>
              <div>{job.title} - {job.type}</div>
              <div>
                <Link to={`${job.company_url}`}>{job.company}</Link>
                &#160;- {job.location}
              </div>
              <div>$ {job.salaryEstimate}</div>
              <div>{job.summary}</div>
              <p>Post On:{new Date(job.dateCreated).toLocaleDateString()}</p>
            </div>
          </div>
        </Link>
      );
    });
  }

  render() {
    return (
      <div>
        {this.renderJobs()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { jobs: Object.values(state.entities.jobs) };
}

export default connect(mapStateToProps, { fetchJobs })(JobList);
