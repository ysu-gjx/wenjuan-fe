import { FC, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import storage from '@/utils/storage'
import { UserAddOutlined } from '@ant-design/icons'
import { Button, Input, Typography, Space, Form, Checkbox } from 'antd'
import styles from './index.module.scss'
import { MANAGE_INDEX_PATHNAME, REGISTER_PATHNAME } from '@/router'
import userApi from '@/api/user'
import { useRequest } from 'ahooks'
import { User } from '@/types/api'
import { message } from '@/utils/AntdGlobal'

const { Title } = Typography

const USERNAME_KEY = 'USERNAME'
const PASSWORD_KEY = 'PASSWORD'
const rememberUser = (username: string, password: string) => {
  storage.set(USERNAME_KEY, username)
  storage.set(PASSWORD_KEY, password)
}
const deleteUserFromStorage = () => {
  storage.remove(USERNAME_KEY)
  storage.remove(PASSWORD_KEY)
}
const getUserInfoFromStorage = () => {
  return {
    username: storage.get(USERNAME_KEY),
    password: storage.get(PASSWORD_KEY),
  }
}

const Login: FC = () => {
  const nav = useNavigate()
  const [form] = Form.useForm()

  const { run, loading } = useRequest(
    async (values: User.LoginParams) => {
      const res = await userApi.loginService(values)
      return res
    },
    {
      manual: true,
      onSuccess(res) {
        storage.set('token', res.token)
        message.success('登录成功')
        nav(MANAGE_INDEX_PATHNAME)
      },
    }
  )

  const onFinish = (values: any) => {
    const { username, password, remember } = values || {}

    run({ username, password })
    if (remember) {
      rememberUser(username, password)
    } else {
      deleteUserFromStorage()
    }
  }

  useEffect(() => {
    const { username, password } = getUserInfoFromStorage()
    form.setFieldsValue({ username, password })
  }, [])

  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title level={2}>
            <UserAddOutlined />
          </Title>
          <Title level={2}>用户登录</Title>
        </Space>
      </div>
      <div>
        <Form
          labelCol={{ span: 6 }}
          labelAlign="right"
          wrapperCol={{ span: 16 }}
          form={form}
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              { required: true, message: '请输入用户名' },
              {
                type: 'string',
                min: 5,
                max: 20,
                message: '字符长度在 5-20 之间',
              },
              {
                pattern: /^\w+$/,
                message: '只能是字母数字下划线',
              },
            ]}
          >
            <Input placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password placeholder="请输入密码" />
          </Form.Item>
          <Form.Item
            wrapperCol={{ offset: 6, span: 16 }}
            name="remember"
            valuePropName="checked"
          >
            <Checkbox>记住我</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit" disabled={loading}>
                登录
              </Button>
              <Link to={REGISTER_PATHNAME}>注册新用户</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login
