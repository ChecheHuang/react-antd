import { Form, FormProps } from 'antd'
import { SizeType, useTheme } from '@/provider/ThemeProvider'

interface TemplateFormProps extends FormProps {
  children: React.ReactNode
}

const FormTemplate: React.FC<TemplateFormProps> = ({ children, ...rest }) => {
  const {
    state: { size },
  } = useTheme()
  return (
    <Form
      labelWrap
      labelCol={{ span: 6 }}
      layout={size !== SizeType.small ? 'horizontal' : 'vertical'}
      initialValues={{ size }}
      size={size}
      {...rest}
    >
      {children}
    </Form>
  )
}

export default FormTemplate
