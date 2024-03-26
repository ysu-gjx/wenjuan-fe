import { useState, FC } from 'react'
import QuestionCard from '@/components/QuestionCard'
import { produce } from 'limu'
import { Button, Empty, Spin, Typography, Table, Tag, Space } from 'antd'
import type { TableColumnsType } from 'antd'
import styles from './common.module.scss'
import { useTitle } from 'ahooks'
import { Manage } from '@/types/api'
import { message, modal } from '@/utils/AntdGlobal'
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

const Trash: FC = () => {
  useTitle('yg问卷 - 问卷回收站')
  const [list, setList] = useState(rawQuestionList)
  const [loading] = useState(false)
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const tableColumns: TableColumnsType<Manage.QuestionDTO> = [
    {
      title: '标题',
      dataIndex: 'title',
      // key: 'title', // 循环列的 key ，它会默认取 dataIndex 的值
    },
    {
      title: '是否发布',
      dataIndex: 'isPublished',
      render: (isPublished) => {
        return isPublished ? (
          <Tag color="processing">已发布</Tag>
        ) : (
          <Tag>未发布</Tag>
        )
      },
    },
    {
      title: '答卷',
      dataIndex: 'answerCount',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
    },
  ]

  // 恢复
  const recover = () => {}
  // 删除
  const del = () => {}

  // 可以把 JSX 片段定义为一个变量
  const TableElem = (
    <>
      <div style={{ marginBottom: '16px' }}>
        <Space>
          <Button
            type="primary"
            disabled={selectedIds.length === 0}
            onClick={recover}
          >
            恢复
          </Button>
          <Button danger disabled={selectedIds.length === 0} onClick={del}>
            彻底删除
          </Button>
        </Space>
      </div>
      <div style={{ border: '1px solid #e8e8e8' }}>
        <Table
          dataSource={list}
          columns={tableColumns}
          pagination={false}
          rowKey={(q) => q._id}
          rowSelection={{
            selectedRowKeys: selectedIds,
            type: 'checkbox',
            onChange: (selectedRowKeys) => {
              setSelectedIds(selectedRowKeys as string[])
            },
          }}
        />
      </div>
    </>
  )

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>回收站</Title>
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
        {list.length > 0 && TableElem}
      </div>
    </>
  )
}

export default Trash
