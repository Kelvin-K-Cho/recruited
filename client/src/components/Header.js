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
          <li>
            <a href="/auth/google">Login With Google</a>
          </li>
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
      <div>
        <Link
          to={this.props.auth ? '/jobs' : '/'}
          >
          recruited
        </Link>
        {this.renderContent()}
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
