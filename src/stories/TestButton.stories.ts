import type { Meta, StoryObj } from '@storybook/react'

import Test from './Test'

const meta: Meta<typeof Test> = {
  title: 'Component/Test',
  component: Test,
  tags: ['autodocs'],
  argTypes: {
    children: {
      options: ['Sample', 'Sample2'],
      mapping: {
        Sample: 'this is a sample',
        // Sample2: <div>'this is a sample2'</div>,
      },
    },
  },
}
export default meta
type Story = StoryObj<typeof Test>

export const Sample: Story = {
  args: {
    text: 'this is test',
    children: 'Sample',
  },
}
