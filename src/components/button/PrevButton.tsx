import { ButtonProps } from 'antd'
import { useNavigate } from 'react-router-dom'
import ExtendedButton from './ExtendedButton'
import { cn } from '@/lib/utils'
interface PrevButtonProps extends ButtonProps {
  onClick?: React.MouseEventHandler<HTMLElement>
  className?: string
  children?: React.ReactNode
}

const PrevButton: React.FC<PrevButtonProps> = ({
  onClick,
  className,
  children,
  ...rest
}) => {
  const navigate = useNavigate()

  const prev = () => navigate(-1)

  return (
    <ExtendedButton
      className={cn('slide', className)}
      onClick={onClick ? onClick : prev}
      {...rest}
    >
      {children ? children : ' 回上一頁'}
    </ExtendedButton>
  )
}

export default PrevButton
