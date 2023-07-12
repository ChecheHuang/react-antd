import { configureStore } from '@reduxjs/toolkit'
import themeReducer from './modules/themeSlice'
import userReducer from './modules/userSlice'
import {
  TypedUseSelectorHook,
  useDispatch as originDispatch,
  useSelector as originSelector,
} from 'react-redux'

const store = configureStore({
  reducer: {
    theme: themeReducer,
    user: userReducer,
  },
})

export default store

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch
export const useSelector: TypedUseSelectorHook<RootState> = originSelector
export const useDispatch = () => originDispatch<AppDispatch>()
