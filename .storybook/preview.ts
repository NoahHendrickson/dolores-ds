import type { Preview } from '@storybook/react-vite'
import { withThemeByClassName } from '@storybook/addon-themes'
import '@/styles/globals.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      expanded: true,
    },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
    docs: {
      toc: true,
    },
    backgrounds: { disable: true },
  },
  decorators: [
    withThemeByClassName({
      themes: {
        light: '',
        dark: 'dark-mode',
      },
      defaultTheme: 'light',
      parentSelector: 'html',
    }),
  ],
  tags: ['autodocs'],
}

export default preview
