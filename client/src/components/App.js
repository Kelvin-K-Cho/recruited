import React from "react";
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

// import { ProtectedRoute, AuthRoute } from '../util/route_util.jsx';
import * as actions from '../actions';
import Landing from './landing/landing.jsx';
import '../styles/reset.css';
import '../styles/main.css';
import '../styles/resumes.css';
import '../styles/profile.css';
import Header from "./header.jsx";
import Dashboard from "./jobs/Dashboard";
import JobNew from './jobs/JobNew';
import JobShow from './jobs/JobShow';
import ResumeList from './resumes/ResumeList';
import ResumeStats from './resumes/ResumeStats';
import UserProfile from './profile/UserProfile';

class App extends React.Component {

  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div className="outer-container-div">
        <BrowserRouter>
          <div className="inner-container-div">
            <Header />
            <Route exact path="/" component={Landing}/>
            <Route exact path="/jobs" component={Dashboard}/>
            <Route exact path="/jobs/:id" component={JobShow}/>
            <div className="resume-page-container">
              <Route path="/jobs/:id/resumes" component={ResumeList}/>
              <Route path="/jobs/:id/resumes" component={ResumeStats}/>
            </div>
            <Route exact path="/jobs/new" component={JobNew}/>
            <Route exact path="/users/:id" component={UserProfile} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
