import React, { useState } from "react";
import { Route } from "react-router-dom";
// import { isTokenValid } from "../helper/auth";
import ToDoList from "./todolist";
import axios from "axios";

const PrivateRoute = (props) => {
  const [tokenValid, setTokenValid] = useState(false);
  const [username, setUserName] = useState("");

  const tokenValidator = async () => {
    await axios({
      method: "GET",
      headers: { "x-auth-token": localStorage.getItem("token") },
      url: "https://todolist-apis.herokuapp.com/api/auth/user",
    })
      .then((res) => {
        setTokenValid(true);
        setUserName(res.data.name);
        // console.log(res);
      })
      .catch((err) => {
        setTokenValid(false);
        // console.log(err);
      });
  };
  tokenValidator();
  return <Route>{tokenValid && <ToDoList username={username} />}</Route>;
};

export default PrivateRoute;
