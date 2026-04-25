import type { Meta, StoryObj } from '@storybook/react-vite'
import { ProgressBar } from './progress-indicators'

const meta = {
  title: 'Base/Progress/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    min: { control: 'number' },
    max: { control: 'number' },
    labelPosition: {
      control: 'select',
      options: ['right', 'bottom', 'top-floating', 'bottom-floating'],
    },
  },
  args: { value: 60, min: 0, max: 100, labelPosition: 'right' },
  render: (args) => (
    <div className="w-80 py-4">
      <ProgressBar {...args} />
    </div>
  ),
} satisfies Meta<typeof ProgressBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Quarter: Story = { args: { value: 25 } }
export const Full: Story = { args: { value: 100 } }
export const LabelBottom: Story = { args: { labelPosition: 'bottom' } }
export const TopFloating: Story = { args: { labelPosition: 'top-floating' } }
