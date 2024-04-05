import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useGetUserInfo from './useGetUserInfo'
import {
  LOGIN_PATHNAME,
  MANAGE_INDEX_PATHNAME,
  isLoginOrRegister,
  isNoNeedUserInfo,
} from '@/router'
import storage from '@/utils/storage'

const useNavPage = (waitingUserData: boolean) => {
  const { username } = useGetUserInfo()
  const { pathname } = useLocation()
  const nav = useNavigate()

  useEffect(() => {
    // 加载中国
    if (waitingUserData) return

    // 登录状态，不能跳转到登录注册页面
    // 1.下面这个判断token 是防止直接在login 页面刷新，导致没有username,但是是登录状态
    // 2. 还有就是不加的话，点击登录后，会先跳到 list 页面在跳到登录页，拿到username后再跳到list页面
    if (username || storage.get('token')) {
      if (isLoginOrRegister(pathname)) {
        nav(MANAGE_INDEX_PATHNAME)
      }

      return
    }

    // 未登录
    if (isNoNeedUserInfo(pathname)) {
      return
    } else {
      nav(LOGIN_PATHNAME)
    }
  }, [waitingUserData, username, pathname])
}

export default useNavPage
