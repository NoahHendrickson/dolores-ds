import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { RadioButton, RadioGroup } from './radio-buttons'

type Args = {
  label?: string
  isDisabled?: boolean
  orientation?: 'horizontal' | 'vertical'
  size?: 'sm' | 'md'
  onChange?: (value: string) => void
}

const meta: Meta<Args> = {
  title: 'Base/Radio/RadioGroup',
  component: RadioGroup as never,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    isDisabled: { control: 'boolean' },
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
    size: { control: 'select', options: ['sm', 'md'] },
    onChange: { action: 'changed' },
  },
  args: {
    label: 'Notification frequency',
    onChange: fn(),
    orientation: 'vertical',
    size: 'sm',
  },
  render: (args) => (
    <RadioGroup {...args}>
      <RadioButton value="immediate" label="Immediately" hint="Get every update as it happens." />
      <RadioButton value="daily" label="Daily" hint="One digest per day." />
      <RadioButton value="weekly" label="Weekly" hint="Summary every Monday." />
    </RadioGroup>
  ),
}

export default meta
type Story = StoryObj<Args>

export const Default: Story = {}
export const Horizontal: Story = { args: { orientation: 'horizontal' } }
export const SizeMd: Story = { args: { size: 'md' } }
export const Disabled: Story = { args: { isDisabled: true } }
