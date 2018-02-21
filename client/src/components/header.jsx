import React from 'react';
import { connect } from "react-redux";

class Header extends React.Component {

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
          <span className="span-logged-in">
            <a className="button-logged-in-google-real" href="/api/logout">Logout</a>
          </span>
        </div>
      );
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
