import type { Preview } from '@storybook/nextjs-vite'
import '../src/app/globals.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      expanded: true,
      sort: 'requiredFirst',
    },
    docs: {
      toc: true,
    },
    a11y: {
      test: 'todo',
    },
    options: {
      storySort: {
        order: [
          'Sections',
          [
            'Hero',
            'Features Sections',
            'Value Proposition Sections',
            'Highlight Sections',
            'Comparison Sections',
            'Call to Action',
            'Faq',
            'Footer',
          ],
          'UI',
          'Layout',
        ],
      },
    },
  },
};

export default preview;
