import React from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';


class Header extends React.Component {

  renderContent(){
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <div className="inner-navigation-div">
            <h1 className="logo">𝓡</h1>
            <h1 className="landing-header">≋R≋E≋C≋R≋U≋I≋T≋E≋D≋</h1>
            <a className="button-login-google-fake" href="/auth/google">Login With Google</a>
          </div>
        );
      default:
        return (
        <li>
          <a href="/api/logout">Logout</a>
        </li>
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
