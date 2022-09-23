import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  sidebarShow: true,
  sidebarUnfoldable: true,
}

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    setSidebarShow(state, action) {
      state.sidebarShow = action.payload
    },
    setSidebarUnfoldable(state, action) {
      state.sidebarUnfoldable = action.payload
    },
  },
})

export const { setSidebarShow, setSidebarUnfoldable } = sidebarSlice.actions
export default sidebarSlice.reducer
