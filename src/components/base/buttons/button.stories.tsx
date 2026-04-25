import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn, userEvent, within } from 'storybook/test'
import { Plus, ArrowRight } from '@untitledui/icons'
import { Button } from './button'

const meta = {
  title: 'Base/Buttons/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size of the button',
    },
    color: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'tertiary',
        'primary-destructive',
        'secondary-destructive',
        'tertiary-destructive',
        'link-gray',
        'link-color',
        'link-destructive',
      ],
      description: 'Visual color/variant',
    },
    isDisabled: { control: 'boolean' },
    isLoading: { control: 'boolean' },
    showTextWhileLoading: { control: 'boolean' },
    children: { control: 'text', description: 'Button label' },
    onClick: { action: 'clicked' },
  },
  args: {
    onClick: fn(),
    children: 'Button',
    size: 'md',
    color: 'primary',
  },
  parameters: {
    docs: {
      description: {
        component:
          'Primary action button built on react-aria. Supports size, color, leading/trailing icons, loading and disabled states.',
      },
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}

export const Secondary: Story = { args: { color: 'secondary' } }
export const Tertiary: Story = { args: { color: 'tertiary' } }
export const Destructive: Story = { args: { color: 'primary-destructive', children: 'Delete' } }
export const LinkGray: Story = { args: { color: 'link-gray', children: 'Learn more' } }

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <Button key={size} {...args} size={size}>
          {size}
        </Button>
      ))}
    </div>
  ),
}

export const WithLeadingIcon: Story = {
  args: { iconLeading: Plus, children: 'New item' },
}

export const WithTrailingIcon: Story = {
  args: { iconTrailing: ArrowRight, children: 'Continue' },
}

export const Loading: Story = { args: { isLoading: true, children: 'Saving' } }
export const LoadingWithText: Story = {
  args: { isLoading: true, showTextWhileLoading: true, children: 'Saving' },
}

export const Disabled: Story = { args: { isDisabled: true } }

export const ClickInteraction: Story = {
  args: { children: 'Click me' },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    const btn = canvas.getByRole('button', { name: /click me/i })
    await userEvent.click(btn)
    await expect(args.onClick).toHaveBeenCalledOnce()
  },
}
