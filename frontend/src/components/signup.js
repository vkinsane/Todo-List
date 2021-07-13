import "../App.css";
import React, { useState } from "react";
import googleLogo from "../assets/googleLogo.png";
// import { Redirect } from "react-router-dom";

// *Axios
import axios from "axios";

function SignUp() {
  var signUpInfo = {
    name: "",
    email: "",
    password: "",
  };

  const [signUpSuccess, setSignUpSuccess] = useState(false);
  // const [userId, setUserId] = useState("s");
  // const [listId, setListId] = useState("s");

  const [alertConfig, setAlertConfig] = useState({
    msg: "",
    type: "",
    show: false,
  });

  const emptyInputs = () => {
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    document.getElementById("name").value = "";
  };

  const onValueChange = ({ target }) => {
    signUpInfo[target.id] = target.value;
    // setSignUpInfo({ ...signUpInfo, [target.id]: target.value }); //* Takes effect late
    console.log(signUpInfo);
  };

  const getListId = async () => {
    await axios
      .post(`http://localhost:5000/api/items/defaultList`)
      .then((res) => {
        localStorage.setItem("listId", res.data._id);
        console.log("got list id");
      })
      .catch(console.log("Unable to get List Id"));
  };

  const onSubmission = async () => {
    if (
      signUpInfo.name === "" ||
      signUpInfo.email === "" ||
      signUpInfo.password === ""
    ) {
      setAlertConfig({
        msg: "Please fill all fields",
        type: "info",
        show: true,
      });
      emptyInputs();
      return 0;
    }

    await axios
      .post(`http://localhost:5000/api/users`, signUpInfo)
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("username", res.data.user.name);
        localStorage.setItem("userId", res.data.user.id);
        setAlertConfig({
          msg: "Signup Success",
          type: "success",
          show: true,
        });
        // *Get a list_id
        getListId();
        setSignUpSuccess(true);
      })
      .catch((err) => {
        setAlertConfig({
          msg: err.message,
          type: "danger",
          show: true,
        });
        emptyInputs();
        console.log(err);
      });
  };

  return (
    <div className="container parent-container">
      {/* Overlay */}
      {signUpSuccess && (
        <div className="overlay">
          <div className="overlay__inner">
            <div className="overlay__content">
              <span className="spinner"></span>
            </div>
          </div>
        </div>
      )}
      {/* Alert Area */}
      {alertConfig.show && (
        <div
          className={`container alert alert-${alertConfig.type} custom-alerts`}
          role="alert"
        >
          {alertConfig.msg}
        </div>
      )}
      <div className="container login-page-container shadow">
        <div className="row mb-2 btn-row">
          <div className="col px-0 mx-0">
            <a href="/login">
              <button className="btn inactive-login-tab-btn w-100">
                Login
              </button>
            </a>
          </div>
          <div className="col px-0 mx-0">
            <a href="/signup">
              <button className="btn active-tab-btn w-100">Signup</button>
            </a>
          </div>
        </div>

        <div className="signup-inputs">
          <div className="row username-row">
            <div className="col-4">Username</div>
            <div className="col-8">
              <input
                id="name"
                type="text"
                className="login-input w-100"
                onChange={onValueChange}
              />
            </div>
          </div>

          <div
            className="row email-row"
            style={{
              marginTop: "10.635%",
            }}
          >
            <div className="col-4">Email</div>
            <div className="col-8">
              <input
                id="email"
                type="text"
                className="login-input w-100"
                onChange={onValueChange}
              />
            </div>
          </div>

          <div
            className="row"
            style={{
              marginTop: "10.635%",
            }}
          >
            <div className="col-4">Password</div>
            <div className="col-8">
              <input
                id="password"
                type="password"
                className="login-input w-100"
                onChange={onValueChange}
              />
            </div>
          </div>
        </div>

        <div className="col login-req-btns">
          <div className="row px-0 mx-0">
            <button
              className="btn w-100 normal-login-btn border border-primary px-0 py-1"
              onClick={onSubmission}
            >
              Signup
            </button>
          </div>
          <div className="row px-0 mx-0">
            <button
              className="btn w-100 login-with-google-btn px-0 py-1"
              onMouseOver={() => {
                var logo = document.querySelector(".google-logo");
                logo.classList.add("rotateAnti360");
              }}
              onMouseLeave={() => {
                var logo = document.querySelector(".google-logo");
                logo.classList.remove("rotateAnti360");
              }}
            >
              Signup with Google
              <img
                alt="Google-Logo"
                className="google-logo"
                src={googleLogo}
                height="35px"
              ></img>
            </button>
          </div>
        </div>
      </div>

      {/* {signUpSuccess && <Redirect to="/todolist" />} */}
      {signUpSuccess &&
        setTimeout(() => {
          window.open("/todolist", "_self");
        }, 500)}
    </div>
  );
}

export default SignUp;
