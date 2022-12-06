import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  sidebarShow: false,
  sidebarUnfoldable: false,
  searchQueryDashboard: undefined,
  searchQueryHomepage: undefined,
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
    setSearchQueryHomepage(state, action) {
      state.searchQueryHomepage = action.payload
    },
  },
})

export const { setSidebarShow, setSidebarUnfoldable, setSearchQueryDashboard, setSearchQueryHomepage } =
  sidebarSlice.actions
export default sidebarSlice.reducer
