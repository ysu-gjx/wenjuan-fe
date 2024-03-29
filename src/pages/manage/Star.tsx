import { useState, FC } from 'react'
import QuestionCard from '@/components/QuestionCard'
import { produce } from 'limu'
import { Button, Empty, Spin, Typography } from 'antd'
import styles from './common.module.scss'
import { useTitle } from 'ahooks'
import ListSearch from '@/components/ListSearch'
import { useLoadQuestionListData } from '@/hooks/useLoadQuestionListData'
import ListPage from '@/components/ListPage'

const { Title } = Typography

const Star: FC = () => {
  useTitle('yg问卷 - 星标问卷')

  const { loading, data } = useLoadQuestionListData({ isStar: true })
  const { list = [], total = 0 } = data || {}
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
      <div className={styles.footer}>
        <ListPage total={total} />
      </div>
    </div>
  )
}

export default Star
