import { Accordion, type AccordionSize } from '@monority/ui/accordion'
import { useEffect, useState } from 'react'
import { ComponentPlayground } from '../ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import { accordionI18n } from './Accordion.messages'
import {
    AccordionCollapsibleExample,
    AccordionCompoundExample,
    AccordionMultipleExample,
    AccordionWithItemsExample,
} from './Accordion.examples'

const accordionDemoItems = [
    {
        value: 'item-1',
        title: 'CSS Architecture & Tokens',
        content: (
            <p style={{ margin: 0 }}>
                Styles are encapsulated in the mr.components layer with zero specificity collision.
            </p>
        ),
    },
    {
        value: 'item-2',
        title: 'WAI-ARIA Accessibility',
        content: (
            <p style={{ margin: 0 }}>
                Smooth keyboard navigation with roving tabindex, arrow keys, and Home/End.
            </p>
        ),
    },
    {
        value: 'item-3',
        title: 'Customization & Density',
        content: (
            <p style={{ margin: 0 }}>
                Sizes sm, md, and lg with proportional spacing and fluid CSS Grid transitions.
            </p>
        ),
    },
]

function AccordionPlaygroundContent({
    apiMode,
    size,
    activeItem,
    collapsible,
    allowMultiple,
}: {
    apiMode: 'compound' | 'items'
    size: AccordionSize
    activeItem: string
    collapsible: boolean
    allowMultiple: boolean
}) {
    const [value, setValue] = useState<string | string[]>(() =>
        activeItem === 'none' ? [] : [activeItem]
    )

    useEffect(() => {
        setValue(activeItem === 'none' ? [] : [activeItem])
    }, [activeItem])

    if (apiMode === 'items') {
        return (
            <div style={{ width: '100%', maxWidth: 540 }}>
                <Accordion
                    size={size}
                    collapsible={collapsible}
                    allowMultiple={allowMultiple}
                    value={value}
                    onValueChange={setValue}
                    items={accordionDemoItems}
                />
            </div>
        )
    }

    return (
        <div style={{ width: '100%', maxWidth: 540 }}>
            <Accordion
                size={size}
                collapsible={collapsible}
                allowMultiple={allowMultiple}
                value={value}
                onValueChange={setValue}
            >
                <Accordion.Item value="item-1">
                    <Accordion.Trigger>CSS Architecture & Tokens</Accordion.Trigger>
                    <Accordion.Content>
                        <p style={{ margin: 0 }}>
                            Styles are encapsulated in the mr.components layer with zero specificity
                            collision.
                        </p>
                    </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item value="item-2">
                    <Accordion.Trigger>WAI-ARIA Accessibility</Accordion.Trigger>
                    <Accordion.Content>
                        <p style={{ margin: 0 }}>
                            Smooth keyboard navigation with roving tabindex, arrow keys, and
                            Home/End.
                        </p>
                    </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item value="item-3">
                    <Accordion.Trigger>Customization & Density</Accordion.Trigger>
                    <Accordion.Content>
                        <p style={{ margin: 0 }}>
                            Sizes sm, md, and lg with proportional spacing and fluid CSS Grid
                            transitions.
                        </p>
                    </Accordion.Content>
                </Accordion.Item>
            </Accordion>
        </div>
    )
}

function AccordionPlayground() {
    return (
        <ComponentPlayground
            title="Accordion"
            description="Customize the API structure, size, and expansion behavior of the accordion."
            controls={[
                {
                    type: 'select',
                    prop: 'apiMode',
                    label: 'API mode',
                    defaultValue: 'compound',
                    options: [
                        { value: 'compound', label: 'Compound API' },
                        { value: 'items', label: 'Items prop (shorthand)' },
                    ],
                },
                {
                    type: 'select',
                    prop: 'size',
                    label: 'Size',
                    defaultValue: 'md',
                    options: [
                        { value: 'sm', label: 'Small (sm)' },
                        { value: 'md', label: 'Medium (md)' },
                        { value: 'lg', label: 'Large (lg)' },
                    ],
                },
                {
                    type: 'select',
                    prop: 'activeItem',
                    label: 'Expanded section',
                    defaultValue: 'item-1',
                    options: [
                        { value: 'item-1', label: 'Section 1 (Architecture)' },
                        { value: 'item-2', label: 'Section 2 (Accessibility)' },
                        { value: 'item-3', label: 'Section 3 (Density)' },
                        { value: 'none', label: 'None (collapsed)' },
                    ],
                },
                {
                    type: 'boolean',
                    prop: 'collapsible',
                    label: 'Collapsible',
                    defaultValue: true,
                },
                {
                    type: 'boolean',
                    prop: 'allowMultiple',
                    label: 'Allow multiple',
                    defaultValue: false,
                },
            ]}
            renderCode={(props) => {
                const sizeAttr = props.size !== 'md' ? `\n  size="${props.size}"` : ''
                const collAttr = props.collapsible ? '\n  collapsible' : ''
                const multAttr = props.allowMultiple ? '\n  allowMultiple' : ''
                const valAttr =
                    props.activeItem && props.activeItem !== 'none'
                        ? `\n  defaultValue="${props.activeItem}"`
                        : ''

                if (props.apiMode === 'items') {
                    return `<Accordion${sizeAttr}${collAttr}${multAttr}${valAttr}
  items={[
    { value: 'item-1', title: 'CSS Architecture & Tokens', content: '...' },
    { value: 'item-2', title: 'WAI-ARIA Accessibility', content: '...' },
    { value: 'item-3', title: 'Customization & Density', content: '...' },
  ]}
/>`
                }

                return `<Accordion${sizeAttr}${collAttr}${multAttr}${valAttr}>
  <Accordion.Item value="item-1">
    <Accordion.Trigger>CSS Architecture & Tokens</Accordion.Trigger>
    <Accordion.Content>
      Styles are encapsulated in the mr.components layer with zero specificity collision.
    </Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="item-2">
    <Accordion.Trigger>WAI-ARIA Accessibility</Accordion.Trigger>
    <Accordion.Content>
      Smooth keyboard navigation with roving tabindex, arrow keys, and Home/End.
    </Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="item-3">
    <Accordion.Trigger>Customization & Density</Accordion.Trigger>
    <Accordion.Content>
      Sizes sm, md, and lg with proportional spacing and fluid CSS Grid transitions.
    </Accordion.Content>
  </Accordion.Item>
</Accordion>`
            }}
        >
            {(props) => (
                <AccordionPlaygroundContent
                    apiMode={(props.apiMode as 'compound' | 'items') || 'compound'}
                    size={props.size as AccordionSize}
                    activeItem={(props.activeItem as string) || 'item-1'}
                    collapsible={props.collapsible as boolean}
                    allowMultiple={props.allowMultiple as boolean}
                />
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
            key: 'Enter / Space',
            action: 'Expands or collapses the targeted section.',
            context: 'Focus on section header',
        },
        {
            key: 'ArrowDown',
            action: 'Moves focus to the next trigger (with wrapping).',
            context: 'Focus on section header',
        },
        {
            key: 'ArrowUp',
            action: 'Moves focus to the previous trigger (with wrapping).',
            context: 'Focus on section header',
        },
        {
            key: 'Home',
            action: 'Moves focus to the first trigger.',
            context: 'Focus on section header',
        },
        {
            key: 'End',
            action: 'Moves focus to the last trigger.',
            context: 'Focus on section header',
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
    i18n: accordionI18n,
}

export function AccordionDocs() {
    return <DocPage doc={docData} />
}
