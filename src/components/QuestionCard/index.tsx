import { FC, useEffect, useState } from 'react'
import styles from './index.module.scss'
import { useNavigate, Link } from 'react-router-dom'
import { Button, Divider, Popconfirm, Space, Tag } from 'antd'
import { modal, message } from '@/utils/AntdGlobal'
import {
  EditOutlined,
  LineChartOutlined,
  StarOutlined,
  CopyOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons'
import { useRequest } from 'ahooks'
import questionApi from '@/api/question'

interface PropsType {
  _id: string // 服务端 mongodb ，自动，_id 不重复
  title: string
  isStar: boolean
  isPublished: boolean
  answerCount: number
  createdAt: string
}

const QuestionCard: FC<PropsType> = (props) => {
  const nav = useNavigate()
  const { _id, title, createdAt, answerCount, isPublished, isStar } = props
  const [isStarState, setIsStarState] = useState(isStar)
  const [isDeletedState, setIsDeletedState] = useState(false)

  const { loading: changeStarLoading, run: changeStar } = useRequest(
    async () => {
      const res = await questionApi.updateQuestionService(_id, {
        isStar: !isStar,
      })
      return res
    },
    {
      manual: true,
      onSuccess() {
        setIsStarState(!isStarState)
        message.success('已更新')
      },
    }
  )

  const { loading: duplicateLoading, run: duplicate } = useRequest(
    async () => {
      const res = await questionApi.duplicateQuestionService(_id)
      return res
    },
    {
      manual: true,
      onSuccess(res) {
        message.success('复制成功')
        nav(`/question/edit/${res.id}`) // 跳转到问卷编辑页
      },
    }
  )

  const { loading: deleteLoading, run: deleteQuestion } = useRequest(
    async () => {
      const res = await questionApi.updateQuestionService(_id, {
        isDeleted: true,
      })
      return res
    },
    {
      manual: true,
      onSuccess() {
        message.success('删除成功')
        setIsDeletedState(true)
      },
    }
  )

  function del() {
    modal.confirm({
      title: '确定删除该问卷？',
      icon: <ExclamationCircleOutlined />,
      onOk: deleteQuestion,
    })
  }

  // 已经删除的问卷，不要再渲染卡片了
  if (isDeletedState) return null

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.left}>
          <Link
            to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}
          >
            <Space>
              {isStarState && <StarOutlined style={{ color: 'red' }} />}
              {title}
            </Space>
          </Link>
        </div>
        <div className={styles.right}>
          <Space>
            {isPublished ? (
              <Tag color="processing">已发布</Tag>
            ) : (
              <Tag>未发布</Tag>
            )}
            <span>答卷：{answerCount}</span>
            <span>{createdAt}</span>
          </Space>
        </div>
      </div>
      <Divider style={{ margin: '12px 0' }} />
      <div className={styles['button-container']}>
        <div className={styles.left}>
          <Space>
            <Button
              icon={<EditOutlined />}
              type="text"
              size="small"
              onClick={() => nav(`/question/edit/${_id}`)}
            >
              编辑问卷
            </Button>
            <Button
              icon={<LineChartOutlined />}
              type="text"
              size="small"
              onClick={() => nav(`/question/stat/${_id}`)}
              disabled={!isPublished}
            >
              问卷统计
            </Button>
          </Space>
        </div>
        <div className={styles.right}>
          <Space>
            <Button
              type="text"
              icon={<StarOutlined />}
              size="small"
              disabled={changeStarLoading}
              onClick={changeStar}
            >
              {isStarState ? '取消标星' : '标星'}
            </Button>
            <Popconfirm
              title="确定复制该问卷？"
              okText="确定"
              cancelText="取消"
              onConfirm={duplicate}
            >
              <Button
                type="text"
                icon={<CopyOutlined />}
                size="small"
                disabled={duplicateLoading}
              >
                复制
              </Button>
            </Popconfirm>
            <Button
              type="text"
              icon={<DeleteOutlined />}
              size="small"
              onClick={del}
              disabled={deleteLoading}
            >
              删除
            </Button>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default QuestionCard
