import React, { useState } from 'react'
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  FileOutlined,
  MailOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import { cn } from '@/lib/utils'
import router from '@/router/router'
import { Link, useLocation, useNavigate } from 'react-router-dom'

type MenuItem = Required<MenuProps>['items'][number]

function item(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem
}
const menu: MenuItem[] = [
  item('頁面 1', '/page1', <PieChartOutlined />),
  item('頁面 2', '/page2', <DesktopOutlined />),
  item('頁面 3', 'page3', <UserOutlined />, [
    item('頁面 301', '/page3/page301'),
    item('頁面 302', '/page3/page302'),
    item('頁面 303', '/page3/page303'),
  ]),
  item('頁面 4', 'page4', <TeamOutlined />, [
    item('頁面 401', '/page4/page401'),
    item('頁面 402', '/page4/page402'),
    item('頁面 403', '/page4/page403'),
  ]),
  item('Files', '9', <FileOutlined />),
]
interface AsideProps {
  collapsed: boolean
}
const Aside: React.FC<AsideProps> = ({ collapsed }) => {
  // console.log(items)
  // console.log(router[0]['children'])
  // const [menuItems] = useState<AntdRouterItem[]>(router)

  const navigateTo = useNavigate()
  const currentRoute = useLocation()
  const [openKeys, setOpenKeys] = useState<string[]>([])
  const handleOpenChange: MenuProps['onOpenChange'] = (keys: string[]) => {
    setOpenKeys([keys[keys.length - 1]])
  }

  const menuClick = (e: { key: string }) => {
    navigateTo(e.key)
  }
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
        theme="dark"
        defaultSelectedKeys={[currentRoute.pathname]}
        mode="inline"
        items={menu}
        onClick={menuClick}
        openKeys={openKeys}
        inlineCollapsed={collapsed}
        onOpenChange={handleOpenChange}
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
