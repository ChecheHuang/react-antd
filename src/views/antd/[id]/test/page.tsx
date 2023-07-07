import { useSyncExternalStore } from 'react'
import store from './store'

const Page: React.FC = () => {
  // 取 state 的值
  const state = useSyncExternalStore(store.subscribe, store.getSnapshot)
  const { count, someData, text } = state
  return (
    <>
      <div>
        count:{count}
        <br />
        someData:{someData}
        <br />
        text:{text}
        <br />
        <button
          // 更新
          onClick={() => {
            store.setState({ count: count + 1 })
          }}
        >
          increment
        </button>
      </div>
    </>
  )
}

export default Page
