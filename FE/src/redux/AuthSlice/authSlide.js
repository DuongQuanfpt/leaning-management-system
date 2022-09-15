import { createSlice } from '@reduxjs/toolkit'
let initialState = {
  userInfo: [],
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    getUserInfo() {},
    setUserInfo: (state, { payload }) => ({
      ...state,
      userInfo: payload,
    }),
  },
})

export const { getUserInfo, setUserInfo } = authSlice.actions
export default authSlice.reducer
