import LazyLoad from './LazyLoad/LazyLoad'

const router = [
  {
    path: '',
    element: LazyLoad(import('@/views/layout')),
    label: '/',
    children: [
      {
        path: '',
        element: LazyLoad(import('@/views/page')),
        label: '/',
      },
    ],
  },
  {
    path: '/*',
    element: LazyLoad(import('@/views/404/page')),
    label: 'Not Found',
    isHidden: true,
  },
]
export default router
