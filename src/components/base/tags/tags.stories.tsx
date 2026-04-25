import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { Tag, TagGroup, TagList } from './tags'

const items = [
  { id: '1', name: 'Design' },
  { id: '2', name: 'Engineering' },
  { id: '3', name: 'Product' },
]

const meta = {
  title: 'Base/Tags/Tag',
  component: TagGroup,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    label: { control: 'text' },
    selectionMode: { control: 'select', options: ['none', 'single', 'multiple'] },
    onRemove: { action: 'removed' },
  },
  args: {
    label: 'Categories',
    size: 'md',
    selectionMode: 'multiple',
    onRemove: fn(),
  },
  render: (args) => (
    <TagGroup {...args}>
      <TagList items={items}>
        {(item) => <Tag id={item.id}>{item.name}</Tag>}
      </TagList>
    </TagGroup>
  ),
} satisfies Meta<typeof TagGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Small: Story = { args: { size: 'sm' } }
export const Large: Story = { args: { size: 'lg' } }
export const SingleSelect: Story = { args: { selectionMode: 'single' } }
