import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import ExtendedButton from '../button/ExtendedButton'
import { ArrowUpOutlined } from '@ant-design/icons'
import { useMainRef } from '@/views/antd/layout'
import { cn } from '@/lib/utils'

interface TurnOnButtonProps {
  isAlwaysShow?: boolean
}

const TurnOnButton: React.ForwardRefRenderFunction<
  HTMLDivElement,
  TurnOnButtonProps
> = ({ isAlwaysShow = false }, ref) => {
  const [showButton, setShowButton] = useState(isAlwaysShow)
  const prevScrollTop = useRef(0)
  const mainRef = useMainRef()
  const containerRef = ref ? ref : mainRef

  const handleScrollToTop = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0
    }
  }
  const handleScroll = useCallback((event: React.UIEvent<HTMLDivElement>) => {
    const currentScrollTop = (event.target as HTMLDivElement).scrollTop
    if (currentScrollTop > prevScrollTop.current) {
      setShowButton(true)
    } else if (currentScrollTop < prevScrollTop.current) {
      setShowButton(false)
    }
    prevScrollTop.current = currentScrollTop
  }, [])

  useEffect(() => {
    if (containerRef.current && !isAlwaysShow) {
      const element = containerRef.current
      element.addEventListener('scroll', handleScroll)

      return () => {
        element.removeEventListener('scroll', handleScroll)
      }
    }
  }, [handleScroll, containerRef, isAlwaysShow])
  return (
    <>
      {/* {showButton && (
        <ExtendedButton
          className="fixed bottom-4 right-4  animate-in fade-in duration-300"
          size="large"
          icon={<ArrowUpOutlined />}
          shape="circle"
          onClick={handleScrollToTop}
        />
      )} */}
      <ExtendedButton
        className={cn(
          'fixed bottom-4 right-4  ease-in-out duration-300 opacity-0 pointer-events-none',
          showButton && ' opacity-100 pointer-events-auto'
        )}
        size="large"
        icon={<ArrowUpOutlined />}
        shape="circle"
        onClick={handleScrollToTop}
      />
    </>
  )
}
const FixedButton = forwardRef<HTMLDivElement, TurnOnButtonProps>(TurnOnButton)
export default FixedButton
