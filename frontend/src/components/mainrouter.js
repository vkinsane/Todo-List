import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./login";
import SignUp from "./signup";
import ToDoList from "./todolist";
function Mainrouter() {
  return (
    <React.Fragment>
      <Switch>
        <Route path="/todolist" component={ToDoList} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
        <Route path="/" component={Login} />
      </Switch>
    </React.Fragment>
  );
}

export default Mainrouter;
