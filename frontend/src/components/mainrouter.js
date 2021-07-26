import React, { useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Login from "./login";
import SignUp from "./signup";
// import PrivateRoute from "./privateroutes";
import ToDoList from "./todolist";
import axios from "axios";

function Mainrouter({ props }) {
  // console.log(props);
  const [tokenValid, setTokenValid] = useState(false);

  const tokenValidator = async () => {
    await axios({
      method: "GET",
      headers: { "x-auth-token": localStorage.getItem("token") },
      url: "https://todolist-apis.herokuapp.com/api/auth/user",
    })
      .then((res) => {
        setTokenValid(true);
        console.log(res);
      })
      .catch((err) => {
        setTokenValid(false);
        // console.log(err);
      });
  };
  tokenValidator();
  return (
    <React.Fragment>
      <Switch>
        {/* <PrivateRoute exact path="/todolist" component={ToDoList} /> */}
        <Route exact path="/todolist">
          {tokenValid ? (
            <ToDoList props={{ username: props.username }} />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route exact path="/signup">
          {tokenValid ? <Redirect to="/todolist" /> : <SignUp />}
        </Route>
        <Route exact path={["/", "/login"]}>
          {tokenValid ? <Redirect to="/todolist" /> : <Login />}
        </Route>
      </Switch>
    </React.Fragment>
  );
}

export default Mainrouter;
