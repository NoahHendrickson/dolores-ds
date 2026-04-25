import type { Meta, StoryObj } from '@storybook/react-vite'
import { Edit01, Settings01, Trash01, User01 } from '@untitledui/icons'
import { Button } from '@/components/base/buttons/button'
import { Dropdown } from './dropdown'

const meta = {
  title: 'Base/Dropdown/Dropdown',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Composable dropdown menu built on react-aria. Use `Dropdown.Root`, `Dropdown.Popover`, `Dropdown.Menu`, `Dropdown.Item`, `Dropdown.Separator`, and `Dropdown.DotsButton`.',
      },
    },
  },
  render: () => (
    <div className="grid place-items-center py-10">
      <Dropdown.Root>
        <Button color="secondary">Open menu</Button>
        <Dropdown.Popover>
          <Dropdown.Menu>
            <Dropdown.Item label="Profile" icon={User01} />
            <Dropdown.Item label="Settings" icon={Settings01} />
            <Dropdown.Item label="Edit" icon={Edit01} />
            <Dropdown.Separator />
            <Dropdown.Item label="Delete" icon={Trash01} />
          </Dropdown.Menu>
        </Dropdown.Popover>
      </Dropdown.Root>
    </div>
  ),
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const DotsTrigger: Story = {
  render: () => (
    <div className="grid place-items-center py-10">
      <Dropdown.Root>
        <Dropdown.DotsButton />
        <Dropdown.Popover>
          <Dropdown.Menu>
            <Dropdown.Item label="View" />
            <Dropdown.Item label="Duplicate" />
            <Dropdown.Separator />
            <Dropdown.Item label="Delete" icon={Trash01} />
          </Dropdown.Menu>
        </Dropdown.Popover>
      </Dropdown.Root>
    </div>
  ),
}
