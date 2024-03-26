import { useState } from 'react'
import QuestionCard from '@/components/QuestionCard'
import { produce } from 'limu'
import { Button, Typography } from 'antd'
import styles from './common.module.scss'
import { useTitle } from 'ahooks'
import ListSearch from '@/components/ListSearch'

const { Title } = Typography

const rawQuestionList = [
  {
    _id: 'q1',
    title: '问卷1',
    isPublished: false,
    isStar: false,
    answerCount: 1,
    createdAt: '2022-01-01 00:00:00',
  },
  {
    _id: 'q2',
    title: '问卷2',
    isPublished: true,
    isStar: true,
    answerCount: 3,
    createdAt: '2022-01-01 00:00:00',
  },
  {
    _id: 'q3',
    title: '问卷3',
    isPublished: false,
    isStar: false,
    answerCount: 1,
    createdAt: '2022-01-01 00:00:00',
  },
  {
    _id: 'q4',
    title: '问卷4',
    isPublished: true,
    isStar: true,
    answerCount: 3,
    createdAt: '2022-01-01 00:00:00',
  },
]

const Index: React.FC = () => {
  useTitle('yg问卷 - 问卷列表页')
  const [questionList, setQuestionList] = useState(rawQuestionList)

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>问卷列表页</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>

      <div className={styles.content}>
        {/* 问卷列表 */}
        {questionList.length &&
          questionList.map((question) => {
            const { _id } = question
            return <QuestionCard key={_id} {...question} />
          })}
      </div>
    </div>
  )
}

export default Index
