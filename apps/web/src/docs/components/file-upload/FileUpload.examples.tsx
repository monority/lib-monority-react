import { FileUpload } from '@monority/ui'

export function FileUploadBasicExample() {
  return <FileUpload label="Upload" />
}

export function FileUploadWithDescriptionExample() {
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
  return <FileUpload label="Upload files" multiple actionLabel="Choose files" description="You can upload multiple files" />
}

export function FileUploadDisabledExample() {
  return <FileUpload label="Upload" disabled />
}
