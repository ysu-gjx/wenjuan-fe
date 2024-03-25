import { FC, useEffect } from 'react'
import classNames from 'classnames'
import styles from '../pages/List.module.scss'
interface PropsType {
  id: string
  title: string
  isPublished: boolean
  delQuestion: (id: string) => void
  publish: (id: string) => void
}

const QuestionCard: FC<PropsType> = ({
  id,
  title,
  isPublished,
  delQuestion,
  publish,
}) => {
  useEffect(() => {
    return () => {
      console.log(`id: ${id} xiaohuile`)
    }
  }, [])

  const cardClass = classNames({
    [styles['list-item']]: true,
    [styles.published]: isPublished,
  })
  console.log('cardClass', cardClass)

  return (
    <div key={id} className={cardClass}>
      <strong>{title}</strong>
      &nbsp;
      {isPublished ? (
        <span className={styles['published-span']}>已发布</span>
      ) : (
        <span>未发布</span>
      )}
      &nbsp;
      <button onClick={() => publish(id)}>发布问卷</button>
      <button onClick={() => delQuestion(id)}>删除问卷</button>
    </div>
  )
}

export default QuestionCard
