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
  // 更新单个问卷
  updateQuestionService(id: string, opt: Partial<Manage.QuestionDTO>) {
    return request.post<string>(`/api/question/update/${id}`, opt)
  },
  // 复制问卷
  duplicateQuestionService(id: string) {
    return request.post<{ id: string }>(`/api/question/duplicate/${id}`)
  },
  // 批量彻底删除
  deleteQuestionsService(ids: string[]) {
    return request.post('/api/delete/question', { ids })
  },
}
