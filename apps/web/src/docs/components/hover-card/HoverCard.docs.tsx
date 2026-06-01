import { DocPage, type DocPageData } from '../DocPage'
import {
  HoverCardBasicExample,
  HoverCardCustomDelayExample,
  HoverCardSidesExample,
  HoverCardControlledExample,
} from './HoverCard.examples'

const docData: DocPageData = {
  title: 'HoverCard',
  description: 'A popover-like card that appears on hover, with configurable delays before showing and hiding.',
  importCode: "import { HoverCard } from '@monority/ui'",
  usageCode: `<HoverCard content={<div>Card content</div>}>
  <Button>Hover me</Button>
</HoverCard>`,
  preview: () => <HoverCardBasicExample />,
  examples: [
    { title: 'Custom delay', content: <HoverCardCustomDelayExample /> },
    { title: 'Sides', content: <HoverCardSidesExample /> },
    { title: 'Controlled', content: <HoverCardControlledExample /> },
  ],
  props: [
    { name: 'children', type: 'ReactNode', defaultValue: '-', description: 'Trigger element.' },
    { name: 'content', type: 'ReactNode', defaultValue: '-', description: 'Card content rendered in portal.' },
    { name: 'openDelay', type: 'number', defaultValue: '300', description: 'Delay in ms before showing the card.' },
    { name: 'closeDelay', type: 'number', defaultValue: '150', description: 'Delay in ms before hiding the card.' },
    { name: 'side', type: "'top' | 'bottom' | 'left' | 'right'", defaultValue: "'bottom'", description: 'Side of the trigger to position the card.' },
    { name: 'align', type: "'start' | 'center' | 'end'", defaultValue: "'center'", description: 'Alignment along the side.' },
    { name: 'sideOffset', type: 'number', defaultValue: '8', description: 'Distance in px from the trigger.' },
    { name: 'defaultOpen', type: 'boolean', defaultValue: 'false', description: 'Initial open state for uncontrolled.' },
    { name: 'open', type: 'boolean', defaultValue: '-', description: 'Controlled open state.' },
    { name: 'onOpenChange', type: '(open: boolean) => void', defaultValue: '-', description: 'Callback when open state changes.' },
    { name: 'arrow', type: 'boolean', defaultValue: 'true', description: 'Show arrow pointing to trigger.' },
    { name: 'contentClassName', type: 'string', defaultValue: '-', description: 'Additional className for the card content.' },
  ],
  cssHooks: [
    '.mr-hovercard', '.mr-hovercard__trigger', '.mr-hovercard__content', '.mr-hovercard__arrow',
    '[data-open]', '[data-side]', '[data-align]',
  ],
  tokens: [
    '--mr-bg-surface', '--mr-bg-surface-elevated', '--mr-border-subtle',
    '--mr-shadow-md', '--mr-shadow-lg', '--mr-radius-md', '--mr-text-sm',
  ],
  a11y: [
    'Opens on hover with configurable delay.',
    'Card has role="dialog" for screen readers.',
    'Closes on mouse leave from trigger or card.',
    'Positioning recalculates on scroll/resize.',
  ],
}

export function HoverCardDocs() {
  return <DocPage doc={docData} />
}


