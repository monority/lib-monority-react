import { DocPage, type DocPageData } from '../DocPage'
import {
    TooltipBasicExample,
    TooltipWithRichContentExample,
    TooltipOnIconButtonExample,
} from './Tooltip.examples'

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
    preview: () => <TooltipBasicExample />,
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
    a11y: [
        'Tooltip ARIA pattern (role="tooltip").',
        'aria-describedby on trigger.',
        'Appears on focus/hover.',
        'Escape dismisses the tooltip until the pointer leaves or focus moves.',
        'Positioned above the trigger via CSS; no viewport collision engine.',
        'The tooltip itself is passive and not interactive.',
    ],
}

export function TooltipDocs() {
    return <DocPage doc={docData} />
}
