import request from '@/utils/request'
import { Manage } from '@/types/api'

export default {
  //  获取单个问卷信息
  getQuestionService(id: string) {
    return request.get<Manage.QuestionDTO>(`/api/question/${id}?name=1234`)
  },
  // 创建问卷
  createQuestionService() {
    return request.post<{ id: string }>('/api/question')
  },
}
