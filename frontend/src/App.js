// import logo from './logo.svg';
import './App.css';
import { NavBar, AddSchool, Upcoming } from './Components'
import { Schools, Calendar } from './Containers'
import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import CalendarPage from './Containers/CalendarPage';
import SchoolPage from './Containers/SchoolPage';
import SignIn from "./Containers/SignIn";
import { useState, useEffect } from "react";

const App = () => {
  const LOCALSTORAGE_KEY = "save-user";
  const savedUser = localStorage.getItem(LOCALSTORAGE_KEY);
  const [signedIn, setSignedIn] = useState(true);
  const [user, setUser] = useState(savedUser || "");
  // show the corresponded history data of the user
  const displayStatus = (payload) => {

  };

  useEffect(() => {
    if (signedIn) {
      localStorage.setItem(LOCALSTORAGE_KEY, user);
    }
  }, [signedIn, user]);

  return (
    <div className="App">
      {signedIn ? (
        <BrowserRouter>
          <NavBar />
          <Switch>
            <Route exact path="/">
              <Redirect to="/schools" />
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
          </Switch>
        </BrowserRouter>
      ) : (
        <SignIn
          user={user}
          setUser={setUser}
          setSignedIn={setSignedIn}
          displayStatus={displayStatus}
        />
      )}
    </div>
  );
}

export default App;
