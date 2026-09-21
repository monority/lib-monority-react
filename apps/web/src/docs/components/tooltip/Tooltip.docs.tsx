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
    usageCode: `<Tooltip content="Inspect token details">
  <Button>Hover me</Button>
</Tooltip>`,
    preview: () => <TooltipBasicExample />,
    examples: [
        { title: 'Rich content', content: <TooltipWithRichContentExample /> },
        { title: 'On icon button', content: <TooltipOnIconButtonExample /> },
    ],
    props: [
        { name: 'content', type: `ReactNode`, defaultValue: '-', description: 'Tooltip content.' },
        { name: 'children', type: `ReactNode`, defaultValue: '-', description: 'Trigger element.' },
    ],
    cssHooks: ['.mr-tooltip', '.mr-tooltip__trigger', '.mr-tooltip__content', '[data-hidden]'],
    tokens: [
        '--mr-bg-surface-strong',
        '--mr-fg-strong',
        '--mr-text-xs',
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
