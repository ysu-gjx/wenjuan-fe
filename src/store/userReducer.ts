import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { User } from '@/types/api'

const INITIAL_STATE: User.UserInfo = { username: '', nickname: '' }

const userSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {
    loginReducer(state, action: PayloadAction<User.UserInfo>) {
      return action.payload
    },
    logoutReducer(state) {
      return INITIAL_STATE
    },
  },
})

export const { loginReducer, logoutReducer } = userSlice.actions
export default userSlice.reducer
