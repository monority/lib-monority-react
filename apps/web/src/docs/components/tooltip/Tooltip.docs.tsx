import { DocPage, type DocPageData } from '../DocPage'
import {
  TooltipBasicExample,
  TooltipWithRichContentExample,
  TooltipOnIconButtonExample,
} from './Tooltip.examples'

const docData: DocPageData = {
  title: 'Tooltip',
  description: "CSS-based tooltip that appears on hover.",
  importCode: "import { Tooltip } from '@monority/ui'",
  usageCode: `<Tooltip content="Tooltip text">
  <Button>Hover me</Button>
</Tooltip>`,
  preview: () => <TooltipBasicExample />,
  examples: [
    { title: 'Rich content', content: <TooltipWithRichContentExample /> },
    { title: 'On icon button', content: <TooltipOnIconButtonExample /> },
  ],
  props: [
    { name: 'content', type: `ReactNode`, defaultValue: "-", description: "Tooltip content." },
    { name: 'children', type: `ReactNode`, defaultValue: "-", description: "Trigger element." }
  ],
  cssHooks: [
    '.mr-tooltip', '.mr-tooltip__content', '[data-placement]',
  ],
  tokens: [
    '--mr-bg-strong', '--mr-fg-inverse', '--mr-text-xs', '--mr-radius-sm', '--mr-shadow-md',
  ],
  a11y: [
    'Tooltip ARIA pattern (role="tooltip").',
    'aria-describedby on trigger.',
    'Appears on focus/hover.',
    'Dismisses on Escape.',
  ],
}

export function TooltipDocs() {
  return <DocPage doc={docData} />
}
