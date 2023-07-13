import type { Meta, StoryObj } from '@storybook/react'

import ExtendedButton from '@/components/button/ExtendedButton'

const meta: Meta<typeof ExtendedButton> = {
  title: 'Component/ExtendedButton',
  component: ExtendedButton,
  tags: ['autodocs'],
  argTypes: {},
}
export default meta
type Story = StoryObj<typeof ExtendedButton>

export const Info: Story = {
  args: {
    type: 'info',
    children: 'Info',
  },
}
export const Success: Story = {
  args: {
    type: 'success',
    children: 'Success',
  },
}

export const Warning: Story = {
  args: {
    type: 'warning',
    children: 'Warning',
  },
}
