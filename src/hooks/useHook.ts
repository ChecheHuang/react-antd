import {
  DependencyList,
  EffectCallback,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { debounce } from 'lodash'
import type { Callback } from '@/types'

export function useWindowInfo() {
  const [windowInfo, setWindowInfo] = useState({
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
  })

  const updateWindow = useCallback(() => {
    setWindowInfo({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
    })
  }, [])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedUpdateWindow = useCallback(debounce(updateWindow, 200), [
    debounce,
  ])

  useEffect(() => {
    window.addEventListener('resize', debouncedUpdateWindow)

    return () => {
      window.removeEventListener('resize', debouncedUpdateWindow)
    }
  }, [debouncedUpdateWindow])

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

export function useTimeout(
  callback: Callback,
  delay: number
): {
  reset: () => void
  clear: () => void
} {
  const callbackRef = useRef<Callback>(callback)
  const timeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  const set = useCallback(() => {
    timeoutRef.current = setTimeout(() => callbackRef.current(), delay)
  }, [delay])

  const clear = useCallback(() => {
    timeoutRef.current && clearTimeout(timeoutRef.current)
  }, [])

  useEffect(() => {
    set()
    return clear
  }, [delay, set, clear])

  const reset = useCallback(() => {
    clear()
    set()
  }, [clear, set])

  return { reset, clear }
}
export function useDebounce(
  callback: Callback,
  delay: number,
  dependencies: any[]
) {
  const { reset, clear } = useTimeout(callback, delay)

  useEffect(reset, [...dependencies, reset])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(clear, [])

  return { reset, clear }
}
