import request from '@/utils/request'
import { User } from '@/types/api'

export default {
  // 获取用户信息
  getUserInfoService() {
    return request.get<User.RegisterParams>('/api/user/info')
  },

  // 注册用户
  registerService(params: User.RegisterParams) {
    return request.post<string>('/api/user/register', params)
  },
  // 登录
  loginService(params: User.LoginParams) {
    return request.post<{ token: string }>('/api/user/login', params)
  },
}
