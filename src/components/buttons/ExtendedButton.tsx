import { Button, ButtonProps } from 'antd'

const antdTypes = [
  'primary',
  'ghost',
  'dashed',
  'link',
  'text',
  'default',
] as const
const myTypes = ['info', 'warning', 'success'] as const

type ExtendedButtonProps = Omit<ButtonProps, 'type'> & {
  type?: (typeof antdTypes)[number] | (typeof myTypes)[number]
}

const ExtendedButton: React.FC<ExtendedButtonProps> = ({
  type = 'default',
  ...rest
}) => {
  if (isAntdType(type)) {
    return <Button type={type} {...rest} />
  }
  return <Button className={`button-${type}`} {...rest} />
}

export default ExtendedButton

function isAntdType(
  type: ExtendedButtonProps['type']
): type is (typeof antdTypes)[number] {
  return antdTypes.includes(type as (typeof antdTypes)[number])
}
