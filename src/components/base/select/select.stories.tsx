import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { Select } from './select'

const items = [
  { id: 'olivia', label: 'Olivia Rhye', supportingText: 'olivia@untitledui.com' },
  { id: 'phoenix', label: 'Phoenix Baker', supportingText: 'phoenix@untitledui.com' },
  { id: 'lana', label: 'Lana Steiner', supportingText: 'lana@untitledui.com' },
  { id: 'demi', label: 'Demi Wilkinson', supportingText: 'demi@untitledui.com' },
  { id: 'candice', label: 'Candice Wu', supportingText: 'candice@untitledui.com' },
]

type Args = {
  size?: 'sm' | 'md' | 'lg'
  label?: string
  hint?: string
  placeholder?: string
  isDisabled?: boolean
  isRequired?: boolean
  items?: typeof items
  onSelectionChange?: (key: unknown) => void
}

const meta: Meta<Args> = {
  title: 'Base/Select/Select',
  component: Select as never,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    label: { control: 'text' },
    hint: { control: 'text' },
    placeholder: { control: 'text' },
    isDisabled: { control: 'boolean' },
    isRequired: { control: 'boolean' },
    onSelectionChange: { action: 'selected' },
  },
  args: {
    label: 'Assignee',
    placeholder: 'Select a teammate',
    size: 'md',
    items,
    onSelectionChange: fn(),
  },
  render: (args) => (
    <div className="w-80">
      <Select {...args}>{(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}</Select>
    </div>
  ),
}

export default meta
type Story = StoryObj<Args>

export const Default: Story = {}
export const WithHint: Story = { args: { hint: 'You can change this later.' } }
export const Disabled: Story = { args: { isDisabled: true } }
