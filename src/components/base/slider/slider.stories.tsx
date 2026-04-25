import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { Slider } from './slider'

const meta = {
  title: 'Base/Slider/Slider',
  component: Slider,
  tags: ['autodocs'],
  argTypes: {
    minValue: { control: 'number' },
    maxValue: { control: 'number' },
    step: { control: 'number' },
    isDisabled: { control: 'boolean' },
    formatOptions: { control: 'object' },
    onChange: { action: 'changed' },
  },
  args: {
    minValue: 0,
    maxValue: 100,
    step: 1,
    defaultValue: [40],
    onChange: fn(),
  },
  render: (args) => (
    <div className="w-80 p-4">
      <Slider {...args} />
    </div>
  ),
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Range: Story = { args: { defaultValue: [25, 75] } }
export const Stepped: Story = { args: { step: 10, defaultValue: [50] } }
export const Disabled: Story = { args: { isDisabled: true } }
