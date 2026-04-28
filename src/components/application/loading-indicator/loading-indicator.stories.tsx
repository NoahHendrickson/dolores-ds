import type { Meta, StoryObj } from '@storybook/react-vite'
import { LoadingIndicator } from './loading-indicator'

const meta = {
  title: 'Application/LoadingIndicator',
  component: LoadingIndicator,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['line-simple', 'line-spinner', 'dot-circle'],
      description: 'The visual style of the loading indicator',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'The size of the indicator',
    },
    label: { control: 'text', description: 'Optional label displayed below the spinner' },
  },
  args: {
    type: 'line-simple',
    size: 'md',
  },
  parameters: {
    docs: {
      description: {
        component:
          'Animated loading spinner. Three visual styles (`line-simple`, `line-spinner`, `dot-circle`) and four sizes. Optional label renders below the spinner.',
      },
    },
  },
} satisfies Meta<typeof LoadingIndicator>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const LineSpinner: Story = { args: { type: 'line-spinner' } }
export const DotCircle: Story = { args: { type: 'dot-circle' } }

export const WithLabel: Story = { args: { label: 'Loading…' } }

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-8">
      {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <div key={size} className="flex flex-col items-center gap-2">
          <LoadingIndicator {...args} size={size} />
          <span className="text-xs text-tertiary">{size}</span>
        </div>
      ))}
    </div>
  ),
}

export const Types: Story = {
  render: (args) => (
    <div className="flex items-center gap-12">
      {(['line-simple', 'line-spinner', 'dot-circle'] as const).map((type) => (
        <div key={type} className="flex flex-col items-center gap-2">
          <LoadingIndicator {...args} type={type} />
          <span className="text-xs text-tertiary">{type}</span>
        </div>
      ))}
    </div>
  ),
}
