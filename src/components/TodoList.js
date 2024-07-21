import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  completeTodo,
  deleteTodo,
  editTodo,
  uncompleteTodo,
} from "../redux/todoSlice";
import CompletedTodo from "./CompletedTodo";
import IncompleteTodo from "./IncompleteTodo";

function TodoList(props) {
  return (
    <div className="">
      {props.incomplete.length === 0 && props.completed.length === 0 ? (
        <div
          style={{ minHeight: "60vh" }}
          className=" d-flex flex-column align-items-center justify-content-center"
        >
          <img width="200px" height="200px" src="/no result.png" />
          <p>No result found.</p>
        </div>
      ) : (
        <>
          
          <i>All your Todos are here...</i>
          {props.incomplete.length !== 0 && (
            <IncompleteTodo todos={props.incomplete} />
          )}
          {props.completed.length !== 0 && (
            <CompletedTodo todos={props.completed} />
          )}
        </>
      )}
    </div>
  );
}

export default TodoList;
