import { DocPage, type DocPageData } from '../DocPage'
import {
  PopoverBasicExample,
  PopoverWithFormExample,
  PopoverAlignmentExample,
} from './Popover.examples'

const docData: DocPageData = {
  title: 'Popover',
  description: "Floating content panel triggered by an element.",
  importCode: "import { Popover } from '@monority/ui'",
  usageCode: `<Popover trigger={<Button>Open</Button>}>
  <div style={{ padding: 16 }}>Popover content</div>
</Popover>`,
  preview: () => <PopoverBasicExample />,
  examples: [
    { title: 'With form', content: <PopoverWithFormExample /> },
    { title: 'Alignment', content: <PopoverAlignmentExample /> },
  ],
  props: [
    { name: 'trigger', type: `ReactNode`, defaultValue: "-", description: "Element that opens the popover." },
    { name: 'children', type: `ReactNode`, defaultValue: "-", description: "Popover content." },
    { name: 'open', type: `boolean`, defaultValue: "-", description: "Controlled open state." },
    { name: 'defaultOpen', type: `boolean`, defaultValue: "-", description: "Default open state." },
    { name: 'onOpenChange', type: `(open: boolean) => void`, defaultValue: "-", description: "Open state change callback." },
    { name: 'align', type: `'start' | 'center' | 'end'`, defaultValue: "-", description: "Alignment relative to trigger." },
    { name: 'side', type: `'top' | 'bottom' | 'left' | 'right'`, defaultValue: "-", description: "Side to render the popover." }
  ],
  cssHooks: [
    '.mr-popover', '.mr-popover__trigger', '.mr-popover__content',
    '[data-open]', '[data-placement]',
  ],
  tokens: [
    '--mr-bg-surface-elevated', '--mr-shadow-lg', '--mr-radius-md',
    '--mr-text-sm', '--mr-space-*',
  ],
  a11y: [
    'Tooltip/popover ARIA pattern.',
    'aria-describedby for trigger.',
    'Escape key to close.',
    'Focus management.',
  ],
}

export function PopoverDocs() {
  return <DocPage doc={docData} />
}
