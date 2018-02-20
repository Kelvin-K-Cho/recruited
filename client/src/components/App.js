import React from "react";
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Landing from './landing.jsx';
import '../styles/reset.css';
import '../styles/main.css';

import Header from "./header.jsx";
// import Landing from './Landing';
import Dashboard from "./Dashboard";
import JobNew from './jobs/JobNew';

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
              <Route path="/jobs/new" component={JobNew}/>
            </div>
          </BrowserRouter>
        </div>
      );
  }
}

export default connect(null, actions)(App);
