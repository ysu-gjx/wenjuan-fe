import { useState, FC } from 'react'
import { produce } from 'limu'
import { Button, Empty, Spin, Typography, Table, Tag, Space } from 'antd'
import type { TableColumnsType } from 'antd'
import styles from './common.module.scss'
import { useRequest, useTitle } from 'ahooks'
import { Manage } from '@/types/api'
import { message, modal } from '@/utils/AntdGlobal'
import ListSearch from '@/components/ListSearch'
import { useLoadQuestionListData } from '@/hooks/useLoadQuestionListData'
import ListPage from '@/components/ListPage'
import questionApi from '@/api/question'
import { ExclamationCircleOutlined } from '@ant-design/icons'

const { Title } = Typography

const Trash: FC = () => {
  useTitle('yg问卷 - 问卷回收站')
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const { loading, data, refresh } = useLoadQuestionListData({
    isDeleted: true,
  })
  const { list = [], total = 0 } = data || {}

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
  const { run: recover } = useRequest(
    async () => {
      for await (const id of selectedIds) {
        await questionApi.updateQuestionService(id, { isDeleted: false })
      }
    },
    {
      manual: true,
      debounceWait: 500,
      async onSuccess() {
        message.success('已恢复')
        await refresh() // 刷新列表
        setSelectedIds([])
      },
    }
  )
  // 删除
  const { run: deleteQuestion } = useRequest(
    async () => {
      await questionApi.deleteQuestionsService(selectedIds)
    },
    {
      debounceWait: 500,
      manual: true,
      async onSuccess() {
        message.success('已删除')
        await refresh() // 刷新列表
        setSelectedIds([])
      },
    }
  )
  const del = () => {
    modal.confirm({
      title: '确认彻底删除该问卷？',
      icon: <ExclamationCircleOutlined />,
      content: '删除以后不可以找回',
      onOk: deleteQuestion,
    })
  }

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
      <div className={styles.footer}>
        <ListPage total={total} />
      </div>
    </>
  )
}

export default Trash
