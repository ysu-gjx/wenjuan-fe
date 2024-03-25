import { FC } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const Home: FC = () => {
  const nav = useNavigate()
  return (
    <div>
      home
      <button
        onClick={() => {
          nav({
            pathname: '/login',
            search: 'from=home',
          })
        }}
      >
        click
      </button>
      <Link to="/register">register</Link>
    </div>
  )
}

export default Home
