// import logo from './logo.svg';
import './App.css';
import { NavBar, AddSchool, Upcoming } from './Components'
import { Schools, Calendar } from './Containers'
import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import CalendarPage from './Containers/CalendarPage';
import SchoolPage from './Containers/SchoolPage';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <Redirect to="/schools"/>
          </Route>
          <Route exact path="/sch">
            <Schools />
          </Route>
          <Route exact path="/cal">
            <Calendar />
          </Route>
          <Route exact path="/addSchool">
            <AddSchool />
          </Route>
          <Route exact path="/upcoming">
            <Upcoming />
          </Route>
          <Route exact path="/calendar">
            <CalendarPage />
          </Route>
          <Route exact path="/schools">
            <SchoolPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
