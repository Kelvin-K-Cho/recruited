import React from 'react';
import { connect } from 'react-redux';
import { fetchResumes, updateResume } from '../../actions';

//Deprecated import
// import {Link} from 'react-router-dom';

class ResumeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {displayType: 0, chosen: undefined}; // 0 for "pending", 1 for "approved"
  }

  componentDidMount() {
    this.props.fetchResumes(this.props.match.params.id);
  }
  
  displayResume() {
    let resume, percentMatch, resumeHTML;
    switch(this.state.displayType) {
      case 0:
        resume = this.props.resumes[0];
        if (resume) {
          percentMatch = resume.percentMatch;
          resumeHTML = resume.resumeHTML;
        }
        break;
      case 1: 
        resume = this.state.chosen;
        percentMatch = parseFloat(resume.dataset.percentmatch);
        resumeHTML = resume.dataset.html;
        break;
      default: 
        resume = this.displayPending();
        break;
    }
    console.log("rendering resume");
    console.log(percentMatch);
    if (!resume) return (
      <div className="resume-container">
        <div id="resume-view">
          There is no resume to show
        </div>
      </div>
    )
    return (
      <div>
        <div id="percent-match" className="percent-match">
          Percentage Match: {percentMatch.toFixed(2) * 100}%
        </div>
        <div className="resume-container">
          <div id="resume-view"
            dangerouslySetInnerHTML={{__html: resumeHTML}}>
          </div>
        </div>
      </div>
    )
  }

  renderButtons() {
    if (this.props.resumes.length < 1 || this.state.displayType !== 0) return null;
    return (
      <div className="button-container">
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

  handleButton(e) {
    if (e.target.className === "resume-approve") {
      // save to list of approved resumes:
      this.props.updateResume(this.props.resumes[0]._id, {approved: "yes"});
    } else {
      this.props.updateResume(this.props.resumes[0]._id, {approved: "no"});
    }
  }

  renderApprove() {
    const {approvedResumes} = this.props;
    return (
      <ul className="approved-list">
        {approvedResumes.map(resume => (
          <li key={resume._id} className="approved-item"
            data-percentmatch={resume.percentMatch}
            data-html={resume.resumeHTML}
            onClick={(e) => this.switchDisplayTypeOne(e)}>
            <div>{resume._user.fullName}</div>
            <div>{resume._user.email}</div>
          </li>
        ))}
      </ul>
    );
  }
  
  switchDisplayTypeOne(e) {
    console.log("switching");
    this.setState({displayType: 1, chosen: e.currentTarget});
  }

  render() {
    // console.log(this.props);
    return (
      <div className="resume-page-container">
        {this.displayResume()}
        
        {this.renderButtons()}

        <div className="approved-resume-container">
          <div className="approved-resume-title">Approved Applicants:</div>
          {this.renderApprove()}
        </div>

        <div className="stats-container">
          <div className="stat-container-title">Stats:</div>
          <div id="stats-title-first" className="stats-title"
            onClick={() => this.setState({displayType: 0})}>Pending:
            <span>{this.props.pendingNumber}</span>
          </div>
          <div className="stats-title">Approved:
            <span>{this.props.approvedResumes.length}</span>
          </div>
          <div className="stats-title">Rejected:
            <span>{this.props.rejectedNumber}</span>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const pendingResumes = [];
  const approvedResumes = [];
  let rejectedNumber = 0;
  let pendingNumber = 0;
  if (state.entities.resumes) {
    Object.values(state.entities.resumes).forEach(resume => {
      if (resume.approved === "yes") approvedResumes.push(resume);
      else if (resume.approved === "no") rejectedNumber += 1;
      else {
        pendingNumber += 1;
        pendingResumes.push(resume);
      }
    });
  }
  return {
    resumes: pendingResumes,
    approvedResumes: approvedResumes,
    rejectedNumber: rejectedNumber,
    pendingNumber: pendingNumber
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchResumes: (jobId) => dispatch(fetchResumes(jobId)),
    updateResume: (resumeId, values) => dispatch(updateResume(resumeId, values))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ResumeList);
