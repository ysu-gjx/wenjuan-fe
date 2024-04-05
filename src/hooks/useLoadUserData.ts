import { isLoginOrRegister } from '@/router'
import { useState, useEffect } from 'react'
import { useRequest } from 'ahooks'
import userApi from '@/api/user'
import { useAppDispatch } from '@/store/hooks'
import useGetUserInfo from './useGetUserInfo'
import { loginReducer } from '@/store/userReducer'
import { useLocation } from 'react-router-dom'

const useLoadUserData = () => {
  const [waitingUserData, setWaitingUserData] = useState(true)
  const { username } = useGetUserInfo()
  const dispatch = useAppDispatch()
  const { pathname } = useLocation()

  const { run } = useRequest(userApi.getUserInfoService, {
    manual: true,
    onSuccess(res) {
      const { username, nickname = '' } = res
      dispatch(loginReducer({ username, nickname }))
    },
    onFinally() {
      setWaitingUserData(false)
    },
  })

  useEffect(() => {
    // 已登录或者在 登录注册页面 则不需要请求数据
    if (username || isLoginOrRegister(pathname)) {
      setWaitingUserData(false)
      return
    }

    run()
  }, [username, pathname])

  return {
    waitingUserData,
  }
}

export default useLoadUserData
