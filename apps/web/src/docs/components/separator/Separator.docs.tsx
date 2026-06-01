import { SeparatorBasicExample, SeparatorVerticalExample, SeparatorDecorativeExample } from './Separator.examples'
import { DocPage, type DocPageData } from '../DocPage'

const docData: DocPageData = {
  title: 'Separator',
  description: 'Lightweight visual separator for horizontal or vertical content division.',
  importCode: "import { Separator } from '@monority/ui'",
  usageCode: '<Separator />',
  preview: () => <SeparatorBasicExample />,
  examples: [
    { title: 'Vertical', content: <SeparatorVerticalExample /> },
    { title: 'Decorative', content: <SeparatorDecorativeExample /> },
  ],
  props: [
    { name: 'orientation', type: "'horizontal' | 'vertical'", defaultValue: "'horizontal'", description: 'Orientation of the separator.' },
    { name: 'decorative', type: 'boolean', defaultValue: 'false', description: 'When true, uses role="presentation" instead of role="separator".' },
  ],
  cssHooks: [
    '.mr-separator',
    '.mr-separator--horizontal',
    '.mr-separator--vertical',
    '[data-orientation="horizontal"]',
    '[data-orientation="vertical"]',
  ],
  tokens: [
    '--mr-border-subtle',
  ],
  a11y: [
    'Horizontal <hr> is natively semantic; no role needed.',
    'Vertical uses role="separator" + aria-orientation by default.',
    'decorative={true} switches to role="presentation" for purely visual separators.',
  ],
}

export function SeparatorDocs() {
  return <DocPage doc={docData} />
}
