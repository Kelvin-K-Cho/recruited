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
      <div key={job._id}>
        <div>
          <div>{job.title} - {job.type}</div>
          <div>
            <Link to={`${job.company_url}`}>{job.company}</Link>
            &#160;- {job.location}
          </div>
          <div>$ {job.salaryEstimate}</div>
          <div>{job.summary}</div>
          <div>Responsibilities: </div>
          <div>{job.responsibilities}</div>
          <div>qualifications: </div>
          <div>{job.qualifications}</div>
          <p>Post On:{new Date(job.dateCreated).toLocaleDateString()}</p>
        </div>
      </div>
    );
  }

  render() {
    console.log(this.props);
    if (!this.props.job) return (<div>Loading...</div>);
    return (
      <div>
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
