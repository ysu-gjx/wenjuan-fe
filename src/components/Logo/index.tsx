import { Link } from 'react-router-dom'
import { Space, Typography } from 'antd'
import { FormOutlined } from '@ant-design/icons'
import styles from './Logo.module.scss'

const { Title } = Typography
const Logo = () => {
  return (
    <div className={styles.container}>
      <Link to="/">
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
