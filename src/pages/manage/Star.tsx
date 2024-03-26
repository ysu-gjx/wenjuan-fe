import { useState, FC } from 'react'
import QuestionCard from '@/components/QuestionCard'
import { produce } from 'limu'
import { Button, Empty, Spin, Typography } from 'antd'
import styles from './common.module.scss'
import { useTitle } from 'ahooks'
import ListSearch from '@/components/ListSearch'

const { Title } = Typography

const rawQuestionList = [
  {
    _id: 'q1',
    title: '问卷1',
    isPublished: false,
    isStar: true,
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
    isStar: true,
    answerCount: 1,
    createdAt: '2022-01-01 00:00:00',
  },
]

const Star: FC = () => {
  useTitle('yg问卷 - 星标问卷')
  const [list, setList] = useState(rawQuestionList)
  const [loading] = useState(false)
  return (
    <div>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>星标问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin />
          </div>
        )}
        {!loading && list.length === 0 && <Empty description="暂无数据" />}
        {list.length > 0 &&
          list.map((q: any) => {
            const { _id } = q
            return <QuestionCard key={_id} {...q} />
          })}
      </div>
      <div className={styles.footer}>分页</div>
    </div>
  )
}

export default Star
