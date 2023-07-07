import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Page: React.FC = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/antd')
  }, [navigate])

  return (
    <>
      <div>page</div>
    </>
  )
}

export default Page
