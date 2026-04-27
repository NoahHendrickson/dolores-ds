import { useEffect, useState, type ReactNode } from 'react'
import {
  AlertTriangle,
  ArrowUpRight,
  Mail01,
  Moon01,
  Plus,
  SearchLg,
  Star01,
  Sun,
  Trash01,
} from '@untitledui/icons'
import type { Selection } from 'react-aria-components'

import { Button } from '@/components/base/buttons/button'
import { Input } from '@/components/base/input/input'
import { Checkbox } from '@/components/base/checkbox/checkbox'
import { Toggle } from '@/components/base/toggle/toggle'
import { Slider } from '@/components/base/slider/slider'
import { ProgressBar } from '@/components/base/progress-indicators/progress-indicators'
import { Select } from '@/components/base/select/select'
import { MultiSelect } from '@/components/base/select/multi-select'
import { Tab, TabList, TabPanel, Tabs } from '@/components/application/tabs/tabs'
import { CloseButton } from '@/components/base/buttons/close-button'
import { Dialog, DialogTrigger, Modal, ModalOverlay } from '@/components/application/modals/modal'
import { FeaturedIcon } from '@/components/foundations/featured-icon/featured-icon'
import { cx } from '@/utils/cx'

import './App.css'

const teammates = [
  { id: 'olivia', label: 'Olivia Rhye', supportingText: 'olivia@untitledui.com' },
  { id: 'phoenix', label: 'Phoenix Baker', supportingText: 'phoenix@untitledui.com' },
  { id: 'lana', label: 'Lana Steiner', supportingText: 'lana@untitledui.com' },
  { id: 'demi', label: 'Demi Wilkinson', supportingText: 'demi@untitledui.com' },
  { id: 'candice', label: 'Candice Wu', supportingText: 'candice@untitledui.com' },
]

function Tile({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <div
      className={cx(
        'flex flex-col rounded-3xl bg-primary p-6 shadow-sm md:p-8',
        className,
      )}
    >
      {children}
    </div>
  )
}

function StatTile({
  caption,
  stat,
  sub,
  className,
}: {
  caption?: string
  stat: ReactNode
  sub?: string
  className?: string
}) {
  return (
    <Tile
      className={cx('items-center justify-center gap-1 text-center', className)}
    >
      {caption && (
        <p className="text-sm font-medium text-quaternary">{caption}</p>
      )}
      <p className="text-display-xl font-semibold tracking-tight text-primary md:text-display-2xl">
        {stat}
      </p>
      {sub && <p className="text-sm text-tertiary">{sub}</p>}
    </Tile>
  )
}

function HeroTile({ className }: { className?: string }) {
  return (
    <Tile className={cx('justify-between gap-10 md:p-10', className)}>
      <h1 className="text-display-md font-semibold tracking-tight text-primary md:text-display-lg">
        A small React 19
        <br />
        design system.
      </h1>
      <div className="flex flex-wrap items-center gap-3">
        <Button color="primary" size="lg" iconTrailing={ArrowUpRight}>
          Get started
        </Button>
        <Button color="secondary" size="lg" iconLeading={Star01}>
          GitHub
        </Button>
      </div>
    </Tile>
  )
}

function ChunkyChipTile({ className }: { className?: string }) {
  return (
    <Tile className={cx('items-center justify-center', className)}>
      <Button color="primary" size="xl" iconLeading={Star01}>
        Chunky shadow
      </Button>
    </Tile>
  )
}

function FeaturedDialogTile({ className }: { className?: string }) {
  const [assignee, setAssignee] = useState<string | number | null>('olivia')
  const [reviewers, setReviewers] = useState<Selection>(
    new Set(['phoenix', 'lana']),
  )

  return (
    <Tile className={cx('gap-0 p-0 md:p-0', className)}>
      <div className="flex w-full items-start gap-2 py-3 pr-3 pl-6">
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <h2 className="text-md font-semibold text-primary">
            Assign teammates
          </h2>
          <p className="text-sm text-tertiary">
            Pick an owner and any reviewers.
          </p>
        </div>
        <CloseButton
          size="sm"
          className="rounded-full bg-tertiary hover:bg-quaternary"
        />
      </div>
      <div className="h-px w-full bg-border-secondary" />
      <div className="flex flex-col gap-4 p-6">
        <Select
          label="Owner"
          placeholder="Pick an owner"
          items={teammates}
          selectedKey={assignee}
          onSelectionChange={(key) => setAssignee(key as string)}
        >
          {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
        </Select>
        <MultiSelect
          label="Reviewers"
          placeholder="Pick reviewers"
          items={teammates}
          selectedKeys={reviewers}
          onSelectionChange={setReviewers}
          onReset={() => setReviewers(new Set())}
          onSelectAll={() => setReviewers(new Set(teammates.map((t) => t.id)))}
        >
          {(item) => (
            <MultiSelect.Item
              id={item.id}
              supportingText={item.supportingText}
              selectionIndicator="checkbox"
              selectionIndicatorAlign="left"
            >
              {item.label}
            </MultiSelect.Item>
          )}
        </MultiSelect>
      </div>
      <div className="flex w-full gap-3 px-6 pb-6">
        <Button color="secondary">Cancel</Button>
        <Button color="primary" className="flex-1">
          Assign
        </Button>
      </div>
    </Tile>
  )
}

function TabsTile({ className }: { className?: string }) {
  return (
    <Tile className={cx('justify-center', className)}>
      <Tabs defaultSelectedKey="overview">
        <TabList type="button-minimal" size="md">
          <Tab id="overview" label="Overview" />
          <Tab id="members" label="Members" />
          <Tab id="settings" label="Settings" />
        </TabList>
        <TabPanel id="overview" className="pt-4 text-sm text-tertiary">
          Tabs use the chunky-shadow secondary treatment for the selected pill.
        </TabPanel>
        <TabPanel id="members" className="pt-4 text-sm text-tertiary">
          Team roster and roles.
        </TabPanel>
        <TabPanel id="settings" className="pt-4 text-sm text-tertiary">
          Preferences and integrations.
        </TabPanel>
      </Tabs>
    </Tile>
  )
}

function ButtonsTile({ className }: { className?: string }) {
  return (
    <Tile className={cx('items-center justify-center gap-3', className)}>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button color="primary">Primary</Button>
        <Button color="secondary">Secondary</Button>
        <Button color="primary" iconLeading={Plus} aria-label="Add" />
      </div>
    </Tile>
  )
}

function InputsTile({ className }: { className?: string }) {
  return (
    <Tile className={cx('justify-center gap-3', className)}>
      <Input label="Email" icon={Mail01} placeholder="olivia@untitledui.com" />
      <Input label="Search" icon={SearchLg} placeholder="Search" shortcut="⌘K" />
    </Tile>
  )
}

function SelectionTile({ className }: { className?: string }) {
  return (
    <Tile className={cx('justify-center gap-4', className)}>
      <Checkbox label="Remember me" defaultSelected />
      <Toggle label="Email notifications" defaultSelected />
      <Toggle label="Weekly digest" />
    </Tile>
  )
}

function ProgressTile({ className }: { className?: string }) {
  const [value, setValue] = useState<number | number[]>([40])
  return (
    <Tile className={cx('justify-center gap-5', className)}>
      <Slider minValue={0} maxValue={100} value={value} onChange={setValue} />
      <ProgressBar value={68} labelPosition="right" />
    </Tile>
  )
}

function DarkModeTile({ className }: { className?: string }) {
  const [isDark, setIsDark] = useState(
    () =>
      typeof document !== 'undefined' &&
      document.documentElement.classList.contains('dark-mode'),
  )

  useEffect(() => {
    document.documentElement.classList.toggle('dark-mode', isDark)
  }, [isDark])

  return (
    <Tile
      className={cx(
        'items-center justify-center gap-4 text-center',
        className,
      )}
    >
      <FeaturedIcon
        icon={isDark ? Moon01 : Sun}
        color="brand"
        theme="modern"
        size="lg"
      />
      <Toggle
        size="md"
        isSelected={isDark}
        onChange={setIsDark}
        label={isDark ? 'Dark' : 'Light'}
      />
    </Tile>
  )
}

function ConfirmDialogContent({ close }: { close: () => void }) {
  return (
    <div className="relative flex w-full max-w-md flex-col overflow-hidden rounded-2xl bg-primary shadow-xl outline-hidden">
      <div className="flex w-full items-start gap-2 py-3 pr-3 pl-6">
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <h2 className="text-md font-semibold text-primary">
            Project published
          </h2>
          <p className="text-sm text-tertiary">Your changes are live.</p>
        </div>
        <CloseButton
          size="sm"
          onPress={close}
          className="rounded-full bg-tertiary hover:bg-quaternary"
        />
      </div>
      <div className="h-px w-full bg-border-secondary" />
      <p className="px-6 py-5 text-sm text-tertiary">
        Team members can now view and edit this project.
      </p>
      <div className="flex w-full gap-3 px-6 pt-2 pb-6">
        <Button color="secondary" onClick={close}>
          Dismiss
        </Button>
        <Button color="primary" className="flex-1" onClick={close}>
          View project
        </Button>
      </div>
    </div>
  )
}

function DestructiveDialogContent({ close }: { close: () => void }) {
  return (
    <div className="relative flex w-full max-w-md flex-col overflow-hidden rounded-2xl bg-primary shadow-xl outline-hidden">
      <div className="flex flex-col gap-4 p-6">
        <FeaturedIcon
          icon={AlertTriangle}
          color="error"
          theme="light"
          size="lg"
        />
        <div>
          <h2 className="text-md font-semibold text-primary">
            Delete project?
          </h2>
          <p className="text-sm text-tertiary">This action cannot be undone.</p>
        </div>
      </div>
      <div className="flex w-full gap-3 px-6 pb-6">
        <Button color="secondary" onClick={close}>
          Cancel
        </Button>
        <Button color="primary-destructive" className="flex-1" onClick={close}>
          Delete
        </Button>
      </div>
    </div>
  )
}

function MoreDialogsTile({ className }: { className?: string }) {
  return (
    <Tile className={cx('items-center justify-center gap-3', className)}>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <DialogTrigger>
          <Button color="primary">Confirm</Button>
          <ModalOverlay isDismissable>
            <Modal>
              <Dialog>
                {({ close }) => <ConfirmDialogContent close={close} />}
              </Dialog>
            </Modal>
          </ModalOverlay>
        </DialogTrigger>
        <DialogTrigger>
          <Button color="secondary-destructive" iconLeading={Trash01}>
            Delete
          </Button>
          <ModalOverlay isDismissable>
            <Modal>
              <Dialog>
                {({ close }) => <DestructiveDialogContent close={close} />}
              </Dialog>
            </Modal>
          </ModalOverlay>
        </DialogTrigger>
      </div>
    </Tile>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-secondary px-3 py-6 md:px-6 md:py-10">
      <main className="mx-auto flex max-w-7xl flex-col gap-3">
        {/* Hero row: hero + 4 stats in a 2x2 */}
        <section className="grid grid-cols-12 gap-3 md:auto-rows-fr md:grid-rows-2">
          <HeroTile className="col-span-12 md:col-span-7 md:row-span-2" />
          <StatTile
            className="col-span-6 md:col-span-3"
            caption="Up to"
            stat="12"
            sub="components"
          />
          <StatTile
            className="col-span-6 md:col-span-2"
            caption="WCAG"
            stat="AA"
          />
          <StatTile
            className="col-span-6 md:col-span-3"
            caption="Latest"
            stat="v0.2"
          />
          <StatTile
            className="col-span-6 md:col-span-2"
            caption="Tailwind"
            stat="v4"
          />
        </section>

        {/* Featured demos */}
        <section className="grid grid-cols-12 gap-3">
          <ChunkyChipTile className="col-span-12 md:col-span-3" />
          <FeaturedDialogTile className="col-span-12 md:col-span-5" />
          <TabsTile className="col-span-12 md:col-span-4" />
        </section>

        {/* Component demos */}
        <section className="grid grid-cols-12 gap-3">
          <ButtonsTile className="col-span-6 md:col-span-3" />
          <InputsTile className="col-span-12 md:col-span-3" />
          <SelectionTile className="col-span-6 md:col-span-3" />
          <ProgressTile className="col-span-12 md:col-span-3" />
        </section>

        {/* Footer row */}
        <section className="grid grid-cols-12 gap-3">
          <DarkModeTile className="col-span-6 md:col-span-4" />
          <MoreDialogsTile className="col-span-6 md:col-span-4" />
          <StatTile
            className="col-span-12 md:col-span-4"
            caption="Corner radius"
            stat="8px"
          />
        </section>
      </main>
    </div>
  )
}

export default App
