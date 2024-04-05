import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const INITIAL_STATE = 100
const countSlice = createSlice({
  name: 'count',
  initialState: INITIAL_STATE,
  reducers: {
    increment(state, action: PayloadAction<number>) {
      return state + action.payload
    },
    decrement(state) {
      return state - 1
    },
  },
})

export const { increment, decrement } = countSlice.actions
export default countSlice.reducer
