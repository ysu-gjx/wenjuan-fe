import { useEffect, useMemo, useRef, useState } from 'react'
import QuestionCard from '@/components/QuestionCard'
import { produce } from 'limu'
import { Typography, Spin, Empty } from 'antd'
import styles from './common.module.scss'
import { useRequest, useTitle, useDebounceFn } from 'ahooks'
import ListSearch from '@/components/ListSearch'
import questionApi from '@/api/question'
import { Manage } from '@/types/api'
import { useSearchParams } from 'react-router-dom'
import { LIST_SEARCH_PARAM_KEY, STAT_PAGE_SIZE } from '@/constant'

const { Title } = Typography

const Index: React.FC = () => {
  useTitle('yg问卷 - 问卷列表页')
  const [started, setStarted] = useState(false)
  const [page, setPage] = useState(1)
  const [list, setList] = useState<Manage.QuestionDTO[]>([])
  const [total, setTotal] = useState(10)
  const haveMoreData = total > list.length
  const [searchParams] = useSearchParams()
  const containerRef = useRef<HTMLDivElement>(null)
  const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''

  // keyword 变化时重置数据
  useEffect(() => {
    setStarted(false)
    setPage(1)
    setList([])
    setTotal(0)
  }, [keyword])

  const { run: load, loading } = useRequest(
    async () => {
      const res = await questionApi.getQuestionListService({
        page,
        pageSize: STAT_PAGE_SIZE,
        keyword,
      })

      return res
    },
    {
      manual: true,
      onSuccess(res) {
        const { list: nextList = [], total = 0 } = res
        setTotal(total)
        setList(list.concat(nextList))
        setPage(page + 1)
      },
    }
  )

  const { run: tryLoadMore } = useDebounceFn(
    () => {
      const elem = containerRef.current
      if (elem === null) return
      const domRect = elem.getBoundingClientRect()
      if (domRect === null) return
      const { bottom } = domRect
      if (bottom <= document.body.clientHeight) {
        load()
        setStarted(true)
      }
    },
    {
      wait: 500,
    }
  )
  // 当页面加载，或者 url 参数（keyword）变化时，触发加载
  useEffect(() => {
    tryLoadMore()
  }, [searchParams])

  // 当页面滚动时，尝试触发加载
  useEffect(() => {
    if (haveMoreData) {
      window.addEventListener('scroll', tryLoadMore)
    }

    return () => {
      window.removeEventListener('scroll', tryLoadMore)
    }
  }, [searchParams, haveMoreData])

  const loadMoreContentElem = useMemo(() => {
    if (!started || loading) return <Spin />
    if (total === 0) return <Empty description="暂无数据" />
    if (!haveMoreData) return <span>没有更多了...</span>
    return <span>开始加载下一页</span>
  }, [started, loading, haveMoreData])
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
        {list.length > 0 &&
          list.map((question) => {
            const { _id } = question
            return <QuestionCard key={_id} {...question} />
          })}
      </div>
      <div className={styles.footer}>
        <div ref={containerRef}>{loadMoreContentElem}</div>
      </div>
    </div>
  )
}

export default Index
