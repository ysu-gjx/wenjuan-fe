import { createBrowserRouter, Navigate } from 'react-router-dom'

import MainLayout from '@/layouts/MainLayout'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Login/Register'
import NotFound from '@/pages/NotFound'
import ManageLayout from '@/layouts/ManageLayout'
import List from '@/pages/manage/List'
import Trash from '@/pages/manage/Trash'
import Star from '@/pages/manage/Star'
import QuestionLayout from '@/layouts/QuestionLayout'
import Edit from '@/pages/question/Edit'
import Stat from '@/pages/question/Stat'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'manage',
        element: <ManageLayout />,
        children: [
          {
            path: 'list',
            element: <List />,
          },
          {
            path: 'star',
            element: <Star />,
          },
          {
            path: 'trash',
            element: <Trash />,
          },
        ],
      },
      {
        path: '/404',
        element: <NotFound />,
      },
      {
        path: '*',
        element: <Navigate to="/404" />,
      },
    ],
  },
  {
    path: 'question',
    element: <QuestionLayout />,
    children: [
      {
        path: 'edit/:id',
        element: <Edit />,
      },
      {
        path: 'stat/:id', // statistic 统计
        element: <Stat />,
      },
    ],
  },
])

export default router

// ------------ 分割线 ------------

// 常用的路由，常量
export const HOME_PATHNAME = '/'
export const LOGIN_PATHNAME = '/login'
export const REGISTER_PATHNAME = '/register'
export const MANAGE_INDEX_PATHNAME = '/manage/list'
