import { DocPage, type DocPageData } from '../DocPage'
import {
  CollapsibleBasicExample,
  CollapsibleDefaultOpenExample,
  CollapsibleControlledExample,
  CollapsibleSizesExample,
} from './Collapsible.examples'

const docData: DocPageData = {
  title: 'Collapsible',
  description: 'A standalone collapsible/expandable content panel.',
  importCode: "import { Collapsible } from '@monority/ui'",
  usageCode: `<Collapsible title="Section title">
  <p>Collapsible content goes here.</p>
</Collapsible>`,
  preview: () => <CollapsibleBasicExample />,
  examples: [
    { title: 'Default open', content: <CollapsibleDefaultOpenExample /> },
    { title: 'Controlled', content: <CollapsibleControlledExample /> },
    { title: 'Sizes', content: <CollapsibleSizesExample /> },
  ],
  props: [
    { name: 'title', type: 'ReactNode', defaultValue: '-', description: 'Trigger button content.' },
    { name: 'children', type: 'ReactNode', defaultValue: '-', description: 'Collapsible panel content.' },
    { name: 'defaultOpen', type: 'boolean', defaultValue: 'false', description: 'Default expanded state.' },
    { name: 'open', type: 'boolean', defaultValue: '-', description: 'Controlled expanded state.' },
    { name: 'onOpenChange', type: '(open: boolean) => void', defaultValue: '-', description: 'Open state change callback.' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", defaultValue: "'md'", description: 'Component size.' },
  ],
  cssHooks: [
    '.mr-collapsible', '.mr-collapsible__trigger', '.mr-collapsible__panel', '.mr-collapsible__content', '[data-open]',
  ],
  tokens: [
    '--mr-border-subtle', '--mr-radius-md', '--mr-space-3', '--mr-space-4', '--mr-fg-strong', '--mr-fg-muted', '--mr-duration-fast', '--mr-duration-normal',
  ],
  a11y: [
    'Trigger button has aria-expanded.',
    'Panel has role="region" and aria-labelledby.',
    'aria-controls links trigger to panel.',
    'Keyboard accessible (Enter/Space to toggle).',
  ],
}

export function CollapsibleDocs() {
  return <DocPage doc={docData} />
}
