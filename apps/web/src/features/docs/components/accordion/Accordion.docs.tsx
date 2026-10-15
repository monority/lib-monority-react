import { DocPage, type DocPageData } from '../DocPage'
import {
    AccordionBasicExample,
    AccordionWithItemsExample,
    AccordionMultipleExample,
    AccordionCollapsibleExample,
    AccordionCompoundExample,
} from './Accordion.examples'

const docData: DocPageData = {
    title: 'Accordion',
    description:
        'Grouped expandable sections for FAQs, release notes, and dense supporting content.',
    importCode: "import { Accordion } from '@monority/ui/accordion'",
    usageCode: `// Declarative Compound API
<Accordion defaultValue="item-1">
  <Accordion.Item value="item-1">
    <Accordion.Trigger>Is it accessible?</Accordion.Trigger>
    <Accordion.Content>
      Yes. It adheres to the WAI-ARIA design pattern with roving tabindex.
    </Accordion.Content>
  </Accordion.Item>
</Accordion>`,
    preview: () => <AccordionBasicExample />,
    examples: [
        { title: 'Compound syntax', content: <AccordionCompoundExample /> },
        { title: 'With items', content: <AccordionWithItemsExample /> },
        { title: 'Multiple open', content: <AccordionMultipleExample /> },
        { title: 'Collapsible', content: <AccordionCollapsibleExample /> },
    ],
    props: [
        {
            name: 'items',
            type: `{ value: string; title: ReactNode; content: ReactNode; disabled?: boolean }[]`,
            defaultValue: '[]',
            description: 'Accordion sections. Items accept a disabled flag.',
        },
        {
            name: 'defaultValue',
            type: `string | string[]`,
            defaultValue: '-',
            description: 'Default expanded value(s).',
        },
        {
            name: 'value',
            type: `string | string[]`,
            defaultValue: '-',
            description: 'Controlled expanded value(s).',
        },
        {
            name: 'onChange',
            type: `(value: string | string[]) => void`,
            defaultValue: '-',
            description: 'Expand change callback.',
        },
        {
            name: 'allowMultiple',
            type: `boolean`,
            defaultValue: 'false',
            description: 'Allow multiple sections open.',
        },
        {
            name: 'collapsible',
            type: `boolean`,
            defaultValue: 'false',
            description: 'Allow closing the active section.',
        },
        {
            name: 'size',
            type: `'sm' | 'md' | 'lg'`,
            defaultValue: "'md'",
            description: 'Accordion size.',
        },
    ],
    cssHooks: [
        '.mr-accordion',
        '.mr-accordion__item',
        '.mr-accordion__trigger',
        '.mr-accordion__label',
        '.mr-accordion__icon',
        '.mr-accordion__panel',
        '.mr-accordion__body',
        '.mr-accordion__content',
        '[data-open]',
    ],
    tokens: [
        '--mr-bg-raised',
        '--mr-bg-surface-strong',
        '--mr-accent-subtle',
        '--mr-border-subtle',
        '--mr-shadow-xs',
        '--mr-radius-md',
    ],
    a11y: [
        'Each trigger exposes aria-expanded and aria-controls.',
        'Each panel is labelled by its trigger through aria-labelledby.',
        'Buttons remain keyboard accessible with Enter and Space.',
        'Triggers use a roving tabindex.',
        'ArrowUp / ArrowDown move between triggers (wrapping); Home / End jump to first / last.',
        'Disabled items are skipped by keyboard navigation and cannot be toggled.',
        'Fluid animation is driven by CSS Grid (grid-template-rows: 0fr -> 1fr) with zero residual height when closed.',
    ],
}

export function AccordionDocs() {
    return <DocPage doc={docData} />
}
