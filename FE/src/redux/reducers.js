import { combineReducers } from '@reduxjs/toolkit'
import authSlice from './AuthSlice/authSlide'

const reducer = combineReducers({
  auth: authSlice,
})
export default reducer
