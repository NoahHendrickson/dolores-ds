import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn, userEvent, within } from 'storybook/test'
import { Checkbox } from './checkbox'

const meta = {
  title: 'Base/Checkbox/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md'] },
    label: { control: 'text' },
    hint: { control: 'text' },
    isDisabled: { control: 'boolean' },
    isSelected: { control: 'boolean' },
    isIndeterminate: { control: 'boolean' },
    onChange: { action: 'changed' },
  },
  args: {
    label: 'Remember me',
    onChange: fn(),
  },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const WithHint: Story = { args: { hint: 'Save my login on this device.' } }
export const Checked: Story = { args: { isSelected: true } }
export const Indeterminate: Story = { args: { isIndeterminate: true } }
export const Disabled: Story = { args: { isDisabled: true } }
export const SizeMd: Story = { args: { size: 'md' } }

export const ToggleInteraction: Story = {
  args: { label: 'Subscribe' },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    const cb = canvas.getByRole('checkbox', { name: /subscribe/i })
    await expect(cb).not.toBeChecked()
    await userEvent.click(cb)
    await expect(cb).toBeChecked()
    await expect(args.onChange).toHaveBeenCalled()
  },
}
