import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const getProfile = createAsyncThunk('')
const initialState = {
  personal: {
    userId: 'a',
    fullName: 'b',
    email: 'c',
    mobile: 'd',
    avatar_url: '',
    status: 'e',
    note: 'f',
    roles: 'g',
  },
}

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile(state, action) {
      state.personal = action.payload
    },
  },
})

export const { setProfile } = profileSlice.actions
export default profileSlice.reducer
