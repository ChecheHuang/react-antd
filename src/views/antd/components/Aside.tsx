import React, { useState } from 'react'
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  PieChartOutlined,
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import { cn } from '@/lib/utils'
import router from '@/router/router'
import { Link } from 'react-router-dom'

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem
}

const items: MenuItem[] = [
  getItem('Option 1', '1', <PieChartOutlined />),
  getItem('Option 2', '2', <DesktopOutlined />),
  getItem('Option 3', '3', <ContainerOutlined />),

  getItem('Navigation One', 'sub1', <MailOutlined />, [
    getItem('Option 5', '5'),
    getItem('Option 6', '6'),
    getItem('Option 7', '7'),
    getItem('Option 8', '8'),
  ]),

  getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),

    getItem('Submenu', 'sub3', null, [
      getItem('Option 11', '11'),
      getItem('Option 12', '12'),
    ]),
  ]),
  getItem('Option 1', '56', <PieChartOutlined />),
  getItem('Option 2', '21', <DesktopOutlined />),
  getItem('Option 3', '31', <ContainerOutlined />),
  getItem('Option 1', '55', <PieChartOutlined />),
  getItem('Option 2', '22', <DesktopOutlined />),
  getItem('Option 3', '32', <ContainerOutlined />),
  getItem('Option 1', '13', <PieChartOutlined />),
  getItem('Option 2', '23', <DesktopOutlined />),
  getItem('Option 3', '33', <ContainerOutlined />),
]
interface AsideProps {
  collapsed: boolean
}
const Aside: React.FC<AsideProps> = ({ collapsed }) => {
  // console.log(items)
  // console.log(router[0]['children'])
  // const [menuItems] = useState<AntdRouterItem[]>(router)

  return (
    <div
      className={cn(
        'max-h-[100vh] overflow-y-scroll bg-[#001529] duration-300 ease-in-out scrollbar-none ',
        collapsed ? 'w-20' : ' w-[200px]'
      )}
    >
      <Link to={'/antd'}>
        <div className="sticky top-0 z-10 flex items-center justify-center gap-3 bg-dark ">
          <img src="/logo.png" alt="" />
          {!collapsed && (
            <div className="break-keep text-white ">陽信商店街</div>
          )}
        </div>
      </Link>
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['']}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={items}
      />
    </div>
  )
}

export default Aside

interface RouterItem {
  path: string
  label: string
  hidden?: boolean
  element?: React.ReactNode
  children?: RouterItem[]
  meta?: { allow: boolean }
}
interface AntdRouterItem extends RouterItem {
  key: string
  type: string
  children?: AntdRouterItem[]
}
