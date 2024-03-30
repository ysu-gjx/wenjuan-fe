import questionApi from '@/api/question'
import { useRequest } from 'ahooks'
import { useSearchParams } from 'react-router-dom'
import { Manage } from '@/types/api'
import {
  LIST_SEARCH_PARAM_KEY,
  LIST_PAGE_PARAM_KEY,
  LIST_PAGE_SIZE_PARAM_KEY,
  STAT_PAGE_SIZE,
} from '@/constant'

type OptionType = {
  isStar: boolean
  isDeleted: boolean
}

export const useLoadQuestionListData = (opt: Partial<OptionType> = {}) => {
  const { isStar, isDeleted } = opt
  const [searchParams] = useSearchParams()

  const { loading, data, error, refresh } = useRequest(
    async () => {
      const params = {
        keyword: searchParams.get(LIST_SEARCH_PARAM_KEY) || '',
        page: parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || '') || 1,
        pageSize:
          parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '') ||
          STAT_PAGE_SIZE,
        isStar,
        isDeleted,
      }
      const res = await questionApi.getQuestionListService(params)
      return res
    },
    {
      refreshDeps: [searchParams],
    }
  )

  return { data, loading, error, refresh }
}
