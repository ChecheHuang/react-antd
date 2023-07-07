import {
  DependencyList,
  EffectCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

export function useWindowInfo(): { windowWidth: number; windowHeight: number } {
  const [windowInfo, setWindowInfo] = useState({
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
  })

  useEffect(() => {
    function updateWindow() {
      setWindowInfo({
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
      })
    }

    window.addEventListener('resize', updateWindow)

    return () => {
      window.removeEventListener('resize', updateWindow)
    }
  }, [])

  return windowInfo
}

function useIsFirstRender(): boolean {
  const isFirst = useRef(true)

  if (isFirst.current) {
    isFirst.current = false

    return true
  }

  return isFirst.current
}

export function useUpdateEffect(effect: EffectCallback, deps?: DependencyList) {
  const isFirst = useIsFirstRender()

  useEffect(() => {
    if (!isFirst) {
      return effect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>()
  useEffect(() => {
    ref.current = value
  }, [value])
  return ref.current
}
