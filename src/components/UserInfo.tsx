import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LOGIN_PATHNAME, REGISTER_PATHNAME } from '@/router'
import { Button } from 'antd'
import userApi from '@/api/user'
import { useRequest } from 'ahooks'
import { User } from '@/types/api'
import { UserOutlined } from '@ant-design/icons'
import storage from '@/utils/storage'
import { message } from '@/utils/AntdGlobal'

const checkInLogin = (pathname: string) => {
  return pathname === LOGIN_PATHNAME || pathname === REGISTER_PATHNAME
}

const UserInfo = () => {
  const { pathname } = useLocation()
  const nav = useNavigate()

  const { data } = useRequest(async () => {
    if (checkInLogin(pathname)) return {} as User.RegisterParams
    const res = await userApi.getUserInfoService()
    return res
  })
  const { username, nickname } = data || {}

  if (checkInLogin(pathname)) {
    return null
  }

  function logout() {
    // dispatch(logoutReducer)
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
