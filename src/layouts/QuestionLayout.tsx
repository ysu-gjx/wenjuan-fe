import { FC } from 'react'
import { Outlet } from 'react-router-dom'

const QuestionLayout: FC = () => {
  return (
    <div>
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default QuestionLayout
