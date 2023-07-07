import { createSlice, PayloadAction } from '@reduxjs/toolkit'
type StateType = {
  theme: string
  size: SizeType
}

export enum SizeType {
  small = 'small',
  middle = 'middle',
  large = 'large',
}

const initialState: StateType = {
  theme: 'dark',
  size: SizeType.middle,
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeTheme(state) {
      state.theme = state.theme === 'dark' ? 'light' : 'dark'
    },
    changeSize(state, action: PayloadAction<SizeType>) {
      state.size = action.payload
    },
  },
})
export const { changeTheme, changeSize } = themeSlice.actions
export default themeSlice.reducer
