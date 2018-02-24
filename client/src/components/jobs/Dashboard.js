import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/jobs.css';
// import JobsIndexContainer from './jobs_index_container';
import JobList from './JobList';
import Bar from '../loader.jsx';
import { connect } from 'react-redux';
import { fetchJobs } from '../../actions';
import _ from 'lodash';
// import '../../styles/jobs.css';
// import JobList from './JobList';


class Dashboard extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    this.props.fetchJobs();
  }

  render() {
    if (_.isEmpty(this.props.jobs)) {
      return (
        <Bar />
      );
    }
    return (
      <div className="logged-in-main-div">
        <p className="button-to-create-job">
          <Link className="link-to-create-job"
            to="/jobs/new">
            New Job Form
          </Link>
        </p>
        <div className="logged-in-header">
        All Jobs - Sorted By :
        <span className="logged-in-recent">
        [ Recent ]
        </span>
        </div>
          <JobList />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps){
  return {
    jobs: state.entities.jobs
  };
}

export default connect(mapStateToProps, { fetchJobs })(Dashboard);
