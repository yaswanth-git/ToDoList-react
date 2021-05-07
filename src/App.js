import React, { useState } from "react";
import "./App.css";

function App() {
  const [tdl, setList] = useState([]);
  const [edt, setEdt] = useState(null);
  const adt = () => {
    if (document.getElementById("task").value.trim() != "")
      setList([...tdl, document.getElementById("task").value]);
    document.getElementById("task").value = "";
  };
  const del = (i) => {
    setList(
      tdl.filter((magic, index) => {
        return i != index;
      })
    );
  };
  const save = (i, value) => {
    if (value.trim() != "") {
      setEdt(null);
      const temp = [...tdl];
      temp[i] = value;
      setList(temp);
    }
  };
  return (
    <div id="main">
      <h1>To Do List</h1>
      <textarea id="task" />
      <button
        id="btn"
        onClick={() => {
          adt();
        }}
      >
        Add
      </button>
      <div className="container">
        {tdl.map((e, index) => {
          const cls = index % 2 == 0 ? "even" : "odd";
          if (index == edt) {
            return (
              <div className="lst">
                <input type="text" id="1" defaultValue={e} />
                <div
                  className="button save"
                  onClick={() => save(index, document.getElementById(1).value)}
                >
                  Save
                </div>
              </div>
            );
          }
          return (
            <div className="list">
              <div className={cls}>{e}</div>
              <div className="edit" onClick={() => setEdt(index)}>
                Edit
              </div>
              <div
                className="delete"
                onClick={() => {
                  del(index);
                }}
              >
                Remove
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
