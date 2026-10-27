import { Collapsible } from '@monority/ui/collapsible'
import { Text } from '@monority/ui/text'
import { useEffect, useState } from 'react'
import { ComponentPlayground } from '../ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import { collapsibleI18n } from './Collapsible.messages'
import {
    CollapsibleControlledExample,
    CollapsibleDefaultOpenExample,
    CollapsibleSizesExample,
} from './Collapsible.examples'

function CollapsiblePlaygroundContent({
    apiMode,
    size,
    open: propOpen,
    disabled,
}: {
    apiMode: 'compound' | 'shorthand'
    size: 'sm' | 'md' | 'lg'
    open: boolean
    disabled: boolean
}) {
    const [isOpen, setIsOpen] = useState(propOpen)
    useEffect(() => {
        setIsOpen(propOpen)
    }, [propOpen])

    if (apiMode === 'shorthand') {
        return (
            <div style={{ width: '100%', maxWidth: 480 }}>
                <Collapsible
                    size={size}
                    title="Configuration details"
                    open={isOpen}
                    onOpenChange={setIsOpen}
                    disabled={disabled}
                >
                    <Text size="sm" color="secondary">
                        This animated disclosure panel displays contextual details with fluid CSS
                        Grid transitions.
                    </Text>
                </Collapsible>
            </div>
        )
    }

    return (
        <div style={{ width: '100%', maxWidth: 480 }}>
            <Collapsible size={size} open={isOpen} onOpenChange={setIsOpen} disabled={disabled}>
                <Collapsible.Trigger>Configuration details</Collapsible.Trigger>
                <Collapsible.Content>
                    <Text size="sm" color="secondary">
                        This animated disclosure panel displays contextual details with fluid CSS
                        Grid transitions.
                    </Text>
                </Collapsible.Content>
            </Collapsible>
        </div>
    )
}

function CollapsiblePlayground() {
    return (
        <ComponentPlayground
            title="Collapsible"
            description="Control open/closed state, API mode, size, and disabled mode of the collapsible panel."
            controls={[
                {
                    type: 'select',
                    name: 'apiMode',
                    prop: 'apiMode',
                    label: 'API mode',
                    defaultValue: 'compound',
                    options: [
                        { value: 'compound', label: 'Compound API' },
                        { value: 'shorthand', label: 'Shorthand API' },
                    ],
                },
                {
                    type: 'select',
                    name: 'size',
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
                    type: 'boolean',
                    name: 'open',
                    prop: 'open',
                    label: 'Open',
                    defaultValue: true,
                },
                {
                    type: 'boolean',
                    name: 'disabled',
                    prop: 'disabled',
                    label: 'Disabled',
                    defaultValue: false,
                },
            ]}
            renderCode={(props) => {
                const sizeAttr = props.size !== 'md' ? `\n  size="${props.size}"` : ''
                const openAttr = props.open ? '\n  open' : ''
                const disAttr = props.disabled ? '\n  disabled' : ''

                if (props.apiMode === 'shorthand') {
                    return `<Collapsible
  title="Configuration details"${sizeAttr}${openAttr}${disAttr}
>
  <Text size="sm" color="secondary">
    This animated disclosure panel displays contextual details with fluid CSS Grid transitions.
  </Text>
</Collapsible>`
                }

                return `<Collapsible${sizeAttr}${openAttr}${disAttr}>
  <Collapsible.Trigger>Configuration details</Collapsible.Trigger>
  <Collapsible.Content>
    <Text size="sm" color="secondary">
      This animated disclosure panel displays contextual details with fluid CSS Grid transitions.
    </Text>
  </Collapsible.Content>
</Collapsible>`
            }}
        >
            {(props) => (
                <CollapsiblePlaygroundContent
                    apiMode={(props.apiMode as 'compound' | 'shorthand') || 'compound'}
                    size={props.size as 'sm' | 'md' | 'lg'}
                    open={props.open as boolean}
                    disabled={props.disabled as boolean}
                />
            )}
        </ComponentPlayground>
    )
}

const docData: DocPageData = {
    title: 'Collapsible',
    description:
        'Expandable panel for secondary details, migration notes, and inline product guidance.',
    importCode: "import { Collapsible } from '@monority/ui/collapsible'",
    usageCode: `<Collapsible defaultOpen>
  <Collapsible.Trigger>Release notes summary</Collapsible.Trigger>
  <Collapsible.Content>
    <Text>This panel can reveal supporting context without taking over the page.</Text>
  </Collapsible.Content>
</Collapsible>`,
    preview: () => <CollapsiblePlayground />,
    examples: [
        { title: 'Default open', content: <CollapsibleDefaultOpenExample /> },
        { title: 'Controlled', content: <CollapsibleControlledExample /> },
        { title: 'Sizes', content: <CollapsibleSizesExample /> },
    ],
    props: [
        {
            name: 'title',
            type: 'ReactNode',
            defaultValue: '-',
            description: 'Trigger button content (shorthand mode).',
        },
        {
            name: 'children',
            type: 'ReactNode',
            defaultValue: '-',
            description: 'Collapsible panel content or compound subcomponents.',
        },
        {
            name: 'defaultOpen',
            type: 'boolean',
            defaultValue: 'false',
            description: 'Default expanded state.',
        },
        {
            name: 'open',
            type: 'boolean',
            defaultValue: '-',
            description: 'Controlled expanded state.',
        },
        {
            name: 'onOpenChange',
            type: '(open: boolean) => void',
            defaultValue: '-',
            description: 'Open state change callback.',
        },
        {
            name: 'size',
            type: "'sm' | 'md' | 'lg'",
            defaultValue: "'md'",
            description: 'Component size.',
        },
    ],
    keyboardNavigation: [
        {
            key: 'Tab / Shift + Tab',
            action: 'Moves focus to the collapsible trigger button.',
            context: 'Global navigation',
        },
        {
            key: 'Enter / Space',
            action: 'Toggles the panel between expanded and collapsed states.',
            context: 'Focus on trigger button',
        },
    ],
    cssHooks: [
        '.mr-collapsible',
        '.mr-collapsible__trigger',
        '.mr-collapsible__label',
        '.mr-collapsible__icon',
        '.mr-collapsible__panel',
        '.mr-collapsible__body',
        '.mr-collapsible__content',
        '[data-open]',
        '[data-state]',
    ],
    tokens: [
        '--mr-bg-raised',
        '--mr-bg-surface-strong',
        '--mr-border-subtle',
        '--mr-border-strong',
        '--mr-radius-md',
        '--mr-shadow-xs',
    ],
    a11y: [
        'The trigger button exposes aria-expanded and aria-controls.',
        'The panel uses role="region", aria-hidden, and is labelled by the trigger.',
        'Keyboard access works with Enter and Space through the native button.',
        'Fluid expansion is animated using CSS Grid (grid-template-rows: 0fr -> 1fr) with zero residual height when closed.',
    ],
    i18n: collapsibleI18n,
}

export function CollapsibleDocs() {
    return <DocPage doc={docData} />
}
