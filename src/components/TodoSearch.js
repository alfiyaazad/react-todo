import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TodoList from "./TodoList";


function TodoSearch() {
  const todos = useSelector((state) => state.todo);
  // const [editingTodoId, setEditingTodoId] = useState(null);
  // const [editingTodo, setEditingTodo] = useState("");
  const [searchText, setSearchText] = useState("");

  const [filteredIncompleteTodos, setFilteredIncompleteTodos] = useState([]);
  const [filteredCompleteTodos, setFilteredCompleteTodos] = useState([]);

  const incompletedTodos = todos
    .filter((todo) => !todo.isCompleted)
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  const completedTodos = todos
    .filter((todo) => todo.isCompleted)
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    


  const handleSearch = (searchText) => {
    setSearchText(searchText);

    if (searchText.trim() === "") {
      setFilteredIncompleteTodos([]);
      setFilteredCompleteTodos([]);
      return;
    }

    const searchLower = searchText.toLowerCase();

    const filteredIncompleted = incompletedTodos.filter((todo) =>
      todo.task.toLowerCase().includes(searchLower)
    );

    const filteredCompleted = completedTodos.filter((todo) =>
      todo.task.toLowerCase().includes(searchLower)
    );

    setFilteredIncompleteTodos(filteredIncompleted);
    setFilteredCompleteTodos(filteredCompleted);
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="">
      <div className="d-flex justify-content-center mb-4">
        <div className="d-flex col-lg-6 col-md-8 col-11 col-sm-10">
          <input
            type="text"
            className="form-control me-3"
            id="exampleFormControlInput1"
            placeholder="Search Todos"
            value={searchText}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <button
            onClick={(e) => handleSearch(searchText)}
            className="btn btn-primary"
          >
            <i className="bi bi-search "></i>
          </button>
        </div>
      </div>

      <TodoList
        completed={searchText === "" ? completedTodos : filteredCompleteTodos}
        incomplete={
          searchText === "" ? incompletedTodos : filteredIncompleteTodos
        }
      />
    </div>
  );
}

export default TodoSearch;


