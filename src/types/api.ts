export interface Result<T = any> {
  code: number
  msg: string
  data: T
}

export interface ResultData<T = any> {
  list: T[]
  page: {
    pageNum: number
    pageSize: number
    total: number | 0
  }
}

export interface PageParams {
  pageNum: number
  pageSize?: number
}

export namespace Manage {
  export interface params {
    userName: string
    userPwd: string
  }
  export interface QuestionDTO {
    _id: string
    title: string
    isPublished: boolean
    isStar: boolean
    answerCount: number
    createdAt: string
  }
}
