import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '@/components/base/buttons/button'
import { Tooltip, TooltipTrigger } from './tooltip'

type Args = {
  title: string
  description?: string
  arrow?: boolean
  delay?: number
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'top start' | 'top end' | 'bottom start' | 'bottom end'
  isDisabled?: boolean
}

const meta: Meta<Args> = {
  title: 'Base/Tooltip/Tooltip',
  component: Tooltip as never,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    arrow: { control: 'boolean' },
    delay: { control: 'number' },
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right', 'top start', 'top end', 'bottom start', 'bottom end'],
    },
    isDisabled: { control: 'boolean' },
  },
  args: {
    title: 'Tooltip title',
    description: 'A short helpful description.',
    arrow: true,
    placement: 'top',
    delay: 200,
  },
  render: (args) => (
    <div className="grid place-items-center py-12">
      <TooltipTrigger>
        <Tooltip {...args}>
          <Button color="secondary">Hover me</Button>
        </Tooltip>
      </TooltipTrigger>
    </div>
  ),
}

export default meta
type Story = StoryObj<Args>

export const Default: Story = {}
export const NoArrow: Story = { args: { arrow: false } }
export const Bottom: Story = { args: { placement: 'bottom' } }
export const Right: Story = { args: { placement: 'right' } }
export const TitleOnly: Story = { args: { description: undefined } }
