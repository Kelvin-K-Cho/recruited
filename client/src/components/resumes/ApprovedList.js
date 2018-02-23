import React from 'react';
import { connect } from 'react-redux';
import { fetchResumes, updateResume } from '../../actions';

import {Link} from 'react-router-dom';

class ApprovedList extends React.Component {
  constructor(props) {
    super(props);
  }

  renderApprove() {
    const {approvedResumes} = this.props;
    return (
      <ul className="approved-list">
        {approvedResumes.reverse().map(resume => (
          <li key={resume._id} className="approved-item">
            <div>{resume._user.fullName}</div>
            <div>{resume._user.email}</div>
          </li>
        ))}
      </ul>
    );
  }

  render() {
    const {approvedResumes} = this.props;
    // if (!resumes[this.state.resumeIndex]) return (<div>Loading</div>);
    return (
      <div className="approved-resume-container">
        {this.renderApprove()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const approvedResumes = [];
  if (state.entities.resumes) {
    Object.values(state.entities.resumes).forEach(resume => {
      if (resume.approved) approvedResumes.push(resume);
    });
  }
  return {
    approvedResumes: approvedResumes
   };
}

export default connect(mapStateToProps, null)(ApprovedList);
