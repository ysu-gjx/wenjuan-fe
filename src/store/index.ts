import { configureStore } from '@reduxjs/toolkit'
// import countReducer from './count'
import userReducer from './userReducer'

const store = configureStore({
  reducer: {
    // count: countReducer,
    user: userReducer,
  },
})

export default store

// RootState 和 AppDispatch 类型
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
