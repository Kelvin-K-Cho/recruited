import React from 'react';

class Landing extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="main-landing-div">
        <div className="navigation-div">
          <h1 className="landing-header">≋R≋E≋C≋R≋U≋I≋T≋E≋D≋</h1>
        </div>
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
          <button className="button-to-sign-up">Sign Up Now</button>
        </div>
      </div>
    );
  }
}

export default Landing;
