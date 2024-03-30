export interface Result<T = any> {
  code: number
  msg: string
  data: T
}

export interface ResultData<T = any> {
  list: T[]
  total: number | 0
  // page: {
  //   pageNum: number
  //   pageSize: number
  //   total: number | 0
  // }
}

export interface PageParams {
  page: number
  pageSize?: number
}

export namespace Manage {
  export interface params {
    userName: string
    userPwd: string
  }
  export interface SearchOption extends PageParams {
    keyword: string
    isStar: boolean
    isDeleted: boolean
  }
  export interface QuestionDTO {
    _id: string
    title: string
    isPublished: boolean
    isStar: boolean
    isDeleted?: boolean
    answerCount: number
    createdAt: string
  }
}
