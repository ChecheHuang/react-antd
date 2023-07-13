import type { Meta, StoryObj } from '@storybook/react'

import DropdownButton from '@/components/button/DropdownButton'
import ExtendedButton from '@/components/button/ExtendedButton'
const meta: Meta<typeof DropdownButton> = {
  title: 'Component/DropdownButton',
  component: DropdownButton,
  tags: ['autodocs'],
  argTypes: {},
}
export default meta
type Story = StoryObj<typeof DropdownButton>

export const Default: Story = {
  args: {
    children: '123',
  },
}
