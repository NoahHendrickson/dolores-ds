import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { Edit01, Settings01, Trash01 } from '@untitledui/icons'
import { ButtonUtility } from './button-utility'

const meta = {
  title: 'Base/Buttons/Button Utility',
  component: ButtonUtility,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm'] },
    color: { control: 'select', options: ['secondary', 'tertiary'] },
    icon: { control: false },
    isDisabled: { control: 'boolean' },
    tooltip: { control: 'text' },
    tooltipPlacement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
    onClick: { action: 'clicked' },
  },
  args: { onClick: fn(), icon: Settings01, tooltip: 'Settings', color: 'tertiary', size: 'sm' },
} satisfies Meta<typeof ButtonUtility>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Edit: Story = { args: { icon: Edit01, tooltip: 'Edit', color: 'secondary' } }
export const Delete: Story = { args: { icon: Trash01, tooltip: 'Delete' } }

export const Row: Story = {
  render: (args) => (
    <div className="flex items-center gap-2">
      <ButtonUtility {...args} icon={Edit01} tooltip="Edit" />
      <ButtonUtility {...args} icon={Settings01} tooltip="Settings" />
      <ButtonUtility {...args} icon={Trash01} tooltip="Delete" />
    </div>
  ),
}
