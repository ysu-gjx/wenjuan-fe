import { useState } from 'react'
import QuestionCard from '../../components/QuestionCard'
import { produce } from 'limu'

const Index: React.FC = () => {
  const [questionList, setQuestionList] = useState([
    { id: 'q1', title: '问卷1', isPublished: false },
    { id: 'q2', title: '问卷2', isPublished: true },
    { id: 'q3', title: '问卷3', isPublished: false },
    { id: 'q4', title: '问卷4', isPublished: true },
  ])

  const delQuestion = (id: string) => {
    setQuestionList(questionList.filter((t) => t.id !== id))
  }
  const publish = (id: string) => {
    setQuestionList(
      produce((draft) => {
        const item = draft.find((t) => t.id === id)
        item && (item.isPublished = true)
      })
    )
  }
  const add = () => {
    setQuestionList(
      produce(questionList, (draft) => {
        draft.push({
          id: 'q' + Math.random().toString().slice(-3),
          title: '问卷5',
          isPublished: false,
        })
      })
    )
  }
  return (
    <div>
      <h1>问卷列表页</h1>
      <div>
        {questionList.map((question) => {
          const { id, title, isPublished } = question
          return (
            <QuestionCard
              key={question.id}
              id={id}
              title={title}
              isPublished={isPublished}
              delQuestion={delQuestion}
              publish={publish}
            />
          )
        })}
      </div>
      <button onClick={add}>添加问卷</button>
    </div>
  )
}

export default Index
