import { FC } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button, Typography } from 'antd'
import styles from './index.module.scss'
import { MANAGE_INDEX_PATHNAME } from '@/router'
// import Test from './test'

const { Title, Paragraph } = Typography

const Home: FC = () => {
  const navigate = useNavigate()

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <Title>问卷调查 | 在线投票</Title>
        <Paragraph>
          已累计创建问卷 100 份，发布问卷 90 份，收到答卷 980 份
        </Paragraph>
        <div>
          <Button
            type="primary"
            onClick={() => navigate(MANAGE_INDEX_PATHNAME)}
          >
            开始使用
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Home
