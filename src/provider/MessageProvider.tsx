import React, { createContext, useContext } from 'react'
import { message } from 'antd'
import type { MessageInstance } from 'antd/es/message/interface'
const MessageContext = createContext<MessageInstance | null>(null)

export function useMessage() {
  const messageApi = useContext(MessageContext)
  if (!messageApi) {
    throw new Error('useMessage must be used within a MessageProvider')
  }
  return messageApi
}

export function MessageProvider({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  const [messageApi, contextHolder] = message.useMessage()
  return (
    <MessageContext.Provider value={messageApi}>
      {contextHolder}
      {children}
    </MessageContext.Provider>
  )
}
