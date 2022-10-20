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
  classCodes: [],
  currentClass: '',
}

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    setCurrentClass: (state, action) => {
      state.currentClass = action.payload
    },
  },
})

export const { setProfile, setCurrentClass } = profileSlice.actions
export default profileSlice.reducer
