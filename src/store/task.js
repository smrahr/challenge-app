import { combineReducers } from "@reduxjs/toolkit";

export const tasksReducer = (state = [], action) => {
  switch (action.type) {
    case "setAllTasks":
      return [...action.payload];
    case "deleteTask":
      return state.filter((item) => +item.id !== +action.payload);
    case "addTask":
      return [...state, action.payload];
    case "editTask": {
      const editedIndex = state.findIndex(
        (item) => +item.id === +action.payload.id
      );
      console.log(editedIndex, "editedIndex");
      const tasks = [...state];
      tasks[editedIndex] = action.payload.task;
      return tasks;
    }
    default:
      return state;
  }
};

export const reducers = combineReducers({
  tasks: tasksReducer,
});
