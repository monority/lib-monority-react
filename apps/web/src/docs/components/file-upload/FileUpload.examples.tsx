import { FileUpload, FileTrigger, DropZone, FileList } from '@monority/ui'

// ─── Composed FileUpload examples ────────────────────────────────────────────

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
  return <FileUpload label="Upload" error="File size must be less than 5MB" />
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

// ─── FileTrigger standalone examples ─────────────────────────────────────────

export function FileTriggerDefaultExample() {
  return <FileTrigger />
}

export function FileTriggerCustomExample() {
  return (
    <FileTrigger>
      <span style={{ padding: '0.5rem 1rem', background: 'var(--mr-bg-accent-soft)', borderRadius: 'var(--mr-radius-sm)', cursor: 'pointer' }}>
        📎 Upload document
      </span>
    </FileTrigger>
  )
}

// ─── DropZone standalone examples ────────────────────────────────────────────

export function DropZoneBasicExample() {
  return <DropZone />
}

export function DropZoneWithHandlerExample() {
  return (
    <DropZone
      onDrop={(files) => console.log('Dropped files:', files.map((f) => f.name))}
      accept=".pdf,.doc,.docx"
    >
      <div style={{ textAlign: 'center' }}>
        <span style={{ fontSize: '2rem' }}>📂</span>
        <p>Drop your documents here</p>
      </div>
    </DropZone>
  )
}

// ─── FileList standalone examples ────────────────────────────────────────────

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
