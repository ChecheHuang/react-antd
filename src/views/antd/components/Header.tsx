import { cn } from '@/lib/utils'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { UserOutlined } from '@ant-design/icons'
import { Button, Dropdown, MenuProps } from 'antd'
import { Avatar } from 'antd'
import Breadcrumb from './Breadcrumb'
import { useSelector } from '@/store/redux'
import ExtendedButton from '@/components/button/ExtendedButton'
import { useNavigate } from 'react-router-dom'
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
  const { user } = useSelector((state) => state.user)
  const navigate = useNavigate()
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <ExtendedButton
          onClick={() => {
            localStorage.clear()
            navigate('/login')
          }}
          type="info"
        >
          登出
        </ExtendedButton>
      ),
    },
  ]
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
      <Dropdown menu={{ items }} placement="bottomLeft" arrow>
        <Avatar
          src={user?.user_avatar}
          className="cursor-pointer"
          size={44}
          icon={<UserOutlined />}
        />
      </Dropdown>
    </header>
  )
}

export default Header
