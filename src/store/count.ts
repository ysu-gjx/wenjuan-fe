import { createSlice } from '@reduxjs/toolkit'

const INITIAL_STATE = 100
const countSlice = createSlice({
  name: 'count',
  initialState: INITIAL_STATE,
  reducers: {
    increment(state) {
      return state + 1
    },
    decrement(state) {
      return state - 1
    },
  },
})

export const { increment, decrement } = countSlice.actions
export default countSlice.reducer
