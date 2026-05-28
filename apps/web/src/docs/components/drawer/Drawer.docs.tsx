import { DocPage, type DocPageData } from '../DocPage'
import {
  DrawerBasicExample,
  DrawerSidesExample,
  DrawerWithFooterExample,
} from './Drawer.examples'

const docData: DocPageData = {
  title: 'Drawer',
  description: "Slide-in panel overlay from any side with focus trap and backdrop.",
  importCode: "import { Drawer } from '@monority/ui'",
  usageCode: `<Drawer open={open} title="Details" side="right" onClose={() => setOpen(false)}>
  <p>Drawer content</p>
</Drawer>`,
  preview: () => <DrawerBasicExample />,
  examples: [
    { title: 'Different sides', content: <DrawerSidesExample /> },
    { title: 'With footer', content: <DrawerWithFooterExample /> },
  ],
  props: [
    { name: 'open', type: `boolean`, defaultValue: "-", description: "Controls open state." },
    { name: 'title', type: `string`, defaultValue: "-", description: "Drawer title." },
    { name: 'children', type: `ReactNode`, defaultValue: "-", description: "Drawer content." },
    { name: 'side', type: `'left' | 'right' | 'top' | 'bottom'`, defaultValue: "'right'", description: "Slide-in direction." },
    { name: 'onClose', type: `() => void`, defaultValue: "-", description: "Close callback." }
  ],
  cssHooks: [
    '.mr-drawer', '.mr-drawer__backdrop', '.mr-drawer__content', '.mr-drawer__header',
    '.mr-drawer__body', '.mr-drawer__footer', '[data-open]', '[data-side]',
  ],
  tokens: [
    '--mr-bg-surface-elevated', '--mr-shadow-xl', '--mr-bg-overlay',
    '--mr-space-*', '--mr-dur-300',
  ],
  a11y: [
    'Dialog ARIA pattern (role="dialog", aria-modal="true").',
    'Focus trap.',
    'aria-labelledby for header.',
    'Escape key to close.',
    'Close button with aria-label.',
  ],
}

export function DrawerDocs() {
  return <DocPage doc={docData} />
}
