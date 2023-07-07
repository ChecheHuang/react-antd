import { cn } from '@/lib/utils'
import React, { forwardRef, HTMLAttributes } from 'react'

interface WrapperProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
}

const Wrap: React.ForwardRefRenderFunction<HTMLDivElement, WrapperProps> = (
  { children, className, ...rest },
  ref
) => {
  return (
    <div ref={ref} className={cn('p-4', className)} {...rest}>
      {children}
    </div>
  )
}

const Wrapper = forwardRef<HTMLDivElement, WrapperProps>(Wrap)

export default Wrapper
