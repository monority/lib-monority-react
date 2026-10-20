import { Accordion, type AccordionSize } from '@monority/ui/accordion'
import { ComponentPlayground } from '../ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import {
    AccordionCollapsibleExample,
    AccordionCompoundExample,
    AccordionMultipleExample,
    AccordionWithItemsExample,
} from './Accordion.examples'

const accordionDemoItems = [
    {
        value: 'item-1',
        title: 'Architecture CSS & Tokens',
        content: (
            <p style={{ margin: 0 }}>
                Les styles reposent sur la couche mr.components avec zéro collision de spécificité.
            </p>
        ),
    },
    {
        value: 'item-2',
        title: 'Accessibilité WAI-ARIA',
        content: (
            <p style={{ margin: 0 }}>
                Navigation fluide au clavier avec roving tabindex, touches fléchées et Home/End.
            </p>
        ),
    },
    {
        value: 'item-3',
        title: 'Personnalisation & Densité',
        content: (
            <p style={{ margin: 0 }}>
                Tailles sm, md et lg avec espacements proportionnés et transitions CSS Grid fluides.
            </p>
        ),
    },
]

function AccordionPlayground() {
    return (
        <ComponentPlayground
            title="Accordion"
            description="Personnalisez la taille et le comportement d'ouverture de l'accordéon."
            controls={[
                {
                    type: 'select',
                    prop: 'size',
                    label: 'Taille (size)',
                    defaultValue: 'md',
                    options: [
                        { value: 'sm', label: 'Petite (sm)' },
                        { value: 'md', label: 'Moyenne (md)' },
                        { value: 'lg', label: 'Grande (lg)' },
                    ],
                },
                {
                    type: 'boolean',
                    prop: 'collapsible',
                    label: 'Repliable (collapsible)',
                    defaultValue: true,
                },
                {
                    type: 'boolean',
                    prop: 'allowMultiple',
                    label: 'Multi-sections (allowMultiple)',
                    defaultValue: false,
                },
            ]}
            renderCode={(props) => `<Accordion
  size="${props.size}"${props.collapsible ? '\n  collapsible' : ''}${props.allowMultiple ? '\n  allowMultiple' : ''}
  defaultValue="item-1"
  items={[
    { value: 'item-1', title: 'Architecture CSS & Tokens', content: '...' },
    { value: 'item-2', title: 'Accessibilité WAI-ARIA', content: '...' },
  ]}
/>`}
        >
            {(props) => (
                <div style={{ width: '100%', maxWidth: 540 }}>
                    <Accordion
                        key={`${props.size}-${props.collapsible}-${props.allowMultiple}`}
                        size={props.size as AccordionSize}
                        collapsible={props.collapsible as boolean}
                        allowMultiple={props.allowMultiple as boolean}
                        defaultValue="item-1"
                        items={accordionDemoItems}
                    />
                </div>
            )}
        </ComponentPlayground>
    )
}

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
    preview: () => <AccordionPlayground />,
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
    keyboardNavigation: [
        {
            key: 'Enter / Espace',
            description: 'Développe ou réduit la section ciblée.',
        },
        {
            key: 'Flèche Bas',
            description: 'Déplace le focus vers le déclencheur suivant (avec bouclage).',
        },
        {
            key: 'Flèche Haut',
            description: 'Déplace le focus vers le déclencheur précédent (avec bouclage).',
        },
        {
            key: 'Origine (Home)',
            description: 'Déplace le focus vers le premier déclencheur.',
        },
        {
            key: 'Fin (End)',
            description: 'Déplace le focus vers le dernier déclencheur.',
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
