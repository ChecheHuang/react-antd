import { Radio } from 'antd'
import { SizeType, useTheme } from '@/provider/ThemeProvider'
import { useDispatch, useSelector } from '@/store'
import { changeSize } from '@/store/modules/themeSlice'
import useZustand from '@/hooks/useZustand'
const ChangeSizeRadio = () => {
  const { state, dispatch } = useTheme()

  const reduxDispatch = useDispatch()
  const reduxTheme = useSelector((state) => state.theme)
  const { theme: zustandTheme, changeSize: zusStandChangeSize } = useZustand()
  console.log('zustandTheme', zustandTheme)
  console.log('reduxTheme', reduxTheme)
  console.log('contextTheme', state)

  return (
    <Radio.Group
      defaultValue={state.size}
      onChange={(e) => {
        dispatch({ type: 'CHANGE_SIZE', payload: e.target.value })
        reduxDispatch(changeSize(e.target.value))
        zusStandChangeSize(e.target.value)
      }}
    >
      <Radio.Button value={SizeType.small}>小</Radio.Button>
      <Radio.Button value={SizeType.middle}>預設</Radio.Button>
      <Radio.Button value={SizeType.large}>大</Radio.Button>
    </Radio.Group>
  )
}

export default ChangeSizeRadio
