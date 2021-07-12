import "../App.css";
import React, { useState } from "react";
function ToDoList({ username }) {
  const [state, setState] = useState({
    items: [
      { itemName: "Eggs", done: false },
      { itemName: "Milk", done: false },
    ],
  });
  const [inputVisible, setInputVisible] = useState(false);

  var key = 0;

  return (
    <div className="container parent-container">
      <div>{username}</div>
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
