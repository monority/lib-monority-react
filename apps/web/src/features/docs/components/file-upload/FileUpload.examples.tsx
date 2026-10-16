import { DropZone, FileList, FileTrigger, FileUpload } from '@monority/ui/file-upload'

// --- Composed FileUpload examples --------------------------------------------

export function FileUploadBasicExample() {
    return <FileUpload label="Upload" />
}

export function FileUploadWithActionExample() {
    return (
        <FileUpload
            label="Attachment"
            actionLabel="Choose a file"
            description="Drag and drop or click to browse"
        />
    )
}

export function FileUploadWithErrorExample() {
    return (
        <FileUpload
            id="upload-error"
            name="attachments"
            label="Upload"
            error="File size must be less than 5MB"
        />
    )
}

export function FileUploadMultipleExample() {
    return (
        <FileUpload
            label="Upload files"
            multiple
            actionLabel="Choose files"
            description="You can upload multiple files"
        />
    )
}

export function FileUploadDisabledExample() {
    return <FileUpload label="Upload" disabled />
}

// --- FileTrigger standalone examples -----------------------------------------

export function FileTriggerDefaultExample() {
    return <FileTrigger />
}

export function FileTriggerCustomExample() {
    return (
        <FileTrigger>
            <span
                style={{
                    padding: '0.5rem 1rem',
                    background: 'var(--mr-accent-subtle)',
                    borderRadius: 'var(--mr-radius-sm)',
                    cursor: 'pointer',
                }}
            >
                Upload document
            </span>
        </FileTrigger>
    )
}

// --- DropZone standalone examples --------------------------------------------

export function DropZoneBasicExample() {
    return <DropZone />
}

export function DropZoneWithHandlerExample() {
    return (
        <DropZone
            onDrop={(files) =>
                console.log(
                    'Dropped files:',
                    files.map((f) => f.name)
                )
            }
            accept=".pdf,.doc,.docx"
        >
            <div
                style={{
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.5rem',
                }}
            >
                <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                >
                    <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
                </svg>
                <p>Drop your documents here</p>
            </div>
        </DropZone>
    )
}

// --- FileList standalone examples --------------------------------------------

export function FileListBasicExample() {
    const files = [
        { name: 'report.pdf', size: 1024 * 256 },
        { name: 'photo.jpg', size: 1024 * 1024 * 2 },
    ]
    return <FileList files={files} />
}

export function FileListWithRemoveExample() {
    const files = [
        { name: 'document.docx', size: 51200 },
        { name: 'spreadsheet.xlsx', size: 1024 * 128 },
        { name: 'archive.zip', size: 1024 * 1024 * 5 },
    ]
    return <FileList files={files} onRemove={(i) => console.log('Remove', i)} />
}
