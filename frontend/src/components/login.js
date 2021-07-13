import "../App.css";
import React, { useState } from "react";
import googleLogo from "../assets/googleLogo.png";
// import { Redirect } from "react-router-dom";

// *Axios
import axios from "axios";

function Login() {
  var loginInfo = {
    email: "",
    password: "",
  };
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    msg: "",
    type: "",
    show: false,
  });

  const onValueChange = ({ target }) => {
    loginInfo[target.id] = target.value;
    // setSignUpInfo({ ...signUpInfo, [target.id]: target.value }); //* Takes effect late
    // console.log(loginInfo);
  };

  const onSubmission = async () => {
    if (loginInfo.email === "" || loginInfo.password === "") {
      setAlertConfig({
        msg:
          "Please fill " +
          (loginInfo.email ? "" : "Email") +
          (loginInfo.email === "" && loginInfo.password === "" ? " , " : "") +
          (loginInfo.password ? "" : "Password"),
        type: "info",
        show: true,
      });

      return 0;
    }
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    await axios
      .post(`http://localhost:5000/api/auth`, loginInfo)
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("username", res.data.user.name);
        setAlertConfig({
          msg: "Login Success",
          type: "success",
          show: true,
        });
        setLoginSuccess(true);
      })
      .catch((err) => {
        setAlertConfig({
          msg: err.message,
          type: "danger",
          show: true,
        });
        console.log(err);
      });
  };

  return (
    <div className="container parent-container">
      {/* Overlay */}
      {loginSuccess && (
        <div class="overlay">
          <div class="overlay__inner">
            <div class="overlay__content">
              <span class="spinner"></span>
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
              <button className="btn active-tab-btn w-100">Login</button>
            </a>
          </div>
          <div className="col px-0 mx-0">
            <a href="/signup">
              <button className="btn inactive-signup-tab-btn w-100">
                Signup
              </button>
            </a>
          </div>
        </div>

        <div className="login-inputs">
          <div className="row email-row">
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
          <div className="row password-row">
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
              Login
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
              Login with Google
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
      {loginSuccess &&
        setTimeout(() => {
          window.open("/todolist", "_self");
        }, 500)}

      {/* {loginSuccess && <Redirect to="/todolist" />} */}
    </div>
  );
}

export default Login;
