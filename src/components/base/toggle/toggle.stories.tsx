import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn, userEvent, within } from 'storybook/test'
import { Toggle } from './toggle'

const meta = {
  title: 'Base/Toggle/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md'] },
    slim: { control: 'boolean' },
    label: { control: 'text' },
    hint: { control: 'text' },
    isDisabled: { control: 'boolean' },
    isSelected: { control: 'boolean' },
    defaultSelected: { control: 'boolean' },
    onChange: { action: 'changed' },
  },
  args: {
    label: 'Email notifications',
    onChange: fn(),
  },
} satisfies Meta<typeof Toggle>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const On: Story = { args: { defaultSelected: true } }
export const WithHint: Story = { args: { hint: 'Receive product updates and announcements.' } }
export const Slim: Story = { args: { slim: true } }
export const SizeMd: Story = { args: { size: 'md' } }
export const Disabled: Story = { args: { isDisabled: true } }

export const ToggleInteraction: Story = {
  args: { label: 'Push notifications' },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    const sw = canvas.getByRole('switch', { name: /push notifications/i })
    await expect(sw).not.toBeChecked()
    await userEvent.click(sw)
    await expect(sw).toBeChecked()
    await expect(args.onChange).toHaveBeenCalled()
  },
}
