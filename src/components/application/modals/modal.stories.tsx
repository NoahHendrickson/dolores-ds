import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn, userEvent, within } from 'storybook/test'
import { AlertTriangle } from '@untitledui/icons'
import { Button } from '@/components/base/buttons/button'
import { CloseButton } from '@/components/base/buttons/close-button'
import { Dialog, DialogTrigger, Modal, ModalOverlay } from './modal'

type Args = {
  isDismissable?: boolean
  defaultOpen?: boolean
  triggerLabel?: string
  title?: string
  subtitle?: string
  body?: string
  confirmLabel?: string
  cancelLabel?: string
  destructive?: boolean
  onConfirm?: () => void
}

const meta: Meta<Args> = {
  title: 'Application/Modals/Dialog',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Accessible modal dialog built on react-aria. Header (title + subtitle + circular close button), divider, body, and footer where the primary action fills and the secondary hugs its content.',
      },
    },
    layout: 'centered',
  },
  argTypes: {
    isDismissable: { control: 'boolean', description: 'Allow click-outside / Escape to close' },
    defaultOpen: { control: 'boolean', description: 'Open the dialog on mount' },
    triggerLabel: { control: 'text' },
    title: { control: 'text' },
    subtitle: { control: 'text' },
    body: { control: 'text' },
    confirmLabel: { control: 'text' },
    cancelLabel: { control: 'text' },
    destructive: { control: 'boolean' },
    onConfirm: { action: 'confirmed' },
  },
  args: {
    isDismissable: true,
    defaultOpen: false,
    triggerLabel: 'Open dialog',
    title: 'Blog post published',
    subtitle: 'This is placeholder text',
    body: 'This blog post has been published. Team members will be able to edit this post and republish changes.',
    confirmLabel: 'Confirm',
    cancelLabel: 'Cancel',
    destructive: false,
    onConfirm: fn(),
  },
  render: (args) => (
    <DialogTrigger defaultOpen={args.defaultOpen}>
      <Button color="secondary">{args.triggerLabel}</Button>
      <ModalOverlay isDismissable={args.isDismissable}>
        <Modal>
          <Dialog>
            {({ close }) => (
              <div className="relative flex w-full max-w-md flex-col overflow-hidden rounded-2xl bg-primary shadow-xl ring-1 ring-secondary outline-hidden">
                {/* Header */}
                <div className="flex w-full items-start gap-2 py-3 pr-3 pl-6">
                  <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <h2 className="text-md font-semibold text-primary">{args.title}</h2>
                    {args.subtitle && (
                      <p className="text-sm text-tertiary">{args.subtitle}</p>
                    )}
                  </div>
                  <CloseButton
                    size="sm"
                    onPress={close}
                    className="rounded-full bg-tertiary hover:bg-quaternary"
                  />
                </div>

                {/* Divider */}
                <div className="h-px w-full bg-border-secondary" />

                {/* Body */}
                <div className="flex flex-col gap-4 p-6">
                  {args.destructive && (
                    <div className="inline-flex size-12 items-center justify-center rounded-full bg-error-secondary text-fg-error-primary">
                      <AlertTriangle className="size-6" />
                    </div>
                  )}
                  <p className="text-sm text-tertiary">{args.body}</p>
                </div>

                {/* Footer — secondary hugs, primary fills */}
                <div className="flex w-full gap-3 px-6 pt-8 pb-6">
                  <Button color="secondary" onClick={close}>
                    {args.cancelLabel}
                  </Button>
                  <Button
                    color={args.destructive ? 'primary-destructive' : 'primary'}
                    className="flex-1"
                    onClick={() => {
                      args.onConfirm?.()
                      close()
                    }}
                  >
                    {args.confirmLabel}
                  </Button>
                </div>
              </div>
            )}
          </Dialog>
        </Modal>
      </ModalOverlay>
    </DialogTrigger>
  ),
}

export default meta
type Story = StoryObj<Args>

export const Default: Story = {}

export const OpenByDefault: Story = {
  args: { defaultOpen: true },
}

export const Destructive: Story = {
  args: {
    title: 'Delete project?',
    subtitle: 'This action is permanent.',
    body: 'This will permanently delete the project and all of its data. This cannot be undone.',
    confirmLabel: 'Delete',
    destructive: true,
  },
}

export const NotDismissable: Story = {
  args: {
    isDismissable: false,
    title: 'Required step',
    subtitle: 'You must respond to continue.',
    body: 'Clicking outside or pressing Escape will not close this dialog — please confirm or cancel.',
  },
}

export const OpenAndConfirm: Story = {
  args: { triggerLabel: 'Open and confirm' },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole('button', { name: /open and confirm/i })
    await userEvent.click(trigger)

    const dialog = await within(document.body).findByRole('dialog')
    await expect(dialog).toBeInTheDocument()

    const confirm = await within(dialog).findByRole('button', { name: /^confirm$/i })
    await userEvent.click(confirm)

    await expect(args.onConfirm).toHaveBeenCalledOnce()
  },
}
