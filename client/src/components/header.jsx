import React from 'react';
import { connect } from "react-redux";
import mammoth from 'mammoth';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {openResume: false};
  }

  renderContent(){
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <div className="inner-navigation-div">
            <h1 className="logo">𝓡</h1>
            <h1 className="landing-header">Recruited</h1>
            <a className="button-login-google-fake" href="/auth/google">Login With Google</a>
          </div>
        );
      default:
        return (
        <div className="logged-in-inner-navigation-div">
          <h1 className="logged-in-logo">𝓡</h1>
          <h1 className="logged-in-landing-header">Recruited</h1>
          <button className="resume-button" onClick={()=> this.setState({openResume: true})}>
              Upload Resume
          </button>
          <div>{this.renderResumeModal()}</div>
          <span className="span-logged-in">
            <a className="button-logged-in-google-real" href="/api/logout">Logout</a>
          </span>
        </div>
      );
    }
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
            <input id="resume-input" type="file"/>
          <input onClick={() => this.handleFile()}
            type="text" value="Submit" />
          <div id="file-review">File Review:</div>
        </form>
      </div>
    );
  }

  handleFile() {
    const resume = document.getElementById('resume-input').files[0];
    const review = document.getElementById('file-review');
    let resumeText; // later to save raw text of resume file

    if (resume) {
      let reader = new FileReader();
      reader.onload = (e) => {  // initialize event on reader
        // save result into arrayBuffer
        const arrayBuffer = e.target.result;
        // Using mammoth to convert arrayBuffer into Raw Text
        mammoth.extractRawText({
          arrayBuffer: arrayBuffer
        }).then((result) => {resumeText = result.value;});
        // Using mammoth to convert arrayBuffer into inner HTML
        mammoth.convertToHtml({
          arrayBuffer: arrayBuffer
        }).then((result) => {review.innerHTML = result.value;});
      };
      reader.readAsArrayBuffer(resume);  // start reading
      // should call action to save variable to database
    }
  }

  render() {
    return (
      <div className="outer-navigation-div">
        {this.renderContent()}
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
