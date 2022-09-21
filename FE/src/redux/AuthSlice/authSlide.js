import { createSlice } from '@reduxjs/toolkit'

const currentUser = JSON.parse(localStorage.getItem('LMS-Profile-Data'))

const initialState = {
  isLoggedIn: false,
  currentUser: currentUser ? currentUser : undefined,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.isLoggedIn = true
      state.currentUser = action.payload
    },
    logout(state) {
      state.isLoggedIn = false
      state.currentUser = undefined
    },
  },
})

export const { loginSuccess, logout } = authSlice.actions
export default authSlice.reducer
