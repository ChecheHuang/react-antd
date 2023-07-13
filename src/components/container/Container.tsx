import { cn } from '@/lib/utils'
import React, { forwardRef, HTMLAttributes } from 'react'
import FixedButton from '../button/FixedButton'

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  isFixButton?: boolean
  isFixButtonAlwaysShow?: boolean
}

const Wrap: React.ForwardRefRenderFunction<HTMLDivElement, ContainerProps> = (
  { children, className, isFixButton, isFixButtonAlwaysShow, ...rest },
  ref
) => {
  return (
    <>
      <div ref={ref} className={cn('p-4', className)} {...rest}>
        {children}
      </div>
      {isFixButton && (
        <FixedButton isAlwaysShow={isFixButtonAlwaysShow} ref={ref} />
      )}
    </>
  )
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(Wrap)

export default Container
