import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
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
import UserProfile from './profile/UserProfile';
import { AuthRoute, ProtectedRoute } from '../util/route_util.jsx';

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
            <Switch>
              <AuthRoute exact path="/" component={Landing}/>
              <ProtectedRoute exact path="/jobs" component={Dashboard}/>
              <ProtectedRoute exact path="/jobs/:id" component={JobShow}/>
              <ProtectedRoute exact path="/jobs/new" component={JobNew}/>
              <ProtectedRoute exact path="/users/:id" component={UserProfile} />
              <ProtectedRoute path="/jobs/:id/resumes" component={ResumeList}/>
              <Redirect to="/" />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
