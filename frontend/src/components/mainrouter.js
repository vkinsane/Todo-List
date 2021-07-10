import React, { useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Login from "./login";
import SignUp from "./signup";
import ToDoList from "./todolist";
import isTokenValid from "../helper/auth";
function Mainrouter() {
  // isTokenValid();
  return (
    <React.Fragment>
      <Route exact path="/todolist" component={ToDoList} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path={["/", "/login"]} component={Login} />
    </React.Fragment>
  );
}

export default Mainrouter;
