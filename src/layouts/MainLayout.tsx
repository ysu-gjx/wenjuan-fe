import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import styles from './MainLayout.module.scss'
import { Layout } from 'antd'
import Logo from '@/components/Logo'
import UserInfo from '@/components/UserInfo'

const { Header, Content, Footer } = Layout

const MainLayout: FC = () => {
  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.left}>
          <Logo />
        </div>
        <div className={styles.right}>
          <UserInfo />
        </div>
      </Header>
      <Content className={styles.main}>
        <Outlet />
      </Content>
      <Footer className={styles.footer}>
        yg问卷 &copy;2023 - present. Created by yg
      </Footer>
    </Layout>
  )
}

export default MainLayout
