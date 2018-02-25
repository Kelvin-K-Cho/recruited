import React from 'react';
import { connect } from 'react-redux';
import { fetchMyJobs } from '../../actions/index';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import Pacman from '../loader.jsx';

class UserProfile extends React.Component {

  // constructor(props){
  //   super(props);
  // }
  
  componentDidMount(){
    this.props.fetchMyJobs(this.props.match.params.id);
  }

  render() {
    if (_.isEmpty(this.props.createdJobProfile) && _.isEmpty(this.props.appliedJobProfile)) {
      return (
        <div className="profile-outer-container">
          <div className="created-jobs-div">
            <h1 className="empty">No Jobs Found</h1>
          </div>
        </div>
      );
    } else {
      return (
        <div className="profile-outer-container">
          <div className="created-jobs-div">
            <h1 className="my-profile-created-job-header">My Created Jobs</h1>
            {Object.values(this.props.createdJobProfile).map(job => {
              return (
                <div className="profile-inner-container">
                  <div className="my-created-jobs-container">
                    <div className="my-created-jobs" key={job._id}>
                      <Link className="link-back-to-show-page" to={`/jobs/${job._id}`} >
                        <div className="my-created-jobs-title">
                          {job.title}
                        </div>
                        <div className="my-created-jobs-type">
                          Type: {job.type}
                        </div>
                        <div className="my-created-jobs-company">
                          Company: {job.company}
                        </div>
                        <div className="my-created-jobs-location">
                          Location: {job.location}
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="applied-jobs-div">
            <h1 className="my-profile-applied-job-header">My Applied Jobs</h1>
            {Object.values(this.props.appliedJobProfile).map(appliedJob => {
              return (
                <div className="profile-inner-container">
                  <div className="my-applied-job-container">
                    <div className="my-applied-jobs" key={appliedJob._id}>
                      <Link className="link-back-to-show-page" to={`/jobs/${appliedJob._id}`} >
                        <div className="my-applied-jobs-title">
                          {appliedJob.title}
                        </div>
                        <div className="my-applied-job-type">
                          Type: {appliedJob.type}
                        </div>
                        <div className="my-applied-job-company">
                          Company: {appliedJob.company}
                        </div>
                        <div className="my-applied-jobs-location">
                          Location: {appliedJob.location}
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>




      );
    }
  }
}

function mapStateToProps(state, ownProps) {
  return {
    createdJobProfile: state.entities.profile.createdJobs,
    appliedJobProfile: state.entities.profile.appliedJobs
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    fetchMyJobs: (id) => dispatch(fetchMyJobs(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
