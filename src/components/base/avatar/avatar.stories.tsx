import type { Meta, StoryObj } from '@storybook/react-vite'
import { Avatar } from './avatar'

const meta = {
  title: 'Base/Avatar/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] },
    src: { control: 'text' },
    alt: { control: 'text' },
    initials: { control: 'text' },
    status: { control: 'select', options: [undefined, 'online', 'offline'] },
    verified: { control: 'boolean' },
    border: { control: 'boolean' },
    contrastBorder: { control: 'boolean' },
    rounded: { control: 'boolean' },
    count: { control: 'number' },
  },
  args: {
    size: 'md',
    src: 'https://www.untitledui.com/marketing/avatars/olivia-rhye/2x.webp',
    alt: 'Olivia Rhye',
    rounded: true,
  },
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const WithImage: Story = {}

export const WithInitials: Story = {
  args: { src: null, initials: 'OR' },
}

export const Placeholder: Story = {
  args: { src: null, initials: undefined },
}

export const Online: Story = { args: { status: 'online' } }
export const Offline: Story = { args: { status: 'offline' } }
export const Verified: Story = { args: { verified: true } }
export const WithCount: Story = { args: { count: 5 } }

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-end gap-3">
      {(['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const).map((size) => (
        <Avatar key={size} {...args} size={size} />
      ))}
    </div>
  ),
}
