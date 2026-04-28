import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { useState } from 'react'
import {
  PaginationButtonGroup,
  PaginationCardAdvanced,
  PaginationCardDefault,
  PaginationCardMinimal,
  PaginationPageDefault,
  PaginationPageMinimalCenter,
} from './pagination'
import { PaginationDot } from './pagination-dot'
import { PaginationLine } from './pagination-line'

const meta = {
  title: 'Application/Pagination',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Pagination components — six page-controls variants (`PaginationPageDefault`, `PaginationPageMinimalCenter`, `PaginationCardDefault`, `PaginationCardMinimal`, `PaginationButtonGroup`, `PaginationCardAdvanced`) plus dot/line indicators (`PaginationDot`, `PaginationLine`). All wrap a headless `Pagination.Root` from `pagination-base`.',
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const Stateful = ({
  Component,
  total = 10,
  ...rest
}: {
  Component: React.ComponentType<{ page: number; total: number; onPageChange: (page: number) => void } & Record<string, unknown>>
  total?: number
} & Record<string, unknown>) => {
  const [page, setPage] = useState(1)
  return <Component page={page} total={total} onPageChange={setPage} {...rest} />
}

export const PageDefault: Story = {
  render: () => (
    <div className="w-full max-w-3xl">
      <Stateful Component={PaginationPageDefault} />
    </div>
  ),
}

export const PageMinimalCenter: Story = {
  render: () => (
    <div className="w-full max-w-3xl">
      <Stateful Component={PaginationPageMinimalCenter} />
    </div>
  ),
}

export const CardDefault: Story = {
  render: () => (
    <div className="w-full max-w-3xl rounded-xl border border-secondary bg-primary">
      <div className="p-6 text-sm text-tertiary">Card body</div>
      <Stateful Component={PaginationCardDefault} />
    </div>
  ),
}

export const CardMinimal: Story = {
  render: () => {
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    return (
      <div className="w-full max-w-3xl rounded-xl border border-secondary bg-primary">
        <div className="p-6 text-sm text-tertiary">Card body</div>
        <PaginationCardMinimal
          page={page}
          total={10}
          pageSize={pageSize}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
        />
      </div>
    )
  },
}

export const ButtonGroupVariant: Story = {
  render: () => (
    <div className="w-full max-w-3xl rounded-xl border border-secondary bg-primary">
      <div className="p-6 text-sm text-tertiary">Card body</div>
      <Stateful Component={PaginationButtonGroup} />
    </div>
  ),
}

export const CardAdvanced: Story = {
  render: () => {
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    return (
      <div className="w-full max-w-3xl rounded-xl border border-secondary bg-primary">
        <div className="p-6 text-sm text-tertiary">Card body</div>
        <PaginationCardAdvanced
          page={page}
          total={10}
          pageSize={pageSize}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
        />
      </div>
    )
  },
}

export const Dot: Story = {
  args: { onClick: fn() },
  render: () => {
    const [page, setPage] = useState(1)
    return <PaginationDot page={page} total={5} onPageChange={setPage} />
  },
}

export const DotBrand: Story = {
  render: () => {
    const [page, setPage] = useState(1)
    return (
      <div className="rounded-xl bg-brand-solid p-6">
        <PaginationDot page={page} total={5} isBrand onPageChange={setPage} />
      </div>
    )
  },
}

export const Line: Story = {
  render: () => {
    const [page, setPage] = useState(1)
    return (
      <div className="w-80">
        <PaginationLine page={page} total={5} onPageChange={setPage} />
      </div>
    )
  },
}
