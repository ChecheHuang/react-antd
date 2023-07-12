import { create } from 'zustand'
type ThemeType = {
  mode: string
  size: SizeType
}
export enum SizeType {
  small = 'small',
  middle = 'middle',
  large = 'large',
}

interface ZustandStore {
  theme: ThemeType
  changeTheme: () => void
  changeSize: (size: SizeType) => void
}

const useZustand = create<ZustandStore>((set) => ({
  theme: {
    mode: 'dark',
    size: SizeType.middle,
  },
  changeTheme: () =>
    set((state) => {
      state.theme.mode = state.theme.mode === 'dark' ? 'light' : 'dark'
      return state
    }),
  changeSize: (size) =>
    set((state) => {
      state.theme.size = size
      return state
    }),
}))

export default useZustand
