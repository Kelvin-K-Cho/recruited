import React from 'react';
import { connect } from 'react-redux';
import { fetchResumes, updateResume } from '../../actions';

import {Link} from 'react-router-dom';

class ResumeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {resumeIndex: 0};
  }

  componentDidMount() {
    this.props.fetchResumes(this.props.match.params.id);
  }

  componentDidUpdate() {  // render resume after element loaded and updated with state data
    const resume = this.props.resumes[this.state.resumeIndex];
    if (resume) {
      const percentMatch = resume.percentMatch.toFixed(2) * 100;
      document.getElementById('resume-view')
        .innerHTML = `<div class="percent-match">Percentage Match: ${percentMatch}%</div>` +
          this.props.resumes[this.state.resumeIndex].resumeHTML;
    } else {
      document.getElementById('resume-view')
        .innerHTML = "<div>There is no resume to show</div>";
    }
  }

  handleButton(e) {
    if (e.target.className === "resume-approve") {
      // save to list of approved resumes:
      this.props.updateResume(this.props.resumes[this.state.resumeIndex]._id, {approved: true});
    }
    // next:
    this.setState({resumeIndex: this.state.resumeIndex + 1});
  }

  render() {
    const {resumes} = this.props;
    // if (!resumes[this.state.resumeIndex]) return (<div>Loading</div>);
    return (
      <div>
        <div className="resume-container">
          <div id="resume-view"></div>
        </div>
        <button className="resume-approve"
          onClick={(e) => this.handleButton(e)}>
          Approve
        </button>
        <button className="resume-decline"
          onClick={(e) => this.handleButton(e)}>
          Decline
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { resumes: state.entities.resumes };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchResumes: (jobId) => dispatch(fetchResumes(jobId)),
    updateResume: (resumeId, values) => dispatch(updateResume(resumeId, values))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ResumeList);
