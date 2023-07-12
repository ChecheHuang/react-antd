import React, { createContext, useContext } from 'react'
import { Modal, message } from 'antd'
import type { MessageInstance } from 'antd/es/message/interface'
import { ModalStaticFunctions } from 'antd/es/modal/confirm'
import { ConfigProvider } from 'antd'
import zhTW from 'antd/es/locale/zh_TW'
const AntdContext = createContext<{
  message: MessageInstance
  modal: Omit<ModalStaticFunctions, 'warn'>
} | null>(null)

export function useAntd() {
  const messageContext = useContext(AntdContext)
  if (!messageContext) {
    throw new Error('useAntd must be used within a AntdProvider')
  }
  return messageContext
}

function AntdProvider({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  const [messageApi, messageContextHolder] = message.useMessage()
  const [modal, modelContextHolder] = Modal.useModal()
  return (
    <ConfigProvider
      locale={zhTW}
      theme={{
        token: {
          colorSuccess: '#00b96b',
        },
      }}
    >
      <AntdContext.Provider value={{ message: messageApi, modal }}>
        {children}
        {messageContextHolder}
        {modelContextHolder}
      </AntdContext.Provider>
    </ConfigProvider>
  )
}
export default AntdProvider
