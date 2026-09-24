import { act, createRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { FileUpload } from './FileUpload'

let container: HTMLDivElement | null = null
let root: Root | null = null

function render(ui: ReactElement) {
  container = document.createElement('div')
  document.body.appendChild(container)
  root = createRoot(container)
  act(() => root?.render(ui))
  return container
}

afterEach(() => {
  act(() => root?.unmount())
  container?.remove()
  root = null
  container = null
})

describe('FileUpload', () => {
  it('renders with label and dropzone', () => {
    const view = render(<FileUpload label="Upload" />)
    const dropzone = view.querySelector('.mr-file-upload__dropzone')
    expect(dropzone).not.toBeNull()
    const trigger = view.querySelector('.mr-file-trigger')
    expect(trigger).not.toBeNull()
    expect(view.textContent).toContain('Upload')
  })

  it('generates matching IDs for label and native input', () => {
    const view = render(<FileUpload label="Upload" />)
    const input = view.querySelector('input[type="file"]')
    const label = view.querySelector('label')
    expect(input?.getAttribute('id')).toBeTruthy()
    expect(label?.getAttribute('for')).toBe(input?.getAttribute('id'))
  })

  it('renders default action text', () => {
    const view = render(<FileUpload label="Upload" />)
    const action = view.querySelector('.mr-file-upload__default-action')
    expect(action).not.toBeNull()
    expect(action?.textContent).toBe('Choose files')
  })

  it('renders custom action label', () => {
    const view = render(<FileUpload label="Upload" actionLabel="Browse" />)
    const action = view.querySelector('.mr-file-upload__action')
    expect(action).not.toBeNull()
    expect(action?.textContent).toBe('Browse')
  })

  it('renders description', () => {
    const view = render(<FileUpload label="Upload" description="PDF only" />)
    const desc = view.querySelector('.mr-file-upload__description')
    expect(desc).not.toBeNull()
    expect(desc?.textContent).toBe('PDF only')
  })

  it('maps disabled state on dropzone and input', () => {
    const view = render(<FileUpload label="Doc" disabled />)
    const dropzone = view.querySelector('.mr-file-upload__dropzone')
    expect(dropzone?.getAttribute('data-disabled')).toBe('true')
    const input = view.querySelector('input[type="file"]')
    expect(input?.disabled).toBe(true)
  })

  it('maps required state on hidden input', () => {
    const view = render(<FileUpload label="Doc" required />)
    const input = view.querySelector('input[type="file"]')
    expect(input?.required).toBe(true)
  })

  it('forwards ref to native input', () => {
    const ref = createRef<HTMLInputElement>()
    render(<FileUpload ref={ref} />)
    expect(ref.current?.tagName).toBe('INPUT')
    expect(ref.current?.type).toBe('file')
  })

  it('renders hint and error elements', () => {
    const view = render(<FileUpload label="Doc" hint="PDF only" error="Wrong format" />)
    const hintEl = view.querySelector('.mr-field__hint')
    expect(hintEl).not.toBeNull()
    expect(hintEl?.textContent).toBe('PDF only')
    const errorEl = view.querySelector('.mr-field__error')
    expect(errorEl).not.toBeNull()
    expect(errorEl?.textContent).toBe('Wrong format')
  })

  it('supports multiple prop', () => {
    const view = render(<FileUpload label="Upload" multiple />)
    const input = view.querySelector('input[type="file"]')
    expect(input?.multiple).toBe(true)
  })

  it('does not render decorative icon', () => {
    const view = render(<FileUpload label="Upload" />)
    const icon = view.querySelector('.mr-file-upload__icon')
    expect(icon).toBeNull()
  })

  it('renders placeholder text', () => {
    const view = render(<FileUpload label="Upload" placeholder="Select your files" />)
    const placeholder = view.querySelector('.mr-file-upload__placeholder')
    expect(placeholder).not.toBeNull()
    expect(placeholder?.textContent).toBe('Select your files')
  })

  it('does not render FileList when no files selected', () => {
    const view = render(<FileUpload label="Upload" />)
    const fileList = view.querySelector('.mr-file-list')
    expect(fileList).toBeNull()
  })

  it('exposes an accessible custom trigger and associates the label', () => {
    const view = render(<FileUpload id="attachment" label="Attachment" actionLabel="Browse" />)
    const trigger = view.querySelector('[role="button"].mr-file-trigger')
    const input = view.querySelector('input[type="file"]')
    const label = view.querySelector('label')
    expect(trigger?.getAttribute('role')).toBe('button')
    expect(trigger?.textContent).toBe('Browse')
    expect(input?.getAttribute('id')).toBe('attachment')
    expect(label?.getAttribute('for')).toBe('attachment')
  })

  it('stores selected files and clears required state after selection', () => {
    const onFilesChange = vi.fn()
    const view = render(<FileUpload label="Attachment" required onFilesChange={onFilesChange} />)
    const input = view.querySelector('input[type="file"]') as HTMLInputElement
    const file = new File(['content'], 'notes.txt', { type: 'text/plain' })
    Object.defineProperty(input, 'files', { configurable: true, value: [file] })

    act(() => input.dispatchEvent(new Event('change', { bubbles: true })))

    expect(onFilesChange).toHaveBeenCalledWith([file])
    expect(view.querySelector('.mr-file-list__name')?.textContent).toBe('notes.txt')
    expect(input.required).toBe(false)
    expect(view.querySelector('.mr-file-upload__placeholder')).toBeNull()
  })

  it('renders controlled files without mutating them', () => {
    const file = new File(['content'], 'controlled.txt', { type: 'text/plain' })
    const view = render(<FileUpload label="Attachment" files={[file]} placeholder="Choose" />)
    expect(view.querySelector('.mr-file-list__name')?.textContent).toBe('controlled.txt')
    expect(view.querySelector('.mr-file-upload__placeholder')).toBeNull()
  })

  it('applies custom className to field', () => {
    const view = render(<FileUpload label="Upload" className="custom-class" />)
    const field = view.querySelector('.mr-file-upload-field')
    expect(field?.className).toContain('custom-class')
  })
})
