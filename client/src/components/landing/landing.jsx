import React from 'react';
import { connect } from "react-redux";

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {openResume: false};
  }

  renderContent(){
    switch (this.props.auth) {
      case null:
        return (
          <div>
          </div>
        );
      case false:
        return (
          <div className="inner-navigation-div">
            <a className="button-login-google-real" href="/auth/google">Login With Google</a>
          </div>
        );
      default:
        return (
        <div className="inner-nagivation-div">
          <a className="button-login-google-real" href="/api/logout">Logout</a>
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
          <div>Upload your resume (.doc, .txt)</div>
            <input id="resume-input" type="file"/>
          <input onClick={() => this.handleFile()}
            type="submit" value="Submit" />
        </form>
      </div>
    );
  }

  handleFile() {
    const resume = document.getElementById('resume-input').files[0];
    console.log(resume);
    if (resume) {
      let reader = new FileReader();
      reader.onload = (e) => {  // initialize event on reader
        // save result into variable
        console.log(e.target.result);
      };
      reader.readAsText(resume);  // start reading, can only read .txt
      // should call action to save variable to database
    }
  }

  render() {
    console.log(this.state);
    return (
      <div className="main-landing-div">
        <button className="resume-button" onClick={()=> this.setState({openResume: true})}>
            Upload Resume
        </button>
        <div>{this.renderResumeModal()}</div>
        <div className="session-div-logged-out">
          <p className="first-text">
            Start By Doing What Is Necessary,
          </p>
          <p className="second-text">
            Then What Is Possible, And Suddenly
          </p>
          <p className="third-text">
            You Are Doing The Impossible.
          </p>
          <p className="fourth-text">
            Join The Work Force Today!
          </p>
          <button className="button-to-sign-up">{this.renderContent()}</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}


export default connect(mapStateToProps)(Landing);
