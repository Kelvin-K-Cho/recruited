import React from "react";
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { ProtectedRoute, AuthRoute } from '../util/route_util.jsx';
import * as actions from '../actions';
import Landing from './landing/landing.jsx';
import '../styles/reset.css';
import '../styles/main.css';
import '../styles/resumes.css';
import Header from "./header.jsx";
// import Landing from './Landing';
import Dashboard from "./jobs/job_listing/Dashboard";
import JobNew from './jobs/JobNew';
import JobShow from './jobs/JobShow';
import ResumeList from './resumes/ResumeList';

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
            <Route path="/jobs/:id/resumes" component={ResumeList}/>
            <Route exact path="/jobs/new" component={JobNew}/>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
