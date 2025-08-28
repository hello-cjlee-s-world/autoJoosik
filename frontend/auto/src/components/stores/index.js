import {configureStore} from "@reduxjs/toolkit";
import financeSlice from "./financeSlice.js";

export const store = configureStore({
  reducer: {
    finance: financeSlice
  }
});