import React, { useEffect, useState } from 'react'
import type { MenuProps } from 'antd'
import { Image, Menu } from 'antd'
import { cn } from '@/lib/utils'
import router, { Route } from '@/router/router'
import { Link, useLocation, useNavigate } from 'react-router-dom'

type MenuItem = Required<MenuProps>['items'][number]

interface AsideProps {
  collapsed: boolean
}
const storageSelectKeys = JSON.parse(
  sessionStorage.getItem('selectKeys') || '[]'
)
const storageOpenKeys = JSON.parse(sessionStorage.getItem('openKeys') || '[]')
const Aside: React.FC<AsideProps> = ({ collapsed }) => {
  const navigate = useNavigate()
  const currentRoute = useLocation()
  const [selectKeys, setSelectKeys] = useState<string[]>(storageSelectKeys)
  const [openKeys, setOpenKeys] = useState<string[]>(storageOpenKeys)
  const { menu, keyArr } = convertRoutesToMenu(router)
  const handleOpenChange: MenuProps['onOpenChange'] = (keys: string[]) => {
    const key = [keys[keys.length - 1]]
    setOpenKeys(key)
    sessionStorage.setItem('openKeys', JSON.stringify(key))
  }
  const handleLink: MenuProps['onClick'] = (e) => {
    navigate(e.key)
    sessionStorage.setItem('selectKeys', JSON.stringify([e.key]))
    setSelectKeys([e.key] as string[])
  }
  useEffect(() => {
    if (!keyArr.includes(currentRoute.pathname)) {
      return
    }
    sessionStorage.setItem(
      'selectKeys',
      JSON.stringify([currentRoute.pathname])
    )
    setSelectKeys([currentRoute.pathname] as string[])
  }, [currentRoute.pathname])
  return (
    <div
      className={cn(
        'max-h-[100vh] overflow-y-scroll bg-[#001529] duration-300 ease-in-out scrollbar-none ',
        collapsed ? 'w-20' : ' w-[200px]'
      )}
    >
      <Link to={'/antd'}>
        <div className="sticky top-0 z-10 flex items-center justify-center gap-3 bg-dark  h-16 ">
          <Image width={50} src="/logo.png" alt="" />
          {!collapsed && (
            <div className="break-keep text-white ">陽信商店街</div>
          )}
        </div>
      </Link>

      <Menu
        inlineCollapsed={collapsed}
        onClick={handleLink}
        onOpenChange={handleOpenChange}
        mode="inline"
        theme="dark"
        selectedKeys={selectKeys}
        openKeys={openKeys}
        items={menu}
      />
    </div>
  )
}

export default Aside

function convertRoutesToMenu(routes: Route[]): {
  menu: MenuItem[]
  keyArr: string[]
} {
  const keyArr: string[] = []

  function flattenKeysRecursive(routes: Route[]) {
    routes.forEach((route) => {
      if (!route.isHidden && !route.path.includes(':')) {
        if (!keyArr.includes(route.path)) {
          keyArr.push(route.path)
        }
      }
      if (route.children) {
        flattenKeysRecursive(route.children)
      }
    })
  }

  const menu = routes.reduce<MenuItem[]>((menu, route) => {
    if (route.isHidden || route.path.includes(':')) {
      return menu
    }

    const { path, label, icon, children } = route
    const menuItem: MenuItem = {
      key: children ? path + '/layout' : path,
      icon,
      label,
      ...(children && { children: convertRoutesToMenu(children).menu }),
    }
    if (!children) {
      keyArr.push(path)
    }

    return [...menu, menuItem]
  }, [])

  flattenKeysRecursive(routes)

  return { menu, keyArr }
}
