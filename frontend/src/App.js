// import logo from './logo.svg';
import './App.css';
import { NavBar, AddSchool, Upcoming } from './Components'
import { Schools, Calendar } from './Containers'
import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <Redirect to="/schools"/>
          </Route>
          <Route exact path="/schools">
            <Schools />
          </Route>
          <Route exact path="/calendar">
            <Calendar />
          </Route>
          <Route exact path="/addSchool">
            <AddSchool />
          </Route>
          <Route exact path="/upcoming">
            <Upcoming />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
