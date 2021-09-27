import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [tdl, setTdl] = useState([]);
  const [edt, setEdt] = useState(null);
  const [flag, setFlag] = useState(true);
  useEffect(() => {
    const magic = async () => {
      try {
        const res = await fetch("https://yaswanth-to-do.herokuapp.com/");
        const data = await res.json();
        setTdl(data);
      } catch (err) {
        console.log("error....", err);
      }
    };
    magic();
  }, [flag]);
  const adt = async () => {
    await fetch("https://yaswanth-to-do.herokuapp.com/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: text,
      }),
    });
    setFlag(!flag);
  };
  const del = async (i) => {
    await fetch("https://yaswanth-to-do.herokuapp.com/", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: i,
      }),
    });
    setFlag(!flag);
  };
  const save = async (i, value) => {
    if (value.trim() != "") {
      await fetch("https://yaswanth-to-do.herokuapp.com/", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: i,
          text: value,
        }),
      });
      setEdt(null);
      setFlag(!flag);
    }
  };
  return (
    <div id="main">
      <h1>To Do List</h1>
      <div className="wrapper">
        <div>
          <input
            id="task"
            value={text}
            onChange={(e) => setText(e.currentTarget.value)}
          />
          <button
            id="btn"
            onClick={() => {
              adt();
            }}
          >
            Add
          </button>
        </div>
      </div>
      <div className="container">
        {tdl.map((e, index) => {
          const cls = index % 2 == 0 ? "even" : "odd";
          if (e._id == edt) {
            return (
              <div key={e._id} className="lst">
                <input type="text" id="1" defaultValue={e.text} />
                <div
                  className="button save"
                  onClick={() => save(e._id, document.getElementById(1).value)}
                >
                  Save
                </div>
              </div>
            );
          }
          return (
            <div key={e._id} className="list">
              <div className={cls}>{e.text}</div>
              <div className="edit" onClick={() => setEdt(e._id)}>
                Edit
              </div>
              <div
                className="delete"
                onClick={() => {
                  del(e._id);
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
