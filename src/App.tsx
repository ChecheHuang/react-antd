import { useRoutes } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'

import router from '@/router/router'
const Routes = () => {
  const routes = useRoutes(router)
  return routes
}

function App() {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  )
}

export default App
