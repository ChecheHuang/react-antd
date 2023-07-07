import LazyLoad from './LazyLoad/LazyLoad'

const router = [
  {
    path: '/antd',
    element: LazyLoad(import('@/views/antd/layout')),
    label: '/antd',
    children: [
      {
        path: '/antd',
        element: LazyLoad(import('@/views/antd/page')),
        label: '/antd',
      },
      {
        path: '/antd/:id',
        element: LazyLoad(import('@/views/antd/[id]/page')),
        label: '/antd/:id',
      },
      {
        path: '/antd/:id/abcd',
        element: LazyLoad(import('@/views/antd/[id]/abcd/page')),
        label: '/antd/:id/abcd',
      },
      {
        path: '/antd/:id/test',
        element: LazyLoad(import('@/views/antd/[id]/test/page')),
        label: '/antd/:id/test',
      },
    ],
  },
  {
    path: '',
    element: LazyLoad(import('@/views/page')),
    label: '/',
  },
  {
    path: '/*',
    element: LazyLoad(import('@/views/404/page')),
    label: 'Not Found',
    isHidden: true,
  },
  {
    path: '/login',
    element: LazyLoad(import('@/views/login/page')),
    label: '/login',
  },
]
export default router
