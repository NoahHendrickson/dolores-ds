import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  BookmarkSimple,
  Calendar,
  ChatCircle,
  Check,
  Clock,
  DownloadSimple,
  Envelope,
  Eye,
  EyeSlash,
  File,
  Folder,
  Gear,
  Heart,
  House,
  Image as ImageIcon,
  Lock,
  MagnifyingGlass,
  PencilSimple,
  Plus,
  ShareNetwork,
  Star,
  Trash,
  UploadSimple,
  User,
  X,
} from '@phosphor-icons/react'
import { Button } from '@/components/base/buttons/button'

const meta = {
  title: 'Foundations/Phosphor Icons',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Phosphor icons (`@phosphor-icons/react`, optional peer) work alongside `@untitledui/icons` in dolores-ds. Each icon supports six weights — `thin`, `light`, `regular` (default), `bold`, `fill`, `duotone` — and any pixel `size`. They are compatible with components that take `iconLeading`/`iconTrailing` as a function component (e.g., `Button`).',
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const COMMON_ICONS = [
  { name: 'House', Icon: House },
  { name: 'User', Icon: User },
  { name: 'MagnifyingGlass', Icon: MagnifyingGlass },
  { name: 'Bell', Icon: Bell },
  { name: 'Gear', Icon: Gear },
  { name: 'Plus', Icon: Plus },
  { name: 'Check', Icon: Check },
  { name: 'X', Icon: X },
  { name: 'Heart', Icon: Heart },
  { name: 'Star', Icon: Star },
  { name: 'ArrowLeft', Icon: ArrowLeft },
  { name: 'ArrowRight', Icon: ArrowRight },
  { name: 'Trash', Icon: Trash },
  { name: 'PencilSimple', Icon: PencilSimple },
  { name: 'Folder', Icon: Folder },
  { name: 'File', Icon: File },
  { name: 'Image', Icon: ImageIcon },
  { name: 'Calendar', Icon: Calendar },
  { name: 'Clock', Icon: Clock },
  { name: 'Envelope', Icon: Envelope },
  { name: 'Lock', Icon: Lock },
  { name: 'Eye', Icon: Eye },
  { name: 'EyeSlash', Icon: EyeSlash },
  { name: 'DownloadSimple', Icon: DownloadSimple },
  { name: 'UploadSimple', Icon: UploadSimple },
  { name: 'BookmarkSimple', Icon: BookmarkSimple },
  { name: 'ShareNetwork', Icon: ShareNetwork },
  { name: 'ChatCircle', Icon: ChatCircle },
]

export const CommonSet: Story = {
  parameters: {
    docs: {
      description: {
        story: 'A representative slice of frequently-used Phosphor icons rendered at 24px in the default `regular` weight.',
      },
    },
  },
  render: () => (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {COMMON_ICONS.map(({ name, Icon }) => (
        <div
          key={name}
          className="flex flex-col items-center justify-center gap-2 rounded-xl border border-secondary bg-primary p-4"
        >
          <Icon className="size-6 text-fg-primary" />
          <span className="font-mono text-xs text-tertiary">{name}</span>
        </div>
      ))}
    </div>
  ),
}

export const Weights: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Six weight variants of the same icon. Pass `weight` directly: `<House weight="bold" />`. To use a non-default weight inside `iconLeading`/`iconTrailing`, pass JSX rather than the bare component.',
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap items-end gap-6">
      {(['thin', 'light', 'regular', 'bold', 'fill', 'duotone'] as const).map((weight) => (
        <div key={weight} className="flex flex-col items-center gap-2">
          <House weight={weight} className="size-10 text-fg-primary" />
          <span className="font-mono text-xs text-tertiary">{weight}</span>
        </div>
      ))}
    </div>
  ),
}

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Phosphor icons accept any pixel `size`. We use Tailwind size utilities (`size-4` → 16px, `size-5` → 20px, `size-6` → 24px, `size-8` → 32px, `size-12` → 48px) to keep sizing tokenized.',
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap items-end gap-6">
      {(
        [
          { cls: 'size-4', label: '16px' },
          { cls: 'size-5', label: '20px' },
          { cls: 'size-6', label: '24px' },
          { cls: 'size-8', label: '32px' },
          { cls: 'size-12', label: '48px' },
        ] as const
      ).map(({ cls, label }) => (
        <div key={label} className="flex flex-col items-center gap-2">
          <Star className={`${cls} text-fg-warning-primary`} weight="fill" />
          <span className="font-mono text-xs text-tertiary">{label}</span>
        </div>
      ))}
    </div>
  ),
}

export const InButton: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Phosphor icons drop into dolores-ds `Button` via `iconLeading`/`iconTrailing`. Pass the bare component for the default `regular` weight, or pass JSX (`<House weight="bold" />`) to control weight or size.',
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button iconLeading={Plus}>New item</Button>
      <Button color="secondary" iconLeading={MagnifyingGlass}>
        Search
      </Button>
      <Button color="primary-destructive" iconLeading={Trash}>
        Delete
      </Button>
      <Button color="secondary" iconTrailing={ArrowRight}>
        Continue
      </Button>
      <Button color="secondary" iconLeading={<Heart weight="fill" />}>
        Liked
      </Button>
      <Button color="tertiary" aria-label="Settings" iconLeading={Gear} />
    </div>
  ),
}
