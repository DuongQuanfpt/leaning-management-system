import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  sidebarShow: true,
  sidebarUnfoldable: true,
  searchQueryDashboard: undefined,
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
    setSearchQueryDashboard(state, action) {
      state.searchQueryDashboard = action.payload
    },
  },
})

export const { setSidebarShow, setSidebarUnfoldable, setSearchQueryDashboard } = sidebarSlice.actions
export default sidebarSlice.reducer
