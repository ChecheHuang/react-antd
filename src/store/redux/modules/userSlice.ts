import { createSlice, PayloadAction } from '@reduxjs/toolkit'
interface TokenState {
  token?: string
  route?: RoleData
  user?: User
  pending: boolean
  error: boolean
}
interface RouteItem {
  label?: string
  hidden?: boolean
  accessRole?: UserRole[]
}
export interface RoleData {
  [path: string]: RouteItem
}
type UserRole = 'ADMIN' | 'USER'
export interface User {
  id: number
  user_name: string
  user_password: string
  user_email: string
  user_avatar: string
  token: string
}
const storedData = localStorage.getItem('data')
const user = storedData ? JSON.parse(storedData) : null

const initialState: TokenState = {
  token: user?.token,
  user: user?.user,
  pending: false,
  error: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateStart(state) {
      state.pending = true
    },
    updateSuccess(
      state,
      action: PayloadAction<{
        token?: string
        route?: RoleData
        user?: User
      }>
    ) {
      const data = action.payload
      const { token, route, user } = data
      localStorage.setItem('data', JSON.stringify(data))
      state.pending = false
      state.token = token
      state.route = route
      state.user = user
    },
    updateRoute(state, action) {
      const { token, user } = state
      const route = action.payload
      localStorage.setItem('data', JSON.stringify({ token, route, user }))
      state.route = route
    },
    updateError(state) {
      state.error = true
      state.pending = false
    },
  },
})
export const { updateStart, updateSuccess, updateError, updateRoute } =
  userSlice.actions
export default userSlice.reducer
