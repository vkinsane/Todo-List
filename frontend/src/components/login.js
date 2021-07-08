import "../App.css";
import React, { useState } from "react";
import googleLogo from "../assets/googleLogo.png";
function Login() {
  return (
    <div className="container parent-container">
      <div className="container login-page-container shadow">
        <div className="row mb-2 btn-row">
          <div className="col px-0 mx-0">
            <button className="btn login-tab-btn w-100">Login</button>
          </div>
          <div className="col px-0 mx-0">
            <button className="btn signup-tab-btn w-100">Signup</button>
          </div>
        </div>

        <div className="login-inputs">
          <div className="row email-row">
            <div className="col-4">Email</div>
            <div className="col-8">
              <input type="text" className="login-input w-100" />
            </div>
          </div>
          <div className="row password-row">
            <div className="col-4">Password</div>
            <div className="col-8">
              <input type="text" className="login-input w-100" />
            </div>
          </div>
        </div>

        <div className="col login-req-btns">
          <div className="row px-0 mx-0">
            {/* #007EFC */}
            <button className="btn w-100 normal-login-btn border border-primary px-0 py-1">
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
    </div>
  );
}

export default Login;
