import { createContext, useContext, useReducer } from 'react'

type StateType = {
  theme: string
  size: SizeType
}

export enum SizeType {
  small = 'small',
  middle = 'middle',
  large = 'large',
}

type ColorActionType = {
  type: 'CHANGE_THEME'
}
type SizeActionType = {
  type: 'CHANGE_SIZE'
  payload: SizeType
}

type ActionType = ColorActionType | SizeActionType

const INITIAL_STATE = {
  theme: 'dark',
  size: SizeType.middle,
}

const ThemeContext = createContext<{
  state: StateType
  dispatch: React.Dispatch<ActionType>
}>({
  state: INITIAL_STATE,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  dispatch: () => {},
})

export const useTheme = () => useContext(ThemeContext)

const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case 'CHANGE_THEME':
      return {
        ...state,
        theme: state.theme === 'dark' ? 'light' : 'dark',
      }
    case 'CHANGE_SIZE':
      return {
        ...state,
        size: action.payload,
      }

    default:
      return state
  }
}

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

  return (
    <ThemeContext.Provider value={{ state, dispatch }}>
      {children}
    </ThemeContext.Provider>
  )
}
