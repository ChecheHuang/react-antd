import LazyLoad from './LazyLoad/LazyLoad'
import {
  DownCircleOutlined,
  QqOutlined,
  AppstoreOutlined,
  SlidersOutlined,
  HeatMapOutlined,
} from '@ant-design/icons'
import LayoutAntd from '@/views/antd/layout'
import Page from '@/views/page'
import PageAntd from '@/views/antd/page'
import PageListAntd from '@/views/antd/list/page'
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
        name: '客戶列表',
        label: '客戶列表',
        icon: <SlidersOutlined />,
      },
      {
        path: '/antd/create',
        element: LazyLoad(import('@/views/antd/create/page')),
        label: '創建新客戶',
        icon: <QqOutlined />,
        name: '創建新客戶',
      },
      {
        path: '/antd/list',
        element: <PageListAntd />,
        name: '客戶列表2',
        label: '客戶列表2',
        icon: <SlidersOutlined />,
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
    path: '/route2',
    element: LazyLoad(import('@/views/(ignore)/route2/layout')),
    label: '選單範例',
    icon: <DownCircleOutlined />,
    name: '選單範例',
    children: [
      {
        path: '/route2',
        element: LazyLoad(import('@/views/(ignore)/route2/page')),
        name: 'route2',
        label: 'route2',
      },
      {
        path: '/route2/page1',
        element: LazyLoad(import('@/views/(ignore)/route2/page1/page')),
        name: 'page1',
        label: 'page1',
      },
      {
        path: '/route2/page2',
        element: LazyLoad(import('@/views/(ignore)/route2/page2/page')),
        name: 'page2',
        label: 'page2',
      },
      {
        path: '/route2/page3',
        element: LazyLoad(import('@/views/(ignore)/route2/page3/page')),
        name: 'page3',
        label: 'page3',
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
    path: '/login',
    element: LazyLoad(import('@/views/login/page')),
    isHidden: true,
    label: '/login',
    name: '/login',
  },
  {
    path: '/*',
    element: LazyLoad(import('@/views/404/page')),
    label: 'Not Found',
    name: 'Not Found',
    isHidden: true,
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
