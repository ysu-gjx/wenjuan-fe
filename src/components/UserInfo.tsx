import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LOGIN_PATHNAME } from '@/router'
import { Button } from 'antd'

import { UserOutlined } from '@ant-design/icons'
import storage from '@/utils/storage'
import { message } from '@/utils/AntdGlobal'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { logoutReducer } from '@/store/userReducer'
import { isLoginOrRegister } from '@/router'

const UserInfo = () => {
  const { pathname } = useLocation()
  const nav = useNavigate()
  const dispatch = useAppDispatch()
  const { username, nickname } = useAppSelector((state) => state.user)

  // const { data } = useRequest(async () => {
  //   if (isLoginOrRegister(pathname)) return {} as User.RegisterParams
  //   const res = await userApi.getUserInfoService()
  //   return res
  // })
  // const { username, nickname } = data || {}

  if (isLoginOrRegister(pathname)) {
    return null
  }

  function logout() {
    dispatch(logoutReducer())
    storage.remove('token') // 清除 token 的存储
    message.success('退出成功')
    nav(LOGIN_PATHNAME)
  }

  const UserInfo = (
    <>
      <span style={{ color: '#e8e8e8' }}>
        <UserOutlined />
        {nickname}
      </span>
      <Button type="link" onClick={logout}>
        退出
      </Button>
    </>
  )

  const Login = <Link to={LOGIN_PATHNAME}>登录</Link>

  return <div>{username ? UserInfo : Login}</div>
}

export default UserInfo
