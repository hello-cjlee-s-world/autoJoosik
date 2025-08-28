import { configureStore } from "@reduxjs/toolkit";
import financeReducer from "./financeSlice.js";

const store = configureStore({
  reducer: {
    finance: financeReducer,  // reducer 넣기
  },
});

export default store;