import { Link } from 'react-router-dom'
import { Space, Typography } from 'antd'
import { FormOutlined } from '@ant-design/icons'
import styles from './Logo.module.scss'
import useGetUserInfo from '@/hooks/useGetUserInfo'
import { useEffect, useState } from 'react'
import { LOGIN_PATHNAME, MANAGE_INDEX_PATHNAME } from '@/router'

const { Title } = Typography
const Logo = () => {
  const { username } = useGetUserInfo()
  const [path, setPath] = useState(LOGIN_PATHNAME)

  useEffect(() => {
    if (username) {
      setPath(MANAGE_INDEX_PATHNAME)
    }
  }, [username])

  return (
    <div className={styles.container}>
      <Link to={path}>
        <Space>
          <Title>
            <FormOutlined />
          </Title>
          <Title>yg问卷</Title>
        </Space>
      </Link>
    </div>
  )
}

export default Logo
