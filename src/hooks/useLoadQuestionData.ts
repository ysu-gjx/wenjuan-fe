import { FC, useEffect, useState } from 'react'
import questionApi from '@/api/question'
import { useParams } from 'react-router-dom'
import { Manage } from '@/types/api'
import { useRequest } from 'ahooks'

export const useLoadQuestionData = () => {
  const { id = '' } = useParams()

  const load = async () => {
    const res = await questionApi.getQuestionService(id)
    return res
  }

  const { loading, error, data } = useRequest(load)

  return { loading, data, error }
}
