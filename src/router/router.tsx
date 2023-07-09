import LazyLoad from './LazyLoad/LazyLoad'
import { AppstoreOutlined } from '@ant-design/icons'
import { HeatMapOutlined } from '@ant-design/icons'

import LayoutAntd from '@/views/antd/layout'
import Page from '@/views/page'
import PageAntd from '@/views/antd/page'
import PageidAntd from '@/views/antd/[id]/page'
const router: Route[] = [
  {
    path: '/antd',
    element: <LayoutAntd />,
    name: 'antd控制台',
    label: 'antd控制台',
    icon: <AppstoreOutlined />,
    children: [
      {
        path: '/antd',
        element: <PageAntd />,
        name: '首頁',
        label: '首頁',
        isHidden: false,
        icon: <AppstoreOutlined />,
      },
      {
        path: '/antd/:id',
        element: <PageidAntd />,
        label: '修改頁面',
        icon: <HeatMapOutlined />,
        name: '修改頁面',
      },
      {
        path: '/antd/:id/abcd',
        element: LazyLoad(import('@/views/antd/[id]/abcd/page')),
        name: 'abcd',
        label: 'abcd',
      },
      {
        path: '/antd/:id/test',
        element: LazyLoad(import('@/views/antd/[id]/test/page')),
        name: '測試',
        label: '測試',
      },
    ],
  },
  {
    path: '',
    element: <Page />,
    isHidden: true,
    label: '/',
    name: '/',
  },
  {
    path: '/*',
    element: LazyLoad(import('@/views/404/page')),
    label: 'Not Found',
    name: 'Not Found',
    isHidden: true,
  },
  {
    path: '/login',
    element: LazyLoad(import('@/views/login/page')),
    label: '/login',
    name: '/login',
  },
]
export default router
export interface Route {
  path: string
  element: JSX.Element
  name: string
  label: string
  icon?: JSX.Element
  children?: Route[]
  isHidden?: boolean
}
