import React from 'react'
import { Button, Form, Input } from 'antd'
import { QqOutlined, YahooOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { ValidateErrorEntity } from 'rc-field-form/lib/interface'
import { login } from '@/api/auth'
import {
  updateError,
  updateStart,
  updateSuccess,
} from '@/store/redux/modules/userSlice'
import { useDispatch, useSelector } from '@/store/redux'

const LoginForm: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { pending, error } = useSelector((state) => state.user)
  const onFinish = async (values: { name: string; password: string }) => {
    try {
      dispatch(updateStart())
      const res = await login(values)
      dispatch(updateSuccess(res.data))
      navigate('/antd')
    } catch (err) {
      dispatch(updateError())
      console.log(err)
    }
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
          <Button loading={pending} block type="primary" htmlType="submit">
            登入
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default LoginForm
