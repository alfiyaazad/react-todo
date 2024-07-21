import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, markAllCompleted } from "../redux/todoSlice";

function Header() {
  const todos = useSelector((state) => state.todo);
  const dispatch = useDispatch();
  const [newTodo, setNewTodo] = useState("");

  const enterTodo = (e) => {
    setNewTodo(e.target.value);
  };
  const add_todo = () => {
    dispatch(
      addTodo({
        task: newTodo,
      })
    );
    setNewTodo("");
  };

  

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="d-flex flex-column">
      <div className="d-flex justify-content-center flex-column align-items-center">
      <img width="150px" height="150px" src="/logo 2.png" />

        {/* <h1 className="text-center">PERSONAL TODO APP</h1> */}
        <b className="m-0 ms-3 h3" >TO DO!</b>

      </div>
      
      <div className="my-3 d-flex">
        <input
          type="email"
          className="form-control me-3"
          id="exampleFormControlInput1"
          placeholder="Add Todo"
          value={newTodo}
          onChange={enterTodo}
        />
        <button onClick={add_todo} className="btn btn-primary">
          <i className="bi bi-plus"></i>
        </button>
      </div>

      {todos.length !== 0 || (
        <div
          style={{ minHeight: "60vh" }}
          className=" d-flex flex-column align-items-center justify-content-center"
        >
          <img width="200px" height="200px" src="/todo.png" />
          <p>Try adding some tasks to see them here.</p>
        </div>
      )}
    </div>
  );
}

export default Header;
