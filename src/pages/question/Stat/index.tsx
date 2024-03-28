import { FC } from 'react'
import { useLoadQuestionData } from '@/hooks/useLoadQuestionData'

const Stat: FC = () => {
  const { loading, data: questionData } = useLoadQuestionData()
  return (
    <div>
      <p>Stat page</p>
      {loading ? <>loading...</> : <p>{JSON.stringify(questionData)}</p>}
    </div>
  )
}

export default Stat
