import { combineReducers } from '@reduxjs/toolkit'
import authSlice from './AuthSlice/authSlide'
import sidebarSlice from './SidebarSlice/sidebarSlice'

const reducer = combineReducers({
  auth: authSlice,
  sidebar: sidebarSlice,
})
export default reducer
