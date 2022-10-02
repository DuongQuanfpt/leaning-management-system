import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userId: '',
  fullName: '',
  email: '',
  mobile: '',
  avatar_url: '',
  status: '',
  note: '',
  roles: [],
}

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
})

export const { setProfile } = profileSlice.actions
export default profileSlice.reducer
