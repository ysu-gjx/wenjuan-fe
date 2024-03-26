import { RouterProvider } from 'react-router-dom'
import router from '@/router'
import { ConfigProvider, App as AntdApp } from 'antd'
import GlobalAntd from '@/utils/AntdGlobal'
import 'antd/dist/reset.css'
// import Test from './Test'

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          // colorPrimary: '#ff7744',
        },
      }}
    >
      {/* <Test /> */}
      <AntdApp>
        <GlobalAntd />
        <RouterProvider router={router} />
      </AntdApp>
    </ConfigProvider>
  )
}

export default App
