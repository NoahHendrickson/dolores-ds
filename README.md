# @noey-17/dolores-ds

A React design system built on Untitled UI + Tailwind CSS v4. Chunky button shadows, brand-blue palette, light/dark theming, and a Storybook playground.

## Install

```sh
npm install @noey-17/dolores-ds
# peer deps
npm install react react-dom react-aria react-aria-components @react-aria/utils @react-stately/utils @untitledui/icons tailwind-merge
```

## Usage

```tsx
import { Button, Input } from '@noey-17/dolores-ds'
import '@noey-17/dolores-ds/style.css'

export function Example() {
  return (
    <div>
      <Input label="Email" placeholder="olivia@untitledui.com" />
      <Button color="primary">Save</Button>
    </div>
  )
}
```

## Light / dark mode

Toggle the `dark-mode` class on the `<html>` element:

```tsx
document.documentElement.classList.toggle('dark-mode')
```

All color tokens (`bg-primary`, `text-secondary`, `border-brand`, etc.) reflow automatically.

## Components

Buttons (`Button`, `ButtonUtility`, `CloseButton`, `SocialButton`, `ButtonGroup`), Avatar, Badge (+ variants), Checkbox, RadioGroup, Toggle, Input (+ variants), TextArea, Select, MultiSelect, ComboBox, Slider, ProgressBar, Tag, Tooltip, Dropdown, Modal/Dialog. See the Storybook for the full catalog.

## License

MIT — see [Untitled UI's license](https://github.com/untitleduico/react) for the underlying components.
