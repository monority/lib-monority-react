import { DocPage, type DocPageData } from '../DocPage'
import {
  FileUploadBasicExample,
  FileUploadWithDescriptionExample,
  FileUploadWithErrorExample,
  FileUploadMultipleExample,
  FileUploadDisabledExample,
} from './FileUpload.examples'

const docData: DocPageData = {
  title: 'FileUpload',
  description: "Drag-and-drop file upload area with action label and description.",
  importCode: "import { FileUpload } from '@monority/ui'",
  usageCode: `<FileUpload label="Attachment" actionLabel="Choose a file" />`,
  preview: () => <FileUploadBasicExample />,
  examples: [
    { title: 'With description', content: <FileUploadWithDescriptionExample /> },
    { title: 'Error state', content: <FileUploadWithErrorExample /> },
    { title: 'Multiple files', content: <FileUploadMultipleExample /> },
    { title: 'Disabled', content: <FileUploadDisabledExample /> },
  ],
  props: [
    { name: 'label', type: `ReactNode`, defaultValue: "-", description: "Field label." },
    { name: 'hint', type: `ReactNode`, defaultValue: "-", description: "Helpful description." },
    { name: 'error', type: `ReactNode`, defaultValue: "-", description: "Error message." },
    { name: 'accept', type: `string`, defaultValue: "-", description: "Accepted MIME types." },
    { name: 'multiple', type: `boolean`, defaultValue: "-", description: "Allow multiple files." },
    { name: 'actionLabel', type: `string`, defaultValue: "'Choisir un fichier'", description: "Action button label." },
    { name: 'description', type: `string`, defaultValue: "-", description: "Helper description inside the drop zone." },
    { name: 'required', type: `boolean`, defaultValue: "false", description: "Required field indicator." }
  ],
  cssHooks: [
    '.mr-file-upload', '.mr-file-upload__zone', '.mr-file-upload__icon', '.mr-file-upload__label',
    '[data-disabled]', '[data-invalid]', '[data-dragging]',
  ],
  tokens: [
    '--mr-border-subtle', '--mr-bg-control', '--mr-fg-base', '--mr-fg-muted',
    '--mr-radius-md', '--mr-text-sm', '--mr-accent',
  ],
  a11y: [
    'Native form element semantics.',
    'Supports disabled/required/aria-invalid.',
    'Visible focus ring.',
    'Associated label for screen readers.',
    'Drag-and-drop zone announces state changes.',
  ],
}

export function FileUploadDocs() {
  return <DocPage doc={docData} />
}
