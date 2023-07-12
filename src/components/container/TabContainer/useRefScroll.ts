import { useCallback, useEffect, useState } from 'react'
export type TabType = {
  label: string
  key: string
}
function useRefScroll<T extends HTMLElement>(ref: React.RefObject<T>) {
  const [activeKey, setActiveKey] = useState<string | null>(null)
  const [tabArray, setTabArray] = useState<TabType[]>([])

  useEffect(() => {
    if (!ref.current) return
    const main = ref.current
    const divElementsWithId: NodeListOf<HTMLDivElement> =
      main.querySelectorAll('div[id]')
    const tabs: TabType[] = Array.from(divElementsWithId).map((element) => ({
      label: element.getAttribute('aria-label') || '',
      key: element.id,
    }))
    setTabArray(tabs)
  }, [ref])
  const handleClick = (id: string) => {
    const section = ref.current?.querySelector(`#${id}`)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
      setActiveKey(id)
    }
  }

  const handleScroll = useCallback(() => {
    if (!ref.current) return
    const scrollPosition = ref.current.scrollTop
    tabArray.forEach(({ key }) => {
      const target = document.getElementById(key)
      if (target) {
        const rect = target.getBoundingClientRect()
        if (scrollPosition >= rect.top && scrollPosition < rect.bottom) {
          setActiveKey(key)
        }
      }
    })
  }, [tabArray, ref])
  useEffect(() => {
    if (!ref.current) return
    const main = ref.current

    main.addEventListener('scroll', handleScroll)

    return () => {
      main.removeEventListener('scroll', handleScroll)
    }
  }, [ref, handleScroll])

  return { activeKey, handleClick, tabArray }
}

export default useRefScroll
