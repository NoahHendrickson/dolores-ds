import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn, userEvent, within } from 'storybook/test'
import { Mail01, SearchLg } from '@untitledui/icons'
import { Input } from './input'

const meta = {
  title: 'Base/Input/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    label: { control: 'text' },
    hint: { control: 'text' },
    placeholder: { control: 'text' },
    isDisabled: { control: 'boolean' },
    isInvalid: { control: 'boolean' },
    isRequired: { control: 'boolean' },
    icon: { control: false },
    shortcut: { control: 'text' },
    tooltip: { control: 'text' },
    onChange: { action: 'changed' },
  },
  args: {
    label: 'Email',
    placeholder: 'olivia@untitledui.com',
    size: 'md',
    onChange: fn(),
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const WithIcon: Story = { args: { icon: Mail01 } }
export const WithHint: Story = { args: { hint: 'We will only use this for important account updates.' } }
export const WithShortcut: Story = { args: { icon: SearchLg, label: 'Search', placeholder: 'Search...', shortcut: '⌘K' } }
export const WithTooltip: Story = { args: { tooltip: 'We never share your email address.' } }
export const Invalid: Story = { args: { isInvalid: true, hint: 'Please enter a valid email address.' } }
export const Disabled: Story = { args: { isDisabled: true, value: 'olivia@untitledui.com' } }
export const Required: Story = { args: { isRequired: true } }

export const TypingInteraction: Story = {
  args: { label: 'Your name', placeholder: 'Type here', icon: undefined },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByPlaceholderText(/type here/i)
    await userEvent.type(input, 'Olivia Rhye', { delay: 30 })
    await expect(input).toHaveValue('Olivia Rhye')
    await expect(args.onChange).toHaveBeenCalled()
  },
}
