import React from 'react'
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Switch,
  TreeSelect,
} from 'antd'
import ChangeSizeRadio from '@/components/ChangeSizeRadio'
import { useParams } from 'react-router-dom'
import PrevButton from '@/components/button/PrevButton'
import Group from '@/components/Group'
import TabContainer from '@/components/container/TabContainer/TabContainer'
import FormTemplate from '@/components/form/FormTemplate'
import MyCard from '@/components/MyCard'

const Page: React.FC = () => {
  const { id } = useParams()

  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <TabContainer isFixButton>
      <MyCard>
        <div className=" flex items-center justify-between">
          <h1 className="text-3xl">{id}</h1>
          <div className="flex gap-2">
            <PrevButton />
            <ChangeSizeRadio />
          </div>
        </div>
        <FormTemplate onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <Group groupTitle="第一個" id="first" aria-label="第一個">
            <Form.Item label="Username" name="username">
              <Input />
            </Form.Item>
            <Form.Item label="Select">
              <Select>
                <Select.Option value="demo">Demo</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="TreeSelect">
              <TreeSelect
                treeData={[
                  {
                    title: 'Light',
                    value: 'light',
                    children: [{ title: 'Bamboo', value: 'bamboo' }],
                  },
                ]}
              />
            </Form.Item>
            <Form.Item label="Cascader">
              <Cascader
                options={[
                  {
                    value: 'zhejiang',
                    label: 'Zhejiang',
                    children: [{ value: 'hangzhou', label: 'Hangzhou' }],
                  },
                ]}
              />
            </Form.Item>
            <Form.Item label="DatePicker">
              <DatePicker className="w-full" />
            </Form.Item>
            <Form.Item label="InputNumber">
              <InputNumber className="w-full" />
            </Form.Item>
            <Form.Item label="Switch" valuePropName="checked">
              <Switch />
            </Form.Item>
          </Group>

          <Group id="second" aria-label="第二個" className="h-screen">
            <div>second</div>
          </Group>
          <Group id="third" aria-label="第三個" className="h-screen">
            <div>third</div>
          </Group>

          <Form.Item className="col-span-full flex justify-center">
            <Button type="primary" htmlType="submit">
              送出
            </Button>
          </Form.Item>
        </FormTemplate>
      </MyCard>
    </TabContainer>
  )
}

export default Page
