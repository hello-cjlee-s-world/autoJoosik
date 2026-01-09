import {createSlice} from "@reduxjs/toolkit";

const financeSlice = createSlice({
  name: 'finance',
  initialState: {financeList : []},
  reducers: {
    setFinanceValue: (state, action) => {

    },
    getFinanceValue: (state, action) => {

    }
  }
})

export const { setFinanceValue, getFinanceValue } = financeSlice.actions
export default financeSlice.reducer