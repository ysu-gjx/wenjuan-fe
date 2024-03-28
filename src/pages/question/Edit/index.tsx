import { FC, useEffect, useState } from 'react'
// import { Button } from 'antd'
// import questionApi from '@/api/question'
// import { useParams } from 'react-router-dom'
// import { Manage } from '@/types/api'
import { useLoadQuestionData } from '@/hooks/useLoadQuestionData'

const Edit: FC = () => {
  const { loading, data: questionData } = useLoadQuestionData()

  return (
    <div>
      <p>Edit page</p>
      {loading ? <>loading...</> : <p>{JSON.stringify(questionData)}</p>}
    </div>
  )
}

export default Edit
