import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Button } from '@/components/base/buttons/button'
import { SlideoutMenu } from './slideout-menu'

const meta = {
  title: 'Application/SlideoutMenu',
  component: SlideoutMenu,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Side-anchored modal menu. Slides in from the right, dims the page, and traps focus. Composed of `SlideoutMenu.Header`, `SlideoutMenu.Content`, and `SlideoutMenu.Footer`. Wrap a trigger button in `SlideoutMenu.Trigger` from react-aria-components.',
      },
    },
  },
} satisfies Meta<typeof SlideoutMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open slideout</Button>
        <SlideoutMenu isOpen={isOpen} onOpenChange={setIsOpen}>
          {({ close }) => (
            <>
              <SlideoutMenu.Header onClose={close}>
                <h2 className="text-lg font-semibold text-primary">Notifications</h2>
                <p className="text-sm text-tertiary">Updates from the last 7 days.</p>
              </SlideoutMenu.Header>
              <SlideoutMenu.Content>
                <ul className="flex flex-col gap-3">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <li key={i} className="rounded-lg border border-secondary p-3">
                      <p className="text-sm font-medium text-secondary">Update #{i + 1}</p>
                      <p className="text-sm text-tertiary">A short example notification body.</p>
                    </li>
                  ))}
                </ul>
              </SlideoutMenu.Content>
              <SlideoutMenu.Footer>
                <div className="flex justify-end gap-2">
                  <Button color="secondary" size="sm" onClick={close}>
                    Cancel
                  </Button>
                  <Button color="primary" size="sm" onClick={close}>
                    Save
                  </Button>
                </div>
              </SlideoutMenu.Footer>
            </>
          )}
        </SlideoutMenu>
      </>
    )
  },
}

export const WithTrigger: Story = {
  render: () => (
    <SlideoutMenu.Trigger>
      <Button color="secondary">Open via Trigger</Button>
      <SlideoutMenu>
        {({ close }) => (
          <>
            <SlideoutMenu.Header onClose={close}>
              <h2 className="text-lg font-semibold text-primary">Settings</h2>
            </SlideoutMenu.Header>
            <SlideoutMenu.Content>
              <p className="text-sm text-secondary">
                Triggered via <code className="text-tertiary">SlideoutMenu.Trigger</code>, which wires open/close
                state through react-aria-components.
              </p>
            </SlideoutMenu.Content>
          </>
        )}
      </SlideoutMenu>
    </SlideoutMenu.Trigger>
  ),
}
