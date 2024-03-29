import request from '@/utils/request'
import { Manage, ResultData } from '@/types/api'

export default {
  //  获取单个问卷信息
  getQuestionService(id: string) {
    return request.get<Manage.QuestionDTO>(`/api/question/${id}`)
  },
  // 创建问卷
  createQuestionService() {
    return request.post<{ id: string }>('/api/question')
  },
  // 获取（查询）问卷列表
  getQuestionListService(opt: Partial<Manage.SearchOption>) {
    return request.get<ResultData<Manage.QuestionDTO>>('/api/question', opt)
  },
}
