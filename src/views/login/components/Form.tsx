import React from 'react'
import { Button, Form, Input } from 'antd'
import { QqOutlined, YahooOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { ValidateErrorEntity } from 'rc-field-form/lib/interface'

const LoginForm: React.FC = () => {
  const navigate = useNavigate()
  const onFinish = async (values: { username: string; password: string }) => {
    localStorage.setItem(
      'token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJuYW1lIjoiQ2FybCIsInRpbWUiOiIyMDIzLzA3LzA3IDA5OjA0OjM5IiwiaWF0IjoxNjg4NjkxODc5fQ.7ZqE7YAOQkukJanSAerXvw4GOhJndqwma9phk3qGLi8'
    )
    navigate('/antd')
    console.log(values)
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
          name="username"
          rules={[{ required: true, message: '輸入使用者' }]}
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
