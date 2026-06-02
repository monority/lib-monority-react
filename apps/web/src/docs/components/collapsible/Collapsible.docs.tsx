import { DocPage, type DocPageData } from '../DocPage'
import {
  CollapsibleBasicExample,
  CollapsibleDefaultOpenExample,
  CollapsibleControlledExample,
  CollapsibleSizesExample,
} from './Collapsible.examples'

const docData: DocPageData = {
  title: 'Collapsible',
  description: 'A standalone expandable panel for secondary details, migration notes, and inline help.',
  importCode: "import { Collapsible } from '@monority/ui'",
  usageCode: `<Collapsible title="Release notes summary">
  <p>This panel can reveal supporting context without taking over the page.</p>
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
    '.mr-collapsible',
    '.mr-collapsible__trigger',
    '.mr-collapsible__label',
    '.mr-collapsible__icon',
    '.mr-collapsible__panel',
    '.mr-collapsible__content',
    '[data-open]',
  ],
  tokens: [
    '--mr-bg-surface-elevated',
    '--mr-bg-surface-strong',
    '--mr-bg-accent-soft',
    '--mr-border-subtle',
    '--mr-radius-md',
    '--mr-shadow-xs',
  ],
  a11y: [
    'The trigger button exposes aria-expanded and aria-controls.',
    'The panel uses role="region" and is labelled by the trigger.',
    'Keyboard access works with Enter and Space through the native button.',
  ],
}

export function CollapsibleDocs() {
  return <DocPage doc={docData} />
}
