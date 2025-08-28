import {createSlice} from "@reduxjs/toolkit";

const financeSlice = createSlice({
  name: 'finance',
  initialState: {financeList : []},
  reducers: {
    setFinanceValue: (state) => {

    },
    getFinanceValue: (state) => {

    }
  }
})

export const { setFinanceValue, getFinanceValue } = financeSlice.actions
export default financeSlice.reducer