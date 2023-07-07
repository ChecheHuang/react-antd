import { env } from '@/api/env'

const Home = () => {
  return (
    <button
      onClick={() => {
        env(import.meta.env)
          .then((res) => {
            console.log(res.data)
          })
          .catch((err) => {
            console.error(err)
          })
      }}
      className="shadow-md font-bold underline "
    >
      Hello world!
    </button>
  )
}

export default Home
