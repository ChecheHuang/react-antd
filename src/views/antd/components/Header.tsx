import { cn } from '@/lib/utils'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { UserOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { Avatar } from 'antd'
import Breadcrumb from './Breadcrumb'
interface HeaderProps {
  toggleCollapsed: () => void
  collapsed: boolean
  className?: string
}

const Header: React.FC<HeaderProps> = ({
  toggleCollapsed,
  collapsed,
  className,
}) => {
  return (
    <header
      className={cn(
        'flex h-16  items-center justify-between px-3 shadow-slate-500	',
        className
      )}
    >
      <div className="flex gap-10">
        <Button size="small" onClick={toggleCollapsed}>
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
        <Breadcrumb />
      </div>
      <Avatar className="cursor-pointer" size={44} icon={<UserOutlined />} />
    </header>
  )
}

export default Header
