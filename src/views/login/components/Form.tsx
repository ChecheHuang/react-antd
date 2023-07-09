import React from 'react'
import { Button, Form, Input } from 'antd'
import { QqOutlined, YahooOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { ValidateErrorEntity } from 'rc-field-form/lib/interface'
import { login } from '@/api/auth'

const LoginForm: React.FC = () => {
  const navigate = useNavigate()
  const onFinish = async (values: { name: string; password: string }) => {
    login(values).then((res) => {
      const token = res.data.token
      localStorage.setItem('token', token)
    })
    navigate('/antd')
  }

  const onFinishFailed = (errorInfo: ValidateErrorEntity) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <div>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="name"
          rules={[{ required: true, message: '輸入使用者' }]}
          initialValue="Carl"
        >
          <Input
            autoComplete="username"
            prefix={<QqOutlined />}
            placeholder="使用者"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: '輸入密碼' }]}
          initialValue="123456"
        >
          <Input.Password
            autoComplete="current-password"
            prefix={<YahooOutlined />}
            placeholder="密碼"
          />
        </Form.Item>
        <Form.Item>
          <Button block type="primary" htmlType="submit">
            登入
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default LoginForm
