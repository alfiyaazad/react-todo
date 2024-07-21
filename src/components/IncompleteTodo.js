
import React, { useState,useEffect,useRef } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import {
  completeTodo,
  deleteTodo,
  editTodo,
  uncompleteTodo,
} from "../redux/todoSlice";

function IncompleteTodo(props) {
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
  const edit_todo = (id) => {
    dispatch(
      editTodo({
        id: id,
        task: editingTodo,
      })
    );

    setEditingTodoId(null);
  };

  const listStyle = {
    listStyleType: "none",
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div>

<ul className="mt-3">
              {props.todos.map((todo, index) => (
                <li
                  style={listStyle}
                  className="p-3 border-bottom d-flex justify-content-between "
                  key={todo.id}
                >
                  <div className="d-flex align-items-center">
                    <span className="me-2">{index + 1}.</span>
                    {editingTodoId === todo.id ? (
                      <input
                        ref={editingFieldRef}
                        style={editingField}
                        value={editingTodo} // Use todo.task directly for input value
                        onChange={(e) => {
                          setEditingTodo(e.target.value);
                        }}
                        type="text"
                      />
                    ) : (
                      <span>{todo.task}</span>
                    )}
                  </div>
                  <div className="d-flex align-items-center">
                    {editingTodoId !== todo.id ? (
                      <>
                        <button
                          onClick={() => showEditingField(todo.id, todo.task)}
                          className="btn px-2 py-1 me-3 btn-primary"
                        >
                          <i className="bi bi-pencil-square"></i>
                        </button>

                        <button
                          id="delete-todo"
                          onClick={() => delete_todo(todo.id)}
                          className="btn px-2 py-1 me-3 btn-danger"
                        >
                          <i className="bi bi-trash3-fill"></i>
                        </button>

                        <button
                          onClick={() => complete_todo(todo.id)}
                          className="btn px-2 py-1 btn-success"
                        >
                          <i className="bi bi-check2"></i>
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => edit_todo(todo.id)}
                        className="btn px-2 py-1 btn-secondary"
                      >
                        Edit Todo
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
      
    </div>
  )
}

export default IncompleteTodo
