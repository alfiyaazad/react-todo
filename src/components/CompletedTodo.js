
import React, { useState,useEffect,useRef } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import {
  completeTodo,
  deleteTodo,
  editTodo,
  uncompleteTodo,
} from "../redux/todoSlice";

function CompletedTodo(props) {
  const todos = useSelector((state) => state.todo);
  const [editingTodoId, setEditingTodoId] = useState(null); 
  const [editingTodo, setEditingTodo] = useState("");

  const editingFieldRef = useRef(null);


  const editingField = {
    // styles if needed
  };

  useEffect(() => {
    if (editingFieldRef.current && editingTodoId !== null) {
      editingFieldRef.current.focus();
    }
  }, [editingTodoId]);

  const showEditingField = (id, task) => {
    setEditingTodoId(id); // Set the id directly without changing the state value
    setEditingTodo(task);
  };

  const dispatch = useDispatch();
  const complete_todo = (id) => {
    dispatch(
      completeTodo({
        id: id,
      })
    );
  };
  const uncomplete_todo = (id) => {
    dispatch(
      uncompleteTodo({
        id: id,
      })
    );
  };
  const delete_todo = (id) => {
    dispatch(
      deleteTodo({
        id: id,
      })
    );
  };
 
  const listStyle = {
    listStyleType: "none",
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div>

      <ul className="mt-3 p-0">
      <h6 className="">COMPLETED ({props.todos.length})</h6>

        {props.todos.map((todo, index) => (
                <li
                style={listStyle}
                className="p-sm-3 px-0 py-3 border-bottom d-flex justify-content-between "
                key={todo.id}
              >
                <div className="d-flex align-items-center">
                  <span className="me-2">{index + 1}.</span>

                  <strike>{todo.task}</strike>
                </div>
                <div className="d-flex align-items-center">
                  <>
                    <button
                      id="delete-todo"
                      onClick={() => delete_todo(todo.id)}
                      className="btn px-2 py-1 me-3 btn-danger"
                    >
                      <i className="bi bi-trash3-fill"></i>
                    </button>

                    <button
                      onClick={() => uncomplete_todo(todo.id)}
                      className="btn px-2 py-1 btn-warning"
                    >
                      <i className="bi bi-x"></i>
                    </button>
                  </>
                </div>
              </li>
          
              ))}
            </ul>
      
    </div>
  )
}

export default CompletedTodo
