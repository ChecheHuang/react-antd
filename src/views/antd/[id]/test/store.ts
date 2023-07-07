type State = {
  count: number
  text: string
  someData: string[]
}

type Listener = () => void

type Store = {
  state: State
  setState: (
    fnOrState: ((prevState: State) => Partial<State>) | Partial<State>
  ) => void
  listeners: Set<Listener>
  subscribe: (callback: Listener) => () => void
  getSnapshot: () => State
}

const store: Store = {
  state: {
    count: 0,
    text: 'milkmidi',
    someData: ['vue', 'react'],
  },
  setState: (fnOrState) => {
    const newState =
      typeof fnOrState === 'function' ? fnOrState(store.state) : fnOrState
    store.state = {
      ...store.state,
      ...newState,
    }
    store.listeners.forEach((listener) => {
      listener()
    })
  },
  listeners: new Set<Listener>(),
  subscribe: (callback) => {
    store.listeners.add(callback)
    return () => {
      store.listeners.delete(callback)
    }
  },
  getSnapshot: () => store.state,
}

export default store
