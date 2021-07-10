import React, { useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Login from "./login";
import SignUp from "./signup";
import ToDoList from "./todolist";
import axios from "axios";

function Mainrouter() {
  // const [tokenValid, setTokenValid] = useState(false);
  const isTokenValid = async () => {
    await axios({
      method: "GET",
      headers: { "x-auth-token": localStorage.getItem("token") },
      url: "http://localhost:5000/api/auth/user",
    })
      .then((res) => {
        // setTokenValid(true);
        // console.log(res);
      })
      .catch((err) => {
        // setTokenValid(false);
        console.log(err);
      });
  };
  // isTokenValid();

  return (
    <React.Fragment>
      <Switch>
        <Route path="/todolist">
          <ToDoList />
        </Route>
        <Route path="/signup" component={SignUp} />
        <Route path={["/", "/login"]} component={Login} />
      </Switch>
    </React.Fragment>
  );
}

export default Mainrouter;
