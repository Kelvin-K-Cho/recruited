import React from 'react';
import { connect } from 'react-redux';
import { fetchMyJobs } from '../../actions/index';
import _ from 'lodash';

class UserProfile extends React.Component {
  
  constructor(props){
    super(props);
  }
  
  componentDidMount(){
    this.props.fetchMyJobs(this.props.match.params.id);
  }
  
  render() {
    if (_.isEmpty(this.props.profile)) {
      return (
        <div>
          Finding My Profile 
        </div>
      );
    } else {
      return (
        <div className="profile-outer-container">
          <h1 className="my-profile-created-job-header">My Created Jobs</h1>
          {Object.values(this.props.profile).map(job => {
            return (
              <div className="profile-inner-container">
                <div className="my-created-jobs-container">
                  <div className="my-created-jobs" key={job._id}>
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
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      );
    }
  }
}

function mapStateToProps(state, ownProps) {
  return {
    profile: state.entities.profile
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    fetchMyJobs: (id) => dispatch(fetchMyJobs(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);

