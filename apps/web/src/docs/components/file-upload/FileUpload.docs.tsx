import { DocPage, type DocPageData } from '../DocPage'
import { FileUpload } from '@monority/ui'
import { FileUploadBasicExample } from './FileUpload.examples'

const docData: DocPageData = {
  title: 'FileUpload',
  description: "Drag-and-drop file upload area with action label and description.",
  importCode: "import { FileUpload } from '@monority/ui'",
  usageCode: `<FileUpload label="Attachment" actionLabel="Choose a file" />`,
  preview: () => <FileUploadBasicExample />,
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
}

export function FileUploadDocs() {
  return <DocPage doc={docData} />
}
