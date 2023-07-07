import { Button, Tabs, Collapse, Card, Form, Input } from 'antd'
import { AutoComplete } from 'antd'
import { useState } from 'react'
import { DataChangeInfoType } from '../page'
import FormTemplate from '@/components/form/FormTemplate'
import Group from '@/components/Group'

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
  const tabsArr = ['All', 'male', 'female']

  const onFinish = (values: DataChangeInfoType) => {
    setDataChangeInfo((prev) => {
      return { ...prev, ...values }
    })
  }
  return (
    <>
      <Card>
        <Collapse
          className="bg-white"
          collapsible="icon"
          defaultActiveKey={['1']}
          expandIconPosition="end"
          bordered={false}
          items={[
            {
              key: '1',
              label: (
                <Tabs
                  onChange={(activeKey) => {
                    setDataChangeInfo((prev) => {
                      const newState = { ...prev }
                      newState['sex'] = activeKey
                      return newState
                    })
                  }}
                  type="card"
                  size={'small'}
                  items={tabsArr.map((value) => {
                    return {
                      label: ` ${value}`,
                      key: value,
                    }
                  })}
                />
              ),
              children: (
                <>
                  <FormTemplate form={form} onFinish={onFinish}>
                    <Group custom>
                      <Form.Item name="name">
                        <AutoComplete
                          options={options}
                          onSelect={(text) => {
                            // setOptions(() =>
                            //   [...optionArr].filter((item) =>
                            //     item.value.includes(text)
                            //   )
                            // )
                          }}
                          onSearch={(text) => {
                            // setOptions(() =>
                            //   [...optionArr].filter((item) =>
                            //     item.value.includes(text)
                            //   )
                            // )
                          }}
                          placeholder="姓名"
                        />
                      </Form.Item>
                      <Form.Item name="email">
                        <Input placeholder="Email" />
                      </Form.Item>
                    </Group>

                    <div className="mt-3 flex w-full justify-end gap-3">
                      <Button onClick={handleReset} danger>
                        清除
                      </Button>
                      <Button type="primary" htmlType="submit">
                        查詢
                      </Button>
                    </div>
                  </FormTemplate>
                </>
              ),
            },
          ]}
        />
      </Card>
    </>
  )
}

export default FilterLayout
