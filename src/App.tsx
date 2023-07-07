import { useRoutes } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import zhTW from 'antd/es/locale/zh_TW'
import router from '@/router/router'
import { ThemeProvider } from './provider/ThemeProvider'
import { MessageProvider } from './provider/MessageProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Provider } from 'react-redux'
import store from '@/store'
const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 1000 * 60 * 5 } },
})
const Routes = () => {
  const routes = useRoutes(router)
  return routes
}

function App() {
  return (
    <Provider store={store}>
      <ConfigProvider
        locale={zhTW}
        theme={{
          token: {
            colorSuccess: '#00b96b',
          },
        }}
      >
        <BrowserRouter>
          <MessageProvider>
            <ThemeProvider>
              <QueryClientProvider client={queryClient}>
                <Routes />
                <ReactQueryDevtools />
              </QueryClientProvider>
            </ThemeProvider>
          </MessageProvider>
        </BrowserRouter>
      </ConfigProvider>
    </Provider>
  )
}

export default App
