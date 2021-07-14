import "../App.css";
import React, { useState } from "react";
// *Axios
import axios from "axios";

function ToDoList({ props }) {
  var userItemsArray = [];
  const fetchListData = async () => {
    await axios
      .get(`http://localhost:5000/api/items/${localStorage.getItem("listId")}`)
      .then((res) => {
        // console.log(res.data.list);
        userItemsArray = res.data.list;
        console.log(userItemsArray);
      });
  };
  fetchListData();
  const [state, setState] = useState({
    items: userItemsArray,
  });
  console.log(state.items);
  const [inputVisible, setInputVisible] = useState(false);
  document.onload = () => {
    console.log("loaded");
  };
  // const fadeAlert = () => {
  //   setTimeout(() => {
  //     document.querySelector(".custom-alerts").style.opacity = "0";
  //     setTimeout(() => {
  //       document.querySelector(".custom-alerts").style.display = "none";
  //     }, 1000);
  //     localStorage.removeItem("username");
  //   }, 3000);
  // };
  var key = 0;
  //   //TODO: before leaving add localstorage value previous page and when going to that route check first the
  //   //TODO: localstorage previuous page value and then simply redirect dont check for token or something

  const addItemToList = async () => {
    axios.put();
  };
  return (
    <div className="container parent-container">
      {/* {localStorage.getItem("username") && fadeAlert()} */}
      {localStorage.getItem("username") && (
        <div
          className="container alert alert-success custom-alerts"
          role="alert"
        >
          Welcome {props.username}!
          <span
            className="float-right close-alert-btn"
            onClick={() => {
              document.querySelector(".custom-alerts").style.display = "none";
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-check2-circle"
              viewBox="0 0 16 16"
            >
              <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z" />
              <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z" />
            </svg>
          </span>
        </div>
      )}

      <div className="container main-heading">Todo-List</div>
      <div className="container list shadow">
        {state.items.map((eachItem) => {
          return (
            <div
              style={{
                // visibility: inputVisible ? "hidden" : "",
                // opacity: "0",
                // transition: "visibility 0s 0.5s, opacity 0.5s linear",
                textDecoration: eachItem.done ? "line-through" : "none",
              }}
              key={++key}
              className="list-item"
            >
              <input
                type="checkbox"
                className="item-checkbox"
                onChange={() => {
                  let newItems = state.items;
                  newItems[state.items.indexOf(eachItem)] = {
                    itemName: eachItem.itemName,
                    done: !eachItem.done,
                  };
                  setState({
                    items: newItems,
                  });
                }}
              />
              {eachItem.itemName}
              <span
                className="delete-item-btn"
                onClick={() => {
                  setState({
                    items: state.items.filter((iteratorItem) => {
                      return iteratorItem !== eachItem;
                    }),
                  });
                }}
              >
                &#10060;
              </span>
            </div>
          );
        })}

        <div
          onMouseOver={() => {
            setInputVisible(true);
          }}
          onMouseLeave={() => {
            setTimeout(() => {
              setInputVisible(false);
            }, 700);
          }}
          className="row mb-2 mt-5"
        >
          <div
            className="mr-0 pr-0"
            style={{
              transition: "0.5s",
              flex: "0 0 auto",
              paddingLeft: inputVisible
                ? "calc(var(--bs-gutter-x) * .5)"
                : "0%",
              width: inputVisible ? "58.33333333%" : "0%",
              paddingRight: 0,
            }}
          >
            <input
              id="newItem"
              type="text"
              className="list-input mr-0 w-100 pr-0 shadow"
              placeholder="Ex. Shopping..."
            />
          </div>

          <div
            className="col-5 m-0 pl-0"
            style={{
              paddingLeft: 0,
            }}
          >
            <button
              type="button"
              className="btn list-btn w-100 ml-0 pl-0 shadow"
              onClick={() => {
                var newItemElement = document.querySelector("#newItem");
                setState({
                  items: [
                    ...state.items,
                    { itemName: newItemElement.value, done: false },
                  ],
                });
                newItemElement.value = "";
              }}
            >
              Add Item
            </button>
          </div>
        </div>
      </div>
      {/* <div className="container logout-btn">
        <button className="btn active-tab-btn w-100 support-borders">
          Logout
        </button>
      </div> */}
    </div>
  );
}

export default ToDoList;
