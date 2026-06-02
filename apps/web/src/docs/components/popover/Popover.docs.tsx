import { DocPage, type DocPageData } from '../DocPage'
import {
    PopoverBasicExample,
    PopoverWithFormExample,
    PopoverAlignmentExample,
} from './Popover.examples'

const docData: DocPageData = {
    title: 'Popover',
    description:
        'A contextual floating panel for compact detail, quick edits, and supplementary actions.',
    importCode: "import { Popover } from '@monority/ui'",
    usageCode: `<Popover trigger={<Button>Inspect token</Button>}>
  <div>
    <strong>Surface token</strong>
    <p>Use elevated surfaces for contextual panels.</p>
  </div>
</Popover>`,
    preview: () => <PopoverBasicExample />,
    examples: [
        { title: 'With form', content: <PopoverWithFormExample /> },
        { title: 'Alignment', content: <PopoverAlignmentExample /> },
    ],
    props: [
        {
            name: 'trigger',
            type: `ReactNode`,
            defaultValue: '-',
            description: 'Element that opens the popover.',
        },
        { name: 'children', type: `ReactNode`, defaultValue: '-', description: 'Popover content.' },
        { name: 'open', type: `boolean`, defaultValue: '-', description: 'Controlled open state.' },
        {
            name: 'defaultOpen',
            type: `boolean`,
            defaultValue: '-',
            description: 'Default open state.',
        },
        {
            name: 'onOpenChange',
            type: `(open: boolean) => void`,
            defaultValue: '-',
            description: 'Open state change callback.',
        },
        {
            name: 'align',
            type: `'start' | 'center' | 'end'`,
            defaultValue: '-',
            description: 'Alignment relative to trigger.',
        },
        {
            name: 'side',
            type: `'top' | 'bottom' | 'left' | 'right'`,
            defaultValue: '-',
            description: 'Side to render the popover.',
        },
    ],
    cssHooks: [
        '.mr-popover',
        '.mr-popover__trigger',
        '.mr-popover__anchor',
        '.mr-popover__content',
        '.mr-popover__content--top',
        '.mr-popover__content--bottom',
        '[data-open]',
        '[data-align]',
        '[data-side]',
    ],
    tokens: [
        '--mr-bg-surface-elevated',
        '--mr-shadow-md',
        '--mr-radius-md',
        '--mr-text-sm',
        '--mr-space-*',
        '--mr-border-subtle',
    ],
    a11y: [
        'Content uses role="dialog" with aria-modal="false".',
        'Trigger exposes aria-expanded and aria-controls.',
        'Escape key to close.',
        'Focus moves into the panel when opened.',
        'Clicking outside closes the popover.',
    ],
}

export function PopoverDocs() {
    return <DocPage doc={docData} />
}
