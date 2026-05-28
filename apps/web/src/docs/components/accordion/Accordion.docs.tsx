import { DocPage, type DocPageData } from '../DocPage'
import {
  AccordionBasicExample,
  AccordionWithItemsExample,
  AccordionMultipleExample,
  AccordionCollapsibleExample,
} from './Accordion.examples'

const docData: DocPageData = {
  title: 'Accordion',
  description: "Expandable and collapsible sections for showing/hiding content.",
  importCode: "import { Accordion } from '@monority/ui'",
  usageCode: `<Accordion items={[
  { title: 'Section 1', content: <p>Content</p> },
  { title: 'Section 2', content: <p>Content</p> },
]} />`,
  preview: () => <AccordionBasicExample />,
  examples: [
    { title: 'With items', content: <AccordionWithItemsExample /> },
    { title: 'Multiple open', content: <AccordionMultipleExample /> },
    { title: 'Collapsible', content: <AccordionCollapsibleExample /> },
  ],
  props: [
    { name: 'items', type: `{ value: string; title: ReactNode; content: ReactNode }[]`, defaultValue: "[]", description: "Accordion sections." },
    { name: 'defaultValue', type: `string | string[]`, defaultValue: "-", description: "Default expanded value(s)." },
    { name: 'value', type: `string | string[]`, defaultValue: "-", description: "Controlled expanded value(s)." },
    { name: 'onChange', type: `(value: string | string[]) => void`, defaultValue: "-", description: "Expand change callback." },
    { name: 'allowMultiple', type: `boolean`, defaultValue: "false", description: "Allow multiple sections open." },
    { name: 'collapsible', type: `boolean`, defaultValue: "false", description: "Allow closing the active section." }
  ],
  cssHooks: [
    '.mr-accordion', '.mr-accordion__trigger', '.mr-accordion__panel', '[data-open]',
  ],
  tokens: [
    '--mr-border-subtle', '--mr-bg-surface', '--mr-fg-base', '--mr-dur-200',
  ],
  a11y: [
    'Accordion ARIA pattern.',
    'aria-expanded on triggers.',
    'aria-controls linking trigger to panel.',
    'Keyboard navigation (Enter/Space to toggle).',
  ],
}

export function AccordionDocs() {
  return <DocPage doc={docData} />
}
