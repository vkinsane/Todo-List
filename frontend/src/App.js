import "./App.css";
import React from "react";
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

function App() {
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
                  <img src={githubLogo} alt="" />
                </div>
                <div className="row">
                  <img className="my-3" src={instagramLogo} alt=""></img>
                </div>
                <div className="row">
                  <img src={linkedInLogo} alt=""></img>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Router>
          <Mainrouter />
        </Router>

        <div className="developer-div">Developed By : Vishal Khandate</div>
      </div>
    </React.Fragment>
  );
}

export default App;
