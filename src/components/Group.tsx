import { cn } from '@/lib/utils'
import { HTMLAttributes, useMemo } from 'react'
import { useSelector } from '@/store'

interface FromGroupProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  groupTitle?: string
  custom?: boolean
}

const Group: React.FC<FromGroupProps> = ({
  children,
  className,
  groupTitle,
  custom = false,
  ...rest
}) => {
  const { size } = useSelector((state) => state.theme)

  const formGridCol = useMemo(() => {
    if (size === 'small') return 'grid-cols-4'
    if (size === 'middle') return 'grid-cols-2'
    if (size === 'large') return 'grid-cols-1'
  }, [size])

  return (
    <>
      <div
        className={cn(
          'grid gap-x-3',
          !custom && 'mb-10 rounded-lg  p-2 shadow-lg shadow-slate-500/40 ',
          className,
          formGridCol
        )}
        {...rest}
      >
        {groupTitle && (
          <h1 className="col-span-full mb-3 text-center text-2xl font-bold text-gray-800">
            {groupTitle}
          </h1>
        )}

        {children}
      </div>
    </>
  )
}

export default Group
