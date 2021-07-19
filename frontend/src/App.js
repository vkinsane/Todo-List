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
        console.log(res);
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
                <a href="https://github.com/vkinsane">
                  <div className="row">
                    <img src={githubLogo} alt="" title="Visit my GitHub" />
                  </div>
                </a>
                <a href="https://www.instagram.com/vk_insane3/">
                  <div className="row mt-3">
                    <img
                      src={instagramLogo}
                      alt=""
                      title="Visit my Instagram"
                    ></img>
                  </div>
                </a>
                <a href="https://www.linkedin.com/in/vishal-khandate-a059831a0/">
                  <div className="row my-3">
                    <img
                      src={linkedInLogo}
                      alt=""
                      title="Visit my Linked in profile"
                    ></img>
                  </div>
                </a>
                {authenticatedUser && (
                  <div className="row">
                    <img
                      src={logoutImg}
                      alt="logout-button"
                      onClick={() => {
                        localStorage.clear();
                        window.open("/login", "_self");
                      }}
                    ></img>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <Router>
          <Mainrouter
            props={{
              isAuthenticated: authenticatedUser,
              username: localStorage.getItem("username"),
            }}
          />
        </Router>

        <div className="developer-div">Developed By : Vishal Khandate</div>
      </div>
    </React.Fragment>
  );
}

export default App;
