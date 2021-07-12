import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";

//* Import Files
// import ToDoList from "./components/todolist";
// import Login from "./components/login";
// import SignUp from "./components/signup";
import Mainrouter from "./components/mainrouter";

//* Import Assets
import githubLogo from "./assets/githubLogo.png";
import instagramLogo from "./assets/instagramLogo.png";
import linkedInLogo from "./assets/linkedInLogo.png";
import logoutImg from "./assets/logout.png";

// *Axios
import axios from "axios";

function App() {
  const [authenticatedUser, setAuthenticatedUser] = useState(false);
  const tokenValidator = async () => {
    await axios({
      method: "GET",
      headers: { "x-auth-token": localStorage.getItem("token") },
      url: "http://localhost:5000/api/auth/user",
    })
      .then((res) => {
        setAuthenticatedUser(true);
        // console.log(res);
      })
      .catch((err) => {
        setAuthenticatedUser(false);
        // console.log(err);
      });
  };
  tokenValidator();
  // console.log(authenticatedUser);
  return (
    <React.Fragment>
      <div className="">
        <div className="row parent-top-row">
          <div className="col-9 heading-column">
            <div className="main-heading-todo-list shadow">Todo-List</div>
          </div>
          <div className="col-3 smi-column mx-0 px-0">
            <div className="social-media-icons float-right">
              <div className="col social-media-icons-column">
                <div className="row">
                  <img src={githubLogo} alt="" title="Visit my GitHub" />
                </div>
                <div className="row mt-3">
                  <img
                    src={instagramLogo}
                    alt=""
                    title="Visit my Instagram"
                  ></img>
                </div>
                <div className="row my-3">
                  <img
                    src={linkedInLogo}
                    alt=""
                    title="Visit my Linked in profile"
                  ></img>
                </div>
                {authenticatedUser && (
                  <div className="row">
                    <img
                      src={logoutImg}
                      alt="logout-button"
                      onClick={() => {
                        localStorage.removeItem("token");
                        window.open("/login", "_self");
                        window.close();
                      }}
                    ></img>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* <AuthExample /> */}
        <Router>
          <Mainrouter props={{ isAuthenticated: authenticatedUser }} />
        </Router>

        <div className="developer-div">Developed By : Vishal Khandate</div>
      </div>
    </React.Fragment>
  );
}

export default App;
