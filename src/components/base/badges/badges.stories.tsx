import type { Meta, StoryObj } from '@storybook/react-vite'
import { Star01 } from '@untitledui/icons'
import { Badge, BadgeWithDot, BadgeWithIcon } from './badges'

const meta = {
  title: 'Base/Badges/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['pill-color', 'color', 'modern'],
    },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    color: {
      control: 'select',
      options: [
        'gray',
        'brand',
        'error',
        'warning',
        'success',
        'slate',
        'sky',
        'blue',
        'indigo',
        'purple',
        'pink',
        'orange',
      ],
    },
    children: { control: 'text' },
  },
  args: {
    type: 'pill-color',
    size: 'md',
    color: 'brand',
    children: 'Label',
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Pill: Story = { args: { type: 'pill-color' } }
export const Solid: Story = { args: { type: 'color' } }
export const Modern: Story = { args: { type: 'modern' } }

export const ColorRow: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-2">
      {(['gray', 'brand', 'error', 'warning', 'success', 'blue', 'purple', 'pink'] as const).map((color) => (
        <Badge key={color} {...args} color={color}>
          {color}
        </Badge>
      ))}
    </div>
  ),
}

export const WithDot: Story = {
  render: (args) => (
    <BadgeWithDot type={args.type} size={args.size} color={args.color as 'success'}>
      Online
    </BadgeWithDot>
  ),
}

export const WithIcon: Story = {
  render: (args) => (
    <BadgeWithIcon type={args.type} size={args.size} color={args.color as 'brand'} iconLeading={Star01}>
      Featured
    </BadgeWithIcon>
  ),
}
