import React from "react";
import { BrowserRouter, Route } from 'react-router-dom';

import Header from "./Header";
const Dashboard = () => <h2>Dashboard</h2>;
const ListingNew = () => <h2>ListingNew</h2>;
const Landing = () => <h2>Landing</h2>;


const App = () => {
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
};

export default App;
