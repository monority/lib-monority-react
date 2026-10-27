import { Button } from '@monority/ui/button'
import { Tooltip } from '@monority/ui/tooltip'
import { useState } from 'react'
import { ComponentPlayground } from '../ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import { tooltipI18n } from './Tooltip.messages'
import { TooltipOnIconButtonExample, TooltipWithRichContentExample } from './Tooltip.examples'

function TooltipPlayground() {
    const [side, setSide] = useState<'top' | 'bottom' | 'left' | 'right'>('top')
    const [arrow, setArrow] = useState(true)
    const [content, setContent] = useState('View token details')

    const snippet = `<Tooltip side="${side}"${arrow ? '\n  arrow' : ''}>
  <Tooltip.Trigger>
    <Button variant="secondary">Hover me</Button>
  </Tooltip.Trigger>
  <Tooltip.Content>${content}</Tooltip.Content>
</Tooltip>`

    return (
        <ComponentPlayground
            controls={[
                {
                    type: 'select',
                    label: 'Position (side)',
                    value: side,
                    options: [
                        { value: 'top', label: 'Top' },
                        { value: 'bottom', label: 'Bottom' },
                        { value: 'left', label: 'Left' },
                        { value: 'right', label: 'Right' },
                    ],
                    onChange: (v) => setSide(v as 'top' | 'bottom' | 'left' | 'right'),
                },
                {
                    type: 'boolean',
                    label: 'Arrow indicator',
                    value: arrow,
                    onChange: setArrow,
                },
                {
                    type: 'text',
                    label: 'Tooltip text',
                    value: content,
                    onChange: setContent,
                },
            ]}
            codeSnippet={snippet}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: 140,
                }}
            >
                <Tooltip side={side} arrow={arrow}>
                    <Tooltip.Trigger>
                        <Button variant="secondary">Hover me</Button>
                    </Tooltip.Trigger>
                    <Tooltip.Content>{content}</Tooltip.Content>
                </Tooltip>
            </div>
        </ComponentPlayground>
    )
}

const docData: DocPageData = {
    title: 'Tooltip',
    description: 'A lightweight hover and focus hint for terse contextual labels.',
    importCode: "import { Tooltip } from '@monority/ui/tooltip'",
    usageCode: `<Tooltip>
  <Tooltip.Trigger>
    <Button>Hover me</Button>
  </Tooltip.Trigger>
  <Tooltip.Content>Inspect token details</Tooltip.Content>
</Tooltip>`,
    preview: () => <TooltipPlayground />,
    examples: [
        { title: 'Rich content', content: <TooltipWithRichContentExample /> },
        { title: 'On icon button', content: <TooltipOnIconButtonExample /> },
    ],
    props: [
        {
            name: 'content',
            type: `ReactNode`,
            defaultValue: '-',
            description: 'Tooltip content (shorthand mode).',
        },
        {
            name: 'children',
            type: `ReactNode`,
            defaultValue: '-',
            description: 'Trigger element or compound subcomponents.',
        },
        {
            name: 'side',
            type: `'top' | 'bottom' | 'left' | 'right'`,
            defaultValue: "'top'",
            description: 'Preferred side.',
        },
        {
            name: 'arrow',
            type: `boolean`,
            defaultValue: 'false',
            description: 'Show arrow indicator.',
        },
        {
            name: 'delayMs',
            type: `number`,
            defaultValue: '0',
            description: 'Appearance transition delay in ms.',
        },
    ],
    cssHooks: [
        '.mr-tooltip',
        '.mr-tooltip__trigger',
        '.mr-tooltip__content',
        '[data-hidden]',
        '[data-side]',
        '[data-arrow]',
    ],
    tokens: [
        '--mr-bg-surface-strong',
        '--mr-text-primary',
        '--mr-font-size-xs',
        '--mr-radius-sm',
        '--mr-shadow-sm',
    ],
    keyboardNavigation: [
        { key: 'Tab', action: 'Moves focus to the trigger and shows the tooltip' },
        { key: 'Escape', action: 'Hides the tooltip immediately without moving focus' },
    ],
    a11y: [
        'Tooltip ARIA pattern (role="tooltip").',
        'aria-describedby on trigger.',
        'Appears on focus/hover.',
        'Escape dismisses the tooltip until the pointer leaves or focus moves.',
        'Positioned above the trigger via CSS; no viewport collision engine.',
        'The tooltip itself is passive and not interactive.',
    ],
    i18n: tooltipI18n,
}

export function TooltipDocs() {
    return <DocPage doc={docData} />
}
