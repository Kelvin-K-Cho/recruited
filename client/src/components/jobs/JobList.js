import React from 'react';
import { connect } from 'react-redux';
import { fetchJobs } from '../../actions';

class JobList extends React.Component {

  componentDidMount() {
    this.props.fetchJobs();
  }

  renderJobs(){
    return this.props.jobs.reverse().map(job => {
      return (
        <div key={job._id}>
          <div>
            <span>{job.title}</span>
            <p>{job.summary}</p>
            <p>Post On:{new Date(job.dateCreated).toLocaleDateString()}</p>
          </div>
        </div>
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
  return { jobs: state.jobs };
}

export default connect(mapStateToProps, { fetchJobs })(JobList);
