import { Form, FormProps } from 'antd'
import { useSelector } from '@/store'
import { SizeType } from '@/store/modules/themeSlice'

interface TemplateFormProps extends FormProps {
  children: React.ReactNode
}

const FormTemplate: React.FC<TemplateFormProps> = ({ children, ...rest }) => {
  const { size } = useSelector((state) => state.theme)

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
