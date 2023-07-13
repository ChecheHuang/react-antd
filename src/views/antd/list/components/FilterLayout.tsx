import { Button, Form, Input, Select } from 'antd'
import { AutoComplete } from 'antd'
import { useMemo, useState } from 'react'
import { DataChangeInfoType } from '../page'
import FormTemplate from '@/components/form/FormTemplate'
import Group from '@/components/Group'
import { label } from '@/api/label'
import { useQuery } from '@tanstack/react-query'
import { useUpdateEffect } from '@/hooks/useHook'
import { SizeType } from '@/store/redux/modules/themeSlice'
import MyCard from '@/components/MyCard'

interface FilterLayoutProps {
  setDataChangeInfo: React.Dispatch<React.SetStateAction<DataChangeInfoType>>
}

const FilterLayout: React.FC<FilterLayoutProps> = ({ setDataChangeInfo }) => {
  const [options, setOptions] = useState<{ value: string }[]>([])
  const [form] = Form.useForm()

  const handleReset = () => {
    form.resetFields()
    setDataChangeInfo({ page: 1, size: 10 })
  }
  const tabsArr = ['所有客戶', '新客戶', '舊客戶', '潛在客戶']
  const { data: labelData } = useQuery({
    queryKey: ['label'],
    queryFn: () => label(),
  })
  const optionsArr = useMemo(() => {
    const arr =
      labelData?.data.map((item) => ({ value: item.label_name })) || []
    return arr
  }, [labelData?.data])
  useUpdateEffect(() => {
    setOptions(optionsArr)
  }, [optionsArr])

  const onFinish = (values: DataChangeInfoType) => {
    const newState = { ...values }
    for (const item in values) {
      if (!values[item]) {
        delete newState[item]
      }
    }
    console.log(newState)
    // setDataChangeInfo((prev) => {
    //   return { ...prev, ...newState }
    // })
  }
  return (
    <>
      <FormTemplate size={SizeType.middle} form={form} onFinish={onFinish}>
        <Group unstyled size={SizeType.small}>
          <Form.Item name="cus_status">
            <Select
              defaultValue="所有客戶"
              options={[
                { value: '所有客戶', label: '所有客戶' },
                { value: '新客戶', label: '新客戶' },
                { value: '舊客戶', label: '舊客戶' },
                { value: '潛在客戶', label: '潛在客戶' },
              ]}
            />
          </Form.Item>
          <Form.Item name="label_name">
            <AutoComplete
              options={options}
              onSelect={(text) =>
                setOptions(
                  [...optionsArr].filter((item) => item.value.includes(text))
                )
              }
              onSearch={(text) =>
                setOptions(
                  [...optionsArr].filter((item) => item.value.includes(text))
                )
              }
              placeholder="標籤"
            />
          </Form.Item>
          <Form.Item name="cus_number">
            <Input placeholder="電話" />
          </Form.Item>
          <Form.Item name="cus_name">
            <Input placeholder="姓名" />
          </Form.Item>
        </Group>

        <div className="flex w-full justify-end gap-3">
          <Button onClick={handleReset} danger>
            清除
          </Button>
          <Button type="primary" htmlType="submit">
            查詢
          </Button>
        </div>
      </FormTemplate>
    </>
  )
}

export default FilterLayout
