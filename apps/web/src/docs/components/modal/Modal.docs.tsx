import { DocPage, type DocPageData } from '../DocPage'
import {
  ModalBasicExample,
  ModalWithFormExample,
  ModalScrollableExample,
} from './Modal.examples'

const docData: DocPageData = {
  title: 'Modal',
  description: 'Focused dialog pattern with scroll lock, focus trap, Escape handling, backdrop close, and labelled title.',
  importCode: "import { Modal } from '@monority/ui/modal'",
  usageCode: `<Modal open={open} title="Confirm action" onClose={() => setOpen(false)}>
  Dialog content
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
  cssHooks: ['.mr-modal', '.mr-modal__backdrop', '.mr-modal__panel', '.mr-modal__header', '.mr-modal__body', '[data-open]'],
  tokens: ['--mr-z-overlay', '--mr-radius-lg', '--mr-shadow-md', '--mr-space-*'],
  a11y: ['role="dialog" and aria-modal set.', 'Title ID drives aria-labelledby.', 'Focus is trapped while open.'],
}

export function ModalDocs() {
  return <DocPage doc={docData} />
}
