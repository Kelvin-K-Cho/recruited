import React from 'react';
import { connect } from 'react-redux';
import { fetchResumes, updateResume } from '../../actions';

//Deprecated import
// import {Link} from 'react-router-dom';

class ResumeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {displayType: 0}; // 0 for "pending", 1 for "approved"
    
  }

  componentDidMount() {
    this.props.fetchResumes(this.props.match.params.id);
  }
  
  displayResume() {
    let resume;
    switch(this.state.displayType) {
      case 0:
        resume = this.displayPending();
      case 1: 
        resume = this.displayChosen();
      default: 
        resume = this.displayPending();
    }
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
          Percentage Match: {resume.percentMatch.toFixed(2) * 100}
        </div>
        <div className="resume-container">
          <div id="resume-view"
            dangerouslySetInnerHTML={{__html: resume.resumeHTML}}>
          </div>
        </div>
      </div>
    )
  }

  displayPending() {  // render resume after element loaded and updated with state data
    const resume = this.props.resumes[0];
    // if (resume) {
    //   const percentMatch = resume.percentMatch.toFixed(2) * 100;
    //   document.getElementById('percent-match').innerHTML =
    //     `<div class="percent-match">Percentage Match: ${percentMatch}%</div>`;
    //   document.getElementById('resume-view')
    //     .innerHTML = this.props.resumes[this.state.resumeIndex].resumeHTML;
    // } else {
    //   document.getElementById('percent-match').innerHTML = "";
    //   document.getElementById('resume-view')
    //     .innerHTML = "<div>There is no resume to show</div>";
    // }
    return resume;
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
        {approvedResumes.reverse().map(resume => (
          <li key={resume._id} className="approved-item"
            data-percentmatch={resume.percentMatch}
            data-html={resume.resumeHTML}
            onClick={(e) => this.switchDisplayType(e)}>
            <div>{resume._user.fullName}</div>
            <div>{resume._user.email}</div>
          </li>
        ))}
      </ul>
    );
  }
  
  switchDisplayType(e) {
    this.chosen = e.currentTarget;  //save this html into instance variable
    this.setState({displayType: 1});
  }

  displayChosen() {
    // const resumePercent = this.chosen.dataset.percentmatch; // get HTMl from instance variable
    // const resumeHTML = this.chosen.dataset.html;
    // // console.log(e.currentTarget);
    // console.log(resumePercent);
    // // console.log(resumeHTML);
    // const percentMatch = parseFloat(resumePercent).toFixed(2) * 100;
    // document.getElementById('percent-match').innerHTML =
    //   `<div class="percent-match">Percentage Match: ${percentMatch}%</div>`;
    // document.getElementById('resume-view')
    //   .innerHTML = resumeHTML;
    return this.chosen;
  }

  render() {
    console.log(this.props);
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
          <div id="stats-title-first" className="stats-title">Pending:
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
