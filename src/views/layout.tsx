import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Layout = () => {
  const navigate = useNavigate()
  return (
    <section className="flex h-screen">
      <aside className="w-64 bg-gray-200">
        <div className="flex flex-col items-center gap-2">aside</div>
      </aside>
      <section className="flex-1 flex flex-col">
        <header className="h-16 bg-blue-200 flex gap-2 items-center">
          <div>header</div>
          <div>
            <button
              onClick={() => navigate(-1)}
              className="p-2 bg-gradient-to-r from-indigo-600 to-purple-800 text-white font-semibold rounded-lg shadow-md hover:opacity-75 transition duration-300 ease-in-out"
            >
              上一頁
            </button>
          </div>
        </header>
        <main className="p-4 h-screen overflow-y-auto">
          <Outlet />
        </main>
      </section>
    </section>
  )
}

export default Layout
