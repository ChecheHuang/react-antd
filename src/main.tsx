import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import '@/styles/global.scss'
;(async () => {
  if (import.meta.env.MODE === 'mock') {
    console.log('引入 mock')
    const modules = import.meta.glob('@/mock/*.ts')
    Object.keys(modules).forEach(async (key) => {
      await modules[key]()
    })
    return
  }
})()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
)
