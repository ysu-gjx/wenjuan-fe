import { FC } from 'react'
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'

const Login: FC = () => {
  const nav = useNavigate()
  const searchParams = useLocation()
  const [s1] = useSearchParams()
  return (
    <div>
      login
      <button onClick={() => nav(-1)}>fanhui</button>
    </div>
  )
}

export default Login
