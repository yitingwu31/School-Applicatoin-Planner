// import logo from './logo.svg';
import './App.css';
import { NavBar, AddSchool } from './Components'
import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import CalendarPage from './Containers/CalendarPage';
import SchoolPage from './Containers/SchoolPage';
import SignIn from "./Containers/SignIn";
import { useState, useEffect } from "react";

const App = () => {
  const LOCALSTORAGE_KEY = "save-user";
  
  const savedUser = localStorage.getItem(LOCALSTORAGE_KEY);
  const [signedIn, setSignedIn] = useState(false);
  const [user, setUser] = useState(savedUser || "emily");
  
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
              <NavBar user={user}/>
              <Switch>
              <Route exact path="/">
                <Redirect to="/schools"/>
              </Route>
                <Route exact path="/schools">
                <SchoolPage user={user}/>
              </Route>
              <Route exact path="/calendar">
                <CalendarPage user={user}/>
              </Route>
              <Route exact path="/addSchool">
                <AddSchool user={user}/>
              </Route>
              </Switch>
          </BrowserRouter>
        ) : (
          <SignIn
              user={user}
              setUser={setUser}
              setSignedIn={setSignedIn}
          />
        )}
    </div>
  );
}


export default App;
