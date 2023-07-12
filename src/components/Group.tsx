import { cn } from '@/lib/utils'
import { HTMLAttributes, useMemo } from 'react'
import { useSelector } from '@/store/redux'

interface FromGroupProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  groupTitle?: string
  custom?: boolean
  size?: string
}

const Group: React.FC<FromGroupProps> = ({
  children,
  className,
  groupTitle,
  size,
  custom = false,
  ...rest
}) => {
  const { size: reduxSize } = useSelector((state) => state.theme)

  const groupSize = size ? size : reduxSize

  const formGridCol = useMemo(() => {
    if (groupSize === 'small') return 'grid-cols-4'
    if (groupSize === 'middle') return 'grid-cols-2'
    if (groupSize === 'large') return 'grid-cols-1'
  }, [groupSize])

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
