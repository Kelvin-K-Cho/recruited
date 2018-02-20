import React from "react";
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { ProtectedRoute, AuthRoute } from '../util/route_util.jsx';
import Landing from './landing/landing.jsx';
import '../styles/reset.css';
import '../styles/main.css';


import Header from "./header.jsx";
// import Landing from './Landing';
import Dashboard from "./jobs/job_listing/Dashboard";
import JobNew from './jobs/JobNew';
// import JobShowContainer from './jobs/job_showpage/job_show_container';

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
              <AuthRoute path="/" component={Landing}/>
              <ProtectedRoute path="/jobs" component={Dashboard}/>
              <Route path="/jobs/new" component={JobNew}/>
            </div>
          </BrowserRouter>
        </div>
      );
  }
}

export default connect(null, actions)(App);
