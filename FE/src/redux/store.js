import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import authSlice from './AuthSlice/authSlice'
import sidebarSlice from './SidebarSlice/sidebarSlice'
import profileSlice from './ProfileSlice/profileSlice'

const persistConfig = {
  key: 'root',
  storage,
}

const reducer = combineReducers({
  auth: authSlice,
  sidebar: sidebarSlice,
  profile: profileSlice,
})

const persistedReducer = persistReducer(persistConfig, reducer)

const store = configureStore({
  reducer: persistedReducer,
})

export const persistor = persistStore(store)
export default store
