import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: '',
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload
    },
  },
})

export const { setToken } = authSlice.actions
export default authSlice.reducer
