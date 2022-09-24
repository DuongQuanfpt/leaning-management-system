import { combineReducers } from '@reduxjs/toolkit'
import sidebarSlice from './SidebarSlice/sidebarSlice'
import profileSlice from './ProfileSlice/profileSlice'

const reducer = combineReducers({
  sidebar: sidebarSlice,
  profile: profileSlice,
})
export default reducer
