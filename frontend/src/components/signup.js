import "../App.css";
import React, { useState } from "react";
import googleLogo from "../assets/googleLogo.png";
import { Redirect } from "react-router-dom";

// *Axios
import axios from "axios";

function SignUp() {
  var signUpInfo = {
    name: "",
    email: "",
    password: "",
  };

  const [signUpSuccess, setSignUpSuccess] = useState(false);

  const onValueChange = ({ target }) => {
    signUpInfo[target.id] = target.value;
    // setSignUpInfo({ ...signUpInfo, [target.id]: target.value }); //* Takes effect late
    console.log(signUpInfo);
  };

  const onSubmission = () => {
    axios
      .post(`http://localhost:5000/api/users`, signUpInfo)
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.data.token);
        setSignUpSuccess(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container parent-container">
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
      {signUpSuccess && (window.open("/todolist", "_self"), window.close())}
    </div>
  );
}

export default SignUp;