import { Radio } from 'antd'
import { useDispatch, useSelector } from '@/store'
import { SizeType, changeSize } from '@/store/modules/themeSlice'
const ChangeSizeRadio = () => {
  const dispatch = useDispatch()
  const { size } = useSelector((state) => state.theme)

  return (
    <Radio.Group
      defaultValue={size}
      onChange={(e) => {
        dispatch(changeSize(e.target.value))
      }}
    >
      <Radio.Button value={SizeType.small}>小</Radio.Button>
      <Radio.Button value={SizeType.middle}>預設</Radio.Button>
      <Radio.Button value={SizeType.large}>大</Radio.Button>
    </Radio.Group>
  )
}

export default ChangeSizeRadio
