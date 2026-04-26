import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { Selection } from 'react-aria-components'
import { fn } from 'storybook/test'
import { MultiSelect } from './multi-select'

const items = [
  { id: 'olivia', label: 'Olivia Rhye', supportingText: 'olivia@untitledui.com' },
  { id: 'phoenix', label: 'Phoenix Baker', supportingText: 'phoenix@untitledui.com' },
  { id: 'lana', label: 'Lana Steiner', supportingText: 'lana@untitledui.com' },
  { id: 'demi', label: 'Demi Wilkinson', supportingText: 'demi@untitledui.com' },
  { id: 'candice', label: 'Candice Wu', supportingText: 'candice@untitledui.com' },
  { id: 'natali', label: 'Natali Craig', supportingText: 'natali@untitledui.com' },
  { id: 'drew', label: 'Drew Cano', supportingText: 'drew@untitledui.com' },
]

type Args = {
  size?: 'sm' | 'md' | 'lg'
  label?: string
  hint?: string
  placeholder?: string
  isDisabled?: boolean
  isRequired?: boolean
  isInvalid?: boolean
  showFooter?: boolean
  showSearch?: boolean
  items?: typeof items
  onSelectionChange?: (keys: Selection) => void
}

const meta: Meta<Args> = {
  title: 'Base/Select/MultiSelect',
  component: MultiSelect as never,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    label: { control: 'text' },
    hint: { control: 'text' },
    placeholder: { control: 'text' },
    isDisabled: { control: 'boolean' },
    isRequired: { control: 'boolean' },
    isInvalid: { control: 'boolean' },
    showFooter: { control: 'boolean' },
    showSearch: { control: 'boolean' },
    onSelectionChange: { action: 'selected' },
  },
  args: {
    label: 'Assignees',
    placeholder: 'Select teammates',
    size: 'md',
    showFooter: true,
    showSearch: true,
    items,
    onSelectionChange: fn(),
  },
  render: (args) => {
    const ControlledMultiSelect = () => {
      const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set())

      const handleReset = () => setSelectedKeys(new Set())
      const handleSelectAll = () => setSelectedKeys(new Set(items.map((item) => item.id)))

      return (
        <div className="w-80">
          <MultiSelect
            {...args}
            selectedKeys={selectedKeys}
            onSelectionChange={(keys) => {
              setSelectedKeys(keys)
              args.onSelectionChange?.(keys)
            }}
            onReset={handleReset}
            onSelectAll={handleSelectAll}
          >
            {(item) => (
              <MultiSelect.Item id={item.id} supportingText={item.supportingText} selectionIndicator="checkbox" selectionIndicatorAlign="left">
                {item.label}
              </MultiSelect.Item>
            )}
          </MultiSelect>
        </div>
      )
    }

    return <ControlledMultiSelect />
  },
}

export default meta
type Story = StoryObj<Args>

export const Default: Story = {}
export const WithHint: Story = { args: { hint: 'Select one or more teammates.' } }
export const Disabled: Story = { args: { isDisabled: true } }
export const NoFooter: Story = { args: { showFooter: false } }
export const NoSearch: Story = { args: { showSearch: false } }
