import { DocPage, type DocPageData } from '../DocPage'
import {
    FileUploadBasicExample,
    FileUploadWithActionExample,
    FileUploadWithErrorExample,
    FileUploadMultipleExample,
    FileUploadDisabledExample,
    FileTriggerDefaultExample,
    FileTriggerCustomExample,
    DropZoneBasicExample,
    DropZoneWithHandlerExample,
    FileListBasicExample,
    FileListWithRemoveExample,
} from './FileUpload.examples'

const docData: DocPageData = {
    title: 'FileUpload',
    description:
        'Composed file upload with drag-and-drop, file trigger, and file list. Also available as standalone primitives: FileTrigger, DropZone, FileList.',
    importCode: `import { FileUpload, FileTrigger, DropZone, FileList } from '@monority/ui/file-upload'`,
    usageCode: `<FileUpload label="Attachment" actionLabel="Choose a file" />`,
    preview: () => <FileUploadBasicExample />,
    examples: [
        {
            title: 'With action & description',
            content: <FileUploadWithActionExample />,
            code: `<FileUpload
  label="Attachment"
  actionLabel="Choose a file"
  description="Drag and drop or click to browse"
/>`,
        },
        {
            title: 'Error state',
            content: <FileUploadWithErrorExample />,
            code: `<FileUpload label="Upload" error="File size must be less than 5MB" />`,
        },
        {
            title: 'Multiple files',
            content: <FileUploadMultipleExample />,
            code: `<FileUpload label="Upload files" multiple actionLabel="Choose files" description="You can upload multiple files" />`,
        },
        {
            title: 'Disabled',
            content: <FileUploadDisabledExample />,
            code: `<FileUpload label="Upload" disabled />`,
        },
    ],
    props: [
        { name: 'label', type: `ReactNode`, defaultValue: '-', description: 'Field label.' },
        { name: 'hint', type: `ReactNode`, defaultValue: '-', description: 'Helpful description.' },
        { name: 'error', type: `ReactNode`, defaultValue: '-', description: 'Error message.' },
        {
            name: 'accept',
            type: `string | string[]`,
            defaultValue: '-',
            description: 'Accepted MIME types or extensions.',
        },
        {
            name: 'multiple',
            type: `boolean`,
            defaultValue: 'false',
            description: 'Allow multiple files.',
        },
        {
            name: 'actionLabel',
            type: `string`,
            defaultValue: '-',
            description: 'Action button label (inside trigger).',
        },
        {
            name: 'description',
            type: `ReactNode`,
            defaultValue: '-',
            description: 'Helper description inside the drop zone.',
        },
        {
            name: 'placeholder',
            type: `ReactNode`,
            defaultValue: '-',
            description: 'Placeholder text when no files selected.',
        },
        {
            name: 'required',
            type: `boolean`,
            defaultValue: 'false',
            description: 'Required field indicator.',
        },
        {
            name: 'invalid',
            type: `boolean`,
            defaultValue: 'false',
            description: 'Marks the trigger and native input invalid.',
        },
        {
            name: 'name',
            type: `string`,
            defaultValue: '-',
            description: 'Native file input name used during form submission.',
        },
        {
            name: 'disabled',
            type: `boolean`,
            defaultValue: 'false',
            description: 'Disable all interactions.',
        },
        {
            name: 'size',
            type: `'sm' | 'md' | 'lg'`,
            defaultValue: "'md'",
            description: 'Control size.',
        },
        {
            name: 'files',
            type: `File[]`,
            defaultValue: '-',
            description: 'Controlled selected files.',
        },
        {
            name: 'onFilesChange',
            type: `(files: File[]) => void`,
            defaultValue: '-',
            description: 'Called when selected files change.',
        },
    ],
    cssHooks: [
        '.mr-file-upload__dropzone',
        '.mr-file-upload__content',
        '.mr-file-upload__description',
        '.mr-file-upload__placeholder',
        '.mr-file-upload__action',
        '.mr-file-upload__default-action',
        '.mr-file-upload__files',
        // Sub-components
        '.mr-file-trigger',
        '.mr-file-trigger--default',
        '.mr-drop-zone',
        '.mr-drop-zone--dragover',
        '.mr-drop-zone--disabled',
        '.mr-file-list',
        '.mr-file-list__item',
        '.mr-file-list__name',
        '.mr-file-list__size',
        '.mr-file-list__remove',
    ],
    tokens: [
        '--mr-border-subtle',
        '--mr-bg-control',
        '--mr-bg-accent-soft',
        '--mr-bg-accent-strong',
        '--mr-fg-base',
        '--mr-fg-muted',
        '--mr-fg-accent',
        '--mr-radius-sm',
        '--mr-radius-md',
        '--mr-text-sm',
        '--mr-space-1',
        '--mr-space-2',
        '--mr-space-3',
    ],
    a11y: [
        'Native file input and button semantics via FileTrigger.',
        'Hint and error descriptions are linked to the visible trigger.',
        'Supports disabled/required/aria-invalid and native name submission.',
        'Visible focus ring on trigger button.',
        'DropZone has role="region" with aria-label.',
        'FileList has role="list" with aria-label="Selected files".',
        'Remove buttons have aria-label with file name.',
    ],
}

// ─── Sub-component docs ──────────────────────────────────────────────────────

const fileTriggerDoc: DocPageData = {
    title: 'FileTrigger',
    description:
        'Accessible file picker trigger. Renders a native file input and a native button, with custom button content supported.',
    importCode: `import { FileTrigger } from '@monority/ui/file-upload'`,
    usageCode: `<FileTrigger onSelect={(files) => console.log(files)} />`,
    preview: () => <FileTriggerDefaultExample />,
    examples: [
        {
            title: 'Custom trigger',
            content: <FileTriggerCustomExample />,
            code: `<FileTrigger>
  <span>📎 Upload document</span>
</FileTrigger>`,
        },
    ],
    props: [
        {
            name: 'accept',
            type: `string | string[]`,
            defaultValue: '-',
            description: 'Accepted MIME types or extensions.',
        },
        {
            name: 'multiple',
            type: `boolean`,
            defaultValue: 'false',
            description: 'Allow multiple files.',
        },
        {
            name: 'onSelect',
            type: `(files: File[]) => void`,
            defaultValue: '-',
            description: 'Called when files are selected.',
        },
        {
            name: 'directory',
            type: `boolean`,
            defaultValue: 'false',
            description: 'Allow directory selection.',
        },
        {
            name: 'disabled',
            type: `boolean`,
            defaultValue: 'false',
            description: 'Disable the trigger.',
        },
        {
            name: 'required',
            type: `boolean`,
            defaultValue: 'false',
            description: 'Require a selected file.',
        },
        {
            name: 'invalid',
            type: `boolean`,
            defaultValue: 'false',
            description: 'Marks the trigger and native input invalid.',
        },
        {
            name: 'name',
            type: `string`,
            defaultValue: '-',
            description: 'Native file input name used during form submission.',
        },
        {
            name: 'children',
            type: `ReactNode`,
            defaultValue: '-',
            description: 'Custom trigger element. If omitted, renders a default button.',
        },
    ],
    cssHooks: ['.mr-file-trigger', '.mr-file-trigger--default', '.mr-file-trigger__input'],
    tokens: ['--mr-bg-accent-soft', '--mr-bg-accent-strong', '--mr-fg-accent', '--mr-radius-sm'],
    a11y: [
        'Native input with type="file" and optional name.',
        'Visible control is a native button with native Enter/Space behavior.',
        'Disabled, required, invalid, and described-by state apply to both input and trigger.',
    ],
}

const dropZoneDoc: DocPageData = {
    title: 'DropZone',
    description:
        'Drag-and-drop zone for files. Handles drag events, validates against accept rules, and calls onDrop with filtered files.',
    importCode: `import { DropZone } from '@monority/ui'`,
    usageCode: `<DropZone onDrop={(files) => console.log(files)} />`,
    preview: () => <DropZoneBasicExample />,
    examples: [
        {
            title: 'With custom content & handler',
            content: <DropZoneWithHandlerExample />,
            code: `<DropZone
  onDrop={(files) => console.log(files)}
  accept=".pdf,.doc,.docx"
>
  <div>Drop your documents here</div>
</DropZone>`,
        },
    ],
    props: [
        {
            name: 'onDrop',
            type: `(files: File[]) => void`,
            defaultValue: '-',
            description: 'Called when files are dropped.',
        },
        {
            name: 'accept',
            type: `string | string[]`,
            defaultValue: '-',
            description: 'Accepted MIME types or extensions (also filters dropped files).',
        },
        {
            name: 'multiple',
            type: `boolean`,
            defaultValue: 'false',
            description: 'Allow multiple files (limits to 1 if false).',
        },
        {
            name: 'disabled',
            type: `boolean`,
            defaultValue: 'false',
            description: 'Disable drop zone.',
        },
        {
            name: 'children',
            type: `ReactNode`,
            defaultValue: '-',
            description: 'Custom content. If omitted, renders default placeholder.',
        },
    ],
    cssHooks: [
        '.mr-drop-zone',
        '.mr-drop-zone--dragover',
        '.mr-drop-zone--disabled',
        '.mr-drop-zone__placeholder',
        '.mr-drop-zone__icon',
        '.mr-drop-zone__text',
    ],
    tokens: [
        '--mr-border-subtle',
        '--mr-border-strong',
        '--mr-bg-surface',
        '--mr-bg-control',
        '--mr-fg-accent',
        '--mr-bg-accent-soft',
        '--mr-radius-md',
        '--mr-text-sm',
    ],
    a11y: [
        'role="region" with aria-label="Drop zone".',
        'aria-disabled when disabled.',
        'data-dragging attribute for visual feedback.',
    ],
}

const fileListDoc: DocPageData = {
    title: 'FileList',
    description: 'Displays a list of selected files with name, size, and optional remove button.',
    importCode: `import { FileList } from '@monority/ui'`,
    usageCode: `<FileList files={[{ name: 'report.pdf', size: 256000 }]} onRemove={(i) => console.log(i)} />`,
    preview: () => <FileListBasicExample />,
    examples: [
        {
            title: 'With remove buttons',
            content: <FileListWithRemoveExample />,
            code: `<FileList
  files={[
    { name: 'document.docx', size: 51200 },
    { name: 'spreadsheet.xlsx', size: 131072 },
  ]}
  onRemove={(i) => console.log('Remove', i)}
/>`,
        },
    ],
    props: [
        {
            name: 'files',
            type: `FileListItem[]`,
            defaultValue: '-',
            description: 'Array of { name, size?, type? }.',
        },
        {
            name: 'onRemove',
            type: `(index: number) => void`,
            defaultValue: '-',
            description: 'Called when remove button is clicked.',
        },
        { name: 'showSize', type: `boolean`, defaultValue: 'true', description: 'Show file size.' },
        {
            name: 'showRemove',
            type: `boolean`,
            defaultValue: 'true',
            description: 'Show remove button.',
        },
        {
            name: 'disabled',
            type: `boolean`,
            defaultValue: 'false',
            description: 'Disable remove buttons.',
        },
    ],
    cssHooks: [
        '.mr-file-list',
        '.mr-file-list__item',
        '.mr-file-list__icon',
        '.mr-file-list__info',
        '.mr-file-list__name',
        '.mr-file-list__size',
        '.mr-file-list__remove',
    ],
    tokens: [
        '--mr-bg-surface-strong',
        '--mr-bg-control',
        '--mr-fg-base',
        '--mr-fg-muted',
        '--mr-radius-sm',
        '--mr-text-sm',
        '--mr-text-xs',
        '--mr-space-2',
        '--mr-space-3',
    ],
    a11y: [
        'role="list" with aria-label="Selected files".',
        'Each item has role="listitem".',
        'Remove buttons have aria-label with file name.',
    ],
}

export function FileUploadDocs() {
    return <DocPage doc={docData} />
}

export function FileTriggerDocs() {
    return <DocPage doc={fileTriggerDoc} />
}

export function DropZoneDocs() {
    return <DocPage doc={dropZoneDoc} />
}

export function FileListDocs() {
    return <DocPage doc={fileListDoc} />
}
