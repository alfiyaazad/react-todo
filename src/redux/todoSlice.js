import { createSlice } from "@reduxjs/toolkit";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("todos");
    if (serializedState === null) {
      return [];
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return [];
  }
};

export const todoSlice = createSlice({
  name: "todo",
  initialState: loadState(),
  reducers: {
    addTodo: (state, action) => {
      const newId = state.length > 0 ? state[state.length - 1].id + 1 : 1;

      const newTodo = {
        id: newId,
        task: action.payload.task,
        isCompleted: false,
        timestamp: new Date().toISOString(),
      };

      state.push(newTodo);
    },
    completeTodo: (state, action) => {
      state.find((item) => item.id === action.payload.id).isCompleted = true;
    },
    uncompleteTodo: (state, action) => {
      state.find((item) => item.id === action.payload.id).isCompleted = false;
    },
    deleteTodo: (state, action) => {
      const index = state.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
    editTodo: (state, action) => {
      const todo = state.find((item) => item.id === action.payload.id)
      todo.task = action.payload.task;
      todo.timestamp = new Date().toISOString();
    },
    
  },
});

export const {
  addTodo,
  editTodo,
  completeTodo,
  uncompleteTodo,
  deleteTodo,
} = todoSlice.actions;

export default todoSlice.reducer;
