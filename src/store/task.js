import { combineReducers } from "@reduxjs/toolkit";

export const tasksReducer = (state = [], action) => {
  switch (action.type) {
    case "setAllTasks":
      return [...action.payload];
    case "deleteTask":
      return state.filter((item) => item !== action.payload);
    default:
      return state;
  }
};

export const reducers = combineReducers({
  tasks: tasksReducer,
});
