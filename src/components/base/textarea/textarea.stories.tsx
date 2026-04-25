import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { TextArea } from './textarea'

const meta = {
  title: 'Base/Textarea/TextArea',
  component: TextArea,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    hint: { control: 'text' },
    placeholder: { control: 'text' },
    rows: { control: 'number' },
    isDisabled: { control: 'boolean' },
    isInvalid: { control: 'boolean' },
    isRequired: { control: 'boolean' },
    onChange: { action: 'changed' },
  },
  args: {
    label: 'Description',
    placeholder: 'Enter a description...',
    rows: 4,
    onChange: fn(),
  },
} satisfies Meta<typeof TextArea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const WithHint: Story = { args: { hint: 'Maximum 280 characters.' } }
export const Invalid: Story = { args: { isInvalid: true, hint: 'Please enter at least 10 characters.' } }
export const Disabled: Story = { args: { isDisabled: true } }
