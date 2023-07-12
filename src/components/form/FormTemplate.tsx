import { Form, FormProps, FormInstance } from 'antd'
import { useSelector } from '@/store/redux'
import { SizeType } from '@/store/redux/modules/themeSlice'
import React, { forwardRef, ForwardRefRenderFunction, Ref } from 'react'

interface TemplateFormProps extends FormProps {
  children: React.ReactNode
  size?: SizeType
}

const FormTemplate: ForwardRefRenderFunction<
  FormInstance<any>,
  TemplateFormProps
> = ({ children, size, ...rest }, ref: Ref<FormInstance<any>>) => {
  const { size: reduxSize } = useSelector((state) => state.theme)

  const formSize = size ? size : reduxSize

  return (
    <Form
      ref={ref}
      labelWrap
      labelCol={{ span: 6 }}
      layout={formSize !== SizeType.small ? 'horizontal' : 'vertical'}
      initialValues={{ formSize }}
      size={formSize}
      {...rest}
    >
      {children}
    </Form>
  )
}

export default forwardRef(FormTemplate)
