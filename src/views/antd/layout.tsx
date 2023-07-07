import { Outlet, useOutletContext } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import Aside from './components/Aside'
import Header from './components/Header'
import { message } from 'antd'
import type { MessageInstance } from 'antd/es/message/interface'
import { useWindowInfo } from '@/hooks/useHook'
const Layout = () => {
  const { windowWidth } = useWindowInfo()
  const [collapsed, setCollapsed] = useState(windowWidth < 1000)
  const mainRef = useRef<HTMLDivElement | null>(null)
  const [messageApi, contextHolder] = message.useMessage()
  useEffect(() => {
    setCollapsed(windowWidth < 1000)
  }, [windowWidth])

  return (
    <section className="flex h-screen">
      <Aside collapsed={collapsed} />
      <section className="flex flex-1 flex-col overflow-y-auto">
        <Header
          toggleCollapsed={() => setCollapsed(!collapsed)}
          collapsed={collapsed}
        />
        <main
          ref={mainRef}
          className="relative h-[calc(100vh-4rem)] overflow-y-auto scroll-smooth bg-slate-200  scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-dark scrollbar-thumb-rounded   "
        >
          <Outlet context={{ mainRef: mainRef, messageApi }} />
          {contextHolder}
        </main>
      </section>
    </section>
  )
}

export default Layout
type ContextType = { mainRef: any; messageApi: MessageInstance }
export function useMainRef() {
  const { mainRef } = useOutletContext<ContextType>()
  return mainRef
}
export function useMessage() {
  const { messageApi } = useOutletContext<ContextType>()
  if (!messageApi) {
    throw new Error('useMessage must be used within a MessageProvider')
  }
  return messageApi
}
