import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'
import { BarChart01, Settings01, User01 } from '@untitledui/icons'
import { Tab, TabList, TabPanel, Tabs } from './tabs'

type Args = {
  size?: 'sm' | 'md'
  type?: 'button-brand' | 'button-gray' | 'button-border' | 'button-minimal' | 'underline'
  fullWidth?: boolean
  withIcons?: boolean
  withBadges?: boolean
}

const meta: Meta<Args> = {
  title: 'Application/Tabs/Tabs',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Accessible tabs built on react-aria. Compose `Tabs` + `TabList` + `Tab` + `TabPanel`. The `TabList` accepts `type` (`button-brand`, `button-gray`, `button-border`, `button-minimal`, `underline`) and `size` (`sm` / `md`). Vertical orientation swaps `underline` for `line`.',
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md'] },
    type: {
      control: 'select',
      options: ['button-brand', 'button-gray', 'button-border', 'button-minimal', 'underline'],
    },
    fullWidth: { control: 'boolean' },
    withIcons: { control: 'boolean' },
    withBadges: { control: 'boolean' },
  },
  args: {
    size: 'sm',
    type: 'underline',
    fullWidth: false,
    withIcons: false,
    withBadges: false,
  },
  render: (args) => (
    <div className="w-full max-w-2xl">
      <Tabs defaultSelectedKey="overview">
        <TabList type={args.type} size={args.size} fullWidth={args.fullWidth}>
          <Tab
            id="overview"
            label="Overview"
            icon={args.withIcons ? BarChart01 : undefined}
            badge={args.withBadges ? 12 : undefined}
          />
          <Tab
            id="members"
            label="Members"
            icon={args.withIcons ? User01 : undefined}
            badge={args.withBadges ? 4 : undefined}
          />
          <Tab
            id="settings"
            label="Settings"
            icon={args.withIcons ? Settings01 : undefined}
          />
        </TabList>
        <TabPanel id="overview" className="pt-4 text-sm text-tertiary">
          Project overview goes here — recent activity, key metrics, and shortcuts.
        </TabPanel>
        <TabPanel id="members" className="pt-4 text-sm text-tertiary">
          Team members and their roles.
        </TabPanel>
        <TabPanel id="settings" className="pt-4 text-sm text-tertiary">
          Project preferences and integrations.
        </TabPanel>
      </Tabs>
    </div>
  ),
}

export default meta
type Story = StoryObj<Args>

export const Underline: Story = {}

export const ButtonBrand: Story = { args: { type: 'button-brand' } }
export const ButtonGray: Story = { args: { type: 'button-gray' } }
export const ButtonBorder: Story = { args: { type: 'button-border' } }
export const ButtonMinimal: Story = { args: { type: 'button-minimal' } }

export const SizeMd: Story = { args: { size: 'md' } }
export const FullWidth: Story = { args: { type: 'underline', fullWidth: true } }
export const WithIcons: Story = { args: { withIcons: true } }
export const WithBadges: Story = { args: { type: 'underline', withBadges: true } }

export const Vertical: Story = {
  parameters: {
    docs: { description: { story: 'Vertical orientation. Use the `line` type instead of `underline`.' } },
  },
  render: () => (
    <Tabs orientation="vertical" defaultSelectedKey="overview">
      <div className="flex gap-6">
        <TabList type="line" orientation="vertical">
          <Tab id="overview" label="Overview" icon={BarChart01} />
          <Tab id="members" label="Members" icon={User01} />
          <Tab id="settings" label="Settings" icon={Settings01} />
        </TabList>
        <div className="flex-1 text-sm text-tertiary">
          <TabPanel id="overview">Project overview content.</TabPanel>
          <TabPanel id="members">Team members content.</TabPanel>
          <TabPanel id="settings">Settings content.</TabPanel>
        </div>
      </div>
    </Tabs>
  ),
}

export const SwitchInteraction: Story = {
  args: { type: 'underline' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Default panel ("overview") is visible.
    await expect(canvas.getByRole('tabpanel')).toHaveTextContent(/project overview/i)

    // Click the "Members" tab and confirm the panel swaps.
    const membersTab = canvas.getByRole('tab', { name: /members/i })
    await userEvent.click(membersTab)
    await expect(canvas.getByRole('tabpanel')).toHaveTextContent(/team members/i)

    // Keyboard: ArrowRight focuses the next tab; Enter activates it.
    await userEvent.keyboard('{ArrowRight}{Enter}')
    await expect(canvas.getByRole('tabpanel')).toHaveTextContent(/project preferences/i)
  },
}
