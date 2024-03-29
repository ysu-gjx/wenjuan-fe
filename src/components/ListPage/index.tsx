import { Pagination, PaginationProps } from 'antd'
import { FC, useEffect, useState } from 'react'
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom'
import {
  STAT_PAGE_SIZE,
  LIST_PAGE_PARAM_KEY,
  LIST_PAGE_SIZE_PARAM_KEY,
} from '@/constant'

type PropsType = {
  total: number
}

const ListPage: FC<PropsType> = ({ total }) => {
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(STAT_PAGE_SIZE)
  const [searchParams] = useSearchParams()
  const { pathname } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || '') || 1
    const pageSize =
      parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '') ||
      STAT_PAGE_SIZE
    setCurrent(page)
    setPageSize(pageSize)
  }, [searchParams])

  const handlePageChange: PaginationProps['onShowSizeChange'] = (
    page,
    pageSize
  ) => {
    searchParams.set(LIST_PAGE_SIZE_PARAM_KEY, pageSize + '')
    searchParams.set(LIST_PAGE_PARAM_KEY, page + '')
    navigate({
      pathname,
      search: searchParams.toString(),
    })
  }

  return (
    <Pagination
      current={current}
      total={total}
      pageSize={pageSize}
      onChange={handlePageChange}
    />
  )
}

export default ListPage
