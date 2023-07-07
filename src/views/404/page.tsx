const NotFoundPage: React.FC = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-indigo-300 to-purple-500">
      <div className="bg-white bg-opacity-20 p-12 rounded-lg shadow-lg backdrop-filter backdrop-blur-md text-center">
        <h1 className="text-6xl font-bold text-white mb-8">404</h1>
        <p className="text-2xl font-medium text-white mb-8">
          Oops! Page not found.
        </p>
        <a
          href="/"
          className="text-white font-semibold bg-purple-900 py-3 px-6 rounded hover:bg-opacity-80 transition duration-300 ease-in-out"
        >
          Go to Home
        </a>
      </div>
    </div>
  )
}

export default NotFoundPage
