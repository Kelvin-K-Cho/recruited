import React from 'react';
import { connect } from 'react-redux';
import { fetchJob } from '../../actions/index';
import {Link} from 'react-router-dom';
import mammoth from 'mammoth';


import {submitResume} from '../../actions';


class JobShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {openResume: false};
    this.resumeText;
    this.resumeHTML;
  }

  componentDidMount() {
    this.props.fetchJob(this.props.match.params.id);
  }

  closeResumeModal(e) { //close modal when clicking outside
    if (e.target === document.getElementsByClassName('modal-screen')[0]) {
      this.setState({openResume: false});
    }
  }

  renderResumeModal() {
    if (!this.state.openResume) return (<div></div>);
    return (
      <div onClick={(e)=> this.closeResumeModal(e)}
        className="modal-screen">
        <form className="resume-form">
          <img onClick={()=> this.setState({openResume: false})}
            className="close-button"
            src="https://www.materialui.co/materialIcons/navigation/close_grey_192x192.png">
          </img>
          <div>Upload your resume (.doc, .docx)</div>
            <input onChange={() => this.handleFile()} id="resume-input" type="file"/>
          <input onClick={() => this.submitFile()}
            type="submit" value="Submit" />
          <div id="file-review">File Review</div>
        </form>
      </div>
    );
  }

  submitFile() {
    console.log("submitting");
    this.props.submitResume({
      resumeText: this.resumeText,
      resumeHTML: this.resumeHTML,
      _job: this.props.match.params.id
    });
  }

  handleFile() {
    const resume = document.getElementById('resume-input').files[0];
    const review = document.getElementById('file-review');

    if (resume) {
      let reader = new FileReader();
      reader.onload = (e) => {  // initialize event on reader
        // save result into arrayBuffer
        const arrayBuffer = e.target.result;
        // Using mammoth to convert arrayBuffer into Raw Text
        mammoth.extractRawText({
          arrayBuffer: arrayBuffer
        }).then((result) => {this.resumeText = result.value;});
        // Using mammoth to convert arrayBuffer into inner HTML
        mammoth.convertToHtml({
          arrayBuffer: arrayBuffer
        }).then((result) => {
          this.resumeHTML = result.value;
          review.innerHTML = result.value;
        });
      };
      reader.readAsArrayBuffer(resume);  // start reading
    }
  }

  renderJob(){
    const {job} = this.props;
    return (
      <div className="job-show-page-inner-div" key={job._id}>
        <div className="job-show-page-main-div">
          <div className="job-show-page-title">{job.title} - {job.type}</div>
          <div className="job-show-page-url">
            <a className="job-show-page-link" target="_blank" href={`http://${job.company_url}`}>{job.company}</a>
            &#160;- {job.location}
          </div>
          <div className="job-show-page-salary">Estimated Salary: $ {job.salaryEstimate}</div>
          <div className="job-show-page-summary-header">Summary: </div>
          <div className="job-show-page-summary">{job.summary}</div>
          <div className="job-show-page-responsibility-header">Responsibilities: </div>
          <div className="job-show-page-responsibility">{job.responsibilities}</div>
          <div className="job-show-page-qual-header">Qualifications: </div>
          <div className="job-show-page-qual">{job.qualifications}</div>
          <p className="job-show-page-posted-date"><span className="posted-on-date-show-page">Posted On : </span><span className="posted-on-date-show-page-value">{new Date(job.dateCreated).toLocaleDateString()}</span></p>
        </div>
      </div>
    );
  }

  render() {
    if (!this.props.job) return (<div></div>);
    return (
      <div className="job-show-page-outer-div">
        <button className="resume-button" onClick={()=> this.setState({openResume: true})}>
          Upload Resume And Apply
        </button>
        <button className="resume-list-button">
          <Link to={`/jobs/${this.props.match.params.id}/resumes`}>See Resumes</Link>
        </button>
        <div>{this.renderResumeModal()}</div>
        {this.renderJob()}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return { job: state.entities.jobs[ownProps.match.params.id] };
}

function mapDispatchToProps(dispatch, ownProps) {
  console.log(ownProps.match.params.id);
  return {
    fetchJob: (id) => dispatch(fetchJob(id)),
    submitResume: (values) => dispatch(submitResume(values))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(JobShow);
