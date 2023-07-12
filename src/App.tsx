import { useLocation, useNavigate, useRoutes } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import router from '@/router/router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Provider } from 'react-redux'
import store from '@/store/redux'
import AntdProvider, { useAntd } from './provider/AntdProvider'
import { useEffect } from 'react'
import ErrorBoundary from './components/ErrorBoundary'
const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 1000 * 60 * 5 } },
})
const Routes = () => {
  const routes = useRoutes(router)
  const { pathname } = useLocation()
  const token = localStorage.getItem('data')
  if (pathname === '/login' && token) {
    return <ToHome />
  }
  if (pathname !== '/login' && !token) {
    return <ToLogin />
  }
  return routes
}

function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <AntdProvider>
          <QueryClientProvider client={queryClient}>
            <BrowserRouter>
              <Routes />
            </BrowserRouter>
            {/* <ReactQueryDevtools /> */}
          </QueryClientProvider>
        </AntdProvider>
      </Provider>
    </ErrorBoundary>
  )
}

export default App

function ToLogin() {
  const navigate = useNavigate()
  const { message } = useAntd()
  useEffect(() => {
    navigate('/login')
    message.info('請先登入')
  }, [message, navigate])
  return <div></div>
}

function ToHome() {
  const navigate = useNavigate()
  const { message } = useAntd()
  useEffect(() => {
    navigate('/antd')
    message.info('您已登入')
  }, [message, navigate])
  return <div></div>
}
