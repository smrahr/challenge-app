import { configureStore } from "@reduxjs/toolkit";
import { reducers } from "./task";

const store = configureStore({
  reducer: reducers,
});

export default store;
