import { Button } from '@monority/ui/button'
import { HoverCard } from '@monority/ui/hover-card'
import { Stack } from '@monority/ui/stack'
import { Text } from '@monority/ui/text'
import { useState } from 'react'
import { ComponentPlayground } from '../../components/ComponentPlayground/ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import {
    HoverCardControlledExample,
    HoverCardCustomDelayExample,
    HoverCardSidesExample,
} from './HoverCard.examples'

function HoverCardPlayground() {
    const [side, setSide] = useState<'top' | 'bottom' | 'left' | 'right'>('bottom')
    const [align, setAlign] = useState<'start' | 'center' | 'end'>('center')
    const [arrow, setArrow] = useState(true)

    const snippet = `<HoverCard side="${side}" align="${align}"${!arrow ? '\n  arrow={false}' : ''}>
  <HoverCard.Trigger>
    <Button variant="secondary">@monority/ui</Button>
  </HoverCard.Trigger>
  <HoverCard.Content>
    <Stack gap="xs">
      <Text.Strong size="sm">Monority UI</Text.Strong>
      <Text.Muted size="sm">
        Bibliothèque de composants React 19 pilotée par les design tokens CSS natifs.
      </Text.Muted>
    </Stack>
  </HoverCard.Content>
</HoverCard>`

    return (
        <ComponentPlayground
            controls={[
                {
                    type: 'select',
                    label: 'Position (side)',
                    value: side,
                    options: [
                        { value: 'bottom', label: 'Bas (bottom)' },
                        { value: 'top', label: 'Haut (top)' },
                        { value: 'left', label: 'Gauche (left)' },
                        { value: 'right', label: 'Droite (right)' },
                    ],
                    onChange: (v) => setSide(v as 'top' | 'bottom' | 'left' | 'right'),
                },
                {
                    type: 'select',
                    label: 'Alignement (align)',
                    value: align,
                    options: [
                        { value: 'center', label: 'Centre (center)' },
                        { value: 'start', label: 'Début (start)' },
                        { value: 'end', label: 'Fin (end)' },
                    ],
                    onChange: (v) => setAlign(v as 'start' | 'center' | 'end'),
                },
                {
                    type: 'boolean',
                    label: 'Flèche indicatrice (arrow)',
                    value: arrow,
                    onChange: setArrow,
                },
            ]}
            codeSnippet={snippet}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: 180,
                }}
            >
                <HoverCard side={side} align={align} arrow={arrow}>
                    <HoverCard.Trigger>
                        <Button variant="secondary">@monority/ui</Button>
                    </HoverCard.Trigger>
                    <HoverCard.Content>
                        <Stack gap="xs" style={{ maxWidth: 240 }}>
                            <Text.Strong size="sm">Monority UI</Text.Strong>
                            <Text.Muted size="sm">
                                Bibliothèque de composants React 19 pilotée par les design tokens
                                CSS natifs.
                            </Text.Muted>
                        </Stack>
                    </HoverCard.Content>
                </HoverCard>
            </div>
        </ComponentPlayground>
    )
}

const docData: DocPageData = {
    title: 'HoverCard',
    description:
        'A hover-triggered detail card for previews, supporting metadata, and compact contextual information.',
    importCode: "import { HoverCard } from '@monority/ui'",
    usageCode: `<HoverCard>
  <HoverCard.Trigger>
    <Button>Preview note</Button>
  </HoverCard.Trigger>
  <HoverCard.Content>
    <Stack gap="xs">
      <Text.Strong size="sm">Release note</Text.Strong>
      <Text.Muted size="sm">Hover cards provide compact supporting detail.</Text.Muted>
    </Stack>
  </HoverCard.Content>
</HoverCard>`,
    preview: () => <HoverCardPlayground />,
    examples: [
        { title: 'Custom delay', content: <HoverCardCustomDelayExample /> },
        { title: 'Sides', content: <HoverCardSidesExample /> },
        { title: 'Controlled', content: <HoverCardControlledExample /> },
    ],
    props: [
        {
            name: 'children',
            type: 'ReactNode',
            defaultValue: '-',
            description: 'Trigger element or compound subcomponents.',
        },
        {
            name: 'content',
            type: 'ReactNode',
            defaultValue: '-',
            description: 'Card content rendered in portal (shorthand mode).',
        },
        {
            name: 'openDelay',
            type: 'number',
            defaultValue: '300',
            description: 'Delay in ms before showing the card.',
        },
        {
            name: 'closeDelay',
            type: 'number',
            defaultValue: '150',
            description: 'Delay in ms before hiding the card.',
        },
        {
            name: 'side',
            type: "'top' | 'bottom' | 'left' | 'right'",
            defaultValue: "'bottom'",
            description: 'Side of the trigger to position the card.',
        },
        {
            name: 'align',
            type: "'start' | 'center' | 'end'",
            defaultValue: "'center'",
            description: 'Alignment along the side.',
        },
        {
            name: 'sideOffset',
            type: 'number',
            defaultValue: '8',
            description: 'Distance in px from the trigger.',
        },
        {
            name: 'defaultOpen',
            type: 'boolean',
            defaultValue: 'false',
            description: 'Initial open state for uncontrolled.',
        },
        { name: 'open', type: 'boolean', defaultValue: '-', description: 'Controlled open state.' },
        {
            name: 'onOpenChange',
            type: '(open: boolean) => void',
            defaultValue: '-',
            description: 'Callback when open state changes.',
        },
        {
            name: 'arrow',
            type: 'boolean',
            defaultValue: 'true',
            description: 'Show arrow pointing to trigger.',
        },
        {
            name: 'contentClassName',
            type: 'string',
            defaultValue: '-',
            description: 'Additional className for the card content.',
        },
    ],
    cssHooks: [
        '.mr-hovercard',
        '.mr-hovercard__trigger',
        '.mr-hovercard__content',
        '.mr-hovercard__arrow',
        '[data-open]',
        '[data-side]',
        '[data-align]',
    ],
    tokens: [
        '--mr-bg-raised',
        '--mr-border-subtle',
        '--mr-shadow-md',
        '--mr-radius-md',
        '--mr-font-size-sm',
    ],
    a11y: [
        'Opens on hover with configurable delay.',
        'Card has role="dialog" for screen readers.',
        'Closes on mouse leave from trigger or card.',
        'Positioning recalculates on scroll and resize.',
    ],
}

export function HoverCardDocs() {
    return <DocPage doc={docData} />
}
