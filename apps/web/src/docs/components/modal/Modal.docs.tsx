import { DocPage, type DocPageData } from '../DocPage'
import {
  ModalBasicExample,
  ModalWithFormExample,
  ModalScrollableExample,
} from './Modal.examples'

const docData: DocPageData = {
  title: 'Modal',
  description: 'Focused dialog surface for short decision flows, confirmation, and compact editing tasks.',
  importCode: "import { Modal } from '@monority/ui/modal'",
  usageCode: `<Modal open={open} title="Approve release notes" onClose={() => setOpen(false)}>
  <p>Review the final summary before publishing.</p>
</Modal>`,
  preview: () => <ModalBasicExample />,
  examples: [
    { title: 'With form', content: <ModalWithFormExample /> },
    { title: 'Scrollable content', content: <ModalScrollableExample /> },
  ],
  props: [
    { name: 'open', type: `boolean`, defaultValue: "-", description: 'Controls mounted dialog state.' },
    { name: 'title', type: `string`, defaultValue: "-", description: 'Dialog label.' },
    { name: 'onClose', type: `() => void`, defaultValue: "-", description: 'Called from backdrop, close button, and Escape.' },
    { name: 'children', type: `ReactNode`, defaultValue: "-", description: 'Dialog body content.' },
  ],
  cssHooks: [
    '.mr-modal',
    '.mr-modal__backdrop',
    '.mr-modal__panel',
    '.mr-modal__header',
    '.mr-modal__heading',
    '.mr-modal__title',
    '.mr-modal__close',
    '.mr-modal__body',
    '[data-open]',
  ],
  tokens: [
    '--mr-z-overlay',
    '--mr-bg-surface-elevated',
    '--mr-border-subtle',
    '--mr-shadow-md',
    '--mr-radius-md',
  ],
  a11y: [
    'The panel uses role="dialog" and aria-modal="true".',
    'The title id is connected through aria-labelledby.',
    'Focus is trapped while the modal is open and Escape closes it.',
  ],
}

export function ModalDocs() {
  return <DocPage doc={docData} />
}
