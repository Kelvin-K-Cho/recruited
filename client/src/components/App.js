import React from "react";
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from "./Header";
const Dashboard = () => <h2>Dashboard</h2>;
const ListingNew = () => <h2>ListingNew</h2>;
const Landing = () => <h2>Landing</h2>;



class App extends React.Component {

  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
        <div>
          <BrowserRouter>
            <div>
              <Header />
              <Route exact path="/" component={Landing}/>
              <Route exact path="/listings" component={Dashboard}/>
              <Route path="/listings/new" component={ListingNew}/>
            </div>
          </BrowserRouter>
        </div>
      );
  }
}

export default connect(null, actions)(App);
