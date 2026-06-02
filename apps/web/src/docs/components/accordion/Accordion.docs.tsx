import { DocPage, type DocPageData } from '../DocPage'
import {
  AccordionBasicExample,
  AccordionWithItemsExample,
  AccordionMultipleExample,
  AccordionCollapsibleExample,
} from './Accordion.examples'

const docData: DocPageData = {
  title: 'Accordion',
  description: 'Grouped expandable sections for FAQs, release notes, and dense supporting content.',
  importCode: "import { Accordion } from '@monority/ui'",
  usageCode: `<Accordion items={[
  { value: 'tokens', title: 'What changed?', content: <p>Updated surfaces and rhythm.</p> },
  { value: 'migration', title: 'How do I migrate?', content: <p>Update shared shells first.</p> },
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
    '.mr-accordion',
    '.mr-accordion__item',
    '.mr-accordion__trigger',
    '.mr-accordion__label',
    '.mr-accordion__icon',
    '.mr-accordion__panel',
    '.mr-accordion__content',
    '[data-open]',
  ],
  tokens: [
    '--mr-bg-surface-elevated',
    '--mr-bg-surface-strong',
    '--mr-bg-accent-soft',
    '--mr-border-subtle',
    '--mr-shadow-xs',
    '--mr-radius-md',
  ],
  a11y: [
    'Each trigger exposes aria-expanded and aria-controls.',
    'Each panel is labelled by its trigger through aria-labelledby.',
    'Buttons remain keyboard accessible with Enter and Space.',
  ],
}

export function AccordionDocs() {
  return <DocPage doc={docData} />
}
