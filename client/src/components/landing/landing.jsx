import React from 'react';
import { connect } from "react-redux";

class Landing extends React.Component {

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

  render() {
    console.log(this.state);
    return (
      <div className="main-landing-div">
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
