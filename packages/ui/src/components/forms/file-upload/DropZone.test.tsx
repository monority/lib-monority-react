import { act, createRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { DropZone } from './DropZone'

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

function createDragEvent(type: string, files?: File[]) {
  const dataTransfer = {
    files: files ?? ([] as unknown as FileList),
    items: [] as DataTransferItem[],
    types: ['Files'],
  } as unknown as DataTransfer
  const event = new Event(type, { bubbles: true }) as DragEvent
  Object.defineProperty(event, 'dataTransfer', { value: dataTransfer })
  Object.defineProperty(event, 'preventDefault', { value: function () { /* noop */ } })
  Object.defineProperty(event, 'stopPropagation', { value: function () { /* noop */ } })
  return event
}

describe('DropZone', () => {
  it('renders children when provided', () => {
    const view = render(<DropZone><span data-testid="child">Custom content</span></DropZone>)
    const child = view.querySelector('[data-testid="child"]')
    expect(child).not.toBeNull()
    expect(child?.textContent).toBe('Custom content')
  })

  it('renders default placeholder when no children', () => {
    const view = render(<DropZone />)
    const placeholder = view.querySelector('.mr-drop-zone__placeholder')
    expect(placeholder).not.toBeNull()
    expect(placeholder?.textContent).toContain('Drag & drop files here')
  })

  it('applies base class mr-drop-zone', () => {
    const view = render(<DropZone />)
    const zone = view.querySelector('.mr-drop-zone')
    expect(zone).not.toBeNull()
  })

  it('applies custom className', () => {
    const view = render(<DropZone className="my-custom-class" />)
    const zone = view.querySelector('.mr-drop-zone')
    expect(zone?.className).toContain('my-custom-class')
  })

  it('adds mr-drop-zone--dragover class on dragover', () => {
    const view = render(<DropZone />)
    const zone = view.querySelector('.mr-drop-zone') as HTMLDivElement

    act(() => {
      zone.dispatchEvent(createDragEvent('dragover'))
    })

    expect(zone.className).toContain('mr-drop-zone--dragover')
  })

  it('removes dragover class on dragleave', () => {
    const view = render(<DropZone />)
    const zone = view.querySelector('.mr-drop-zone') as HTMLDivElement

    act(() => {
      zone.dispatchEvent(createDragEvent('dragover'))
    })
    expect(zone.className).toContain('mr-drop-zone--dragover')

    act(() => {
      zone.dispatchEvent(createDragEvent('dragleave'))
    })
    expect(zone.className).not.toContain('mr-drop-zone--dragover')
  })

  it('calls onDrop with files on drop', () => {
    const onDrop = vi.fn()
    const view = render(<DropZone onDrop={onDrop} />)
    const zone = view.querySelector('.mr-drop-zone') as HTMLDivElement

    const file = new File(['content'], 'test.png', { type: 'image/png' })
    const fileList = [file] as unknown as FileList

    act(() => {
      zone.dispatchEvent(createDragEvent('drop', fileList))
    })

    expect(onDrop).toHaveBeenCalledTimes(1)
    expect(onDrop).toHaveBeenCalledWith([file])
  })

  it('calls onDrop with multiple files when multiple is true', () => {
    const onDrop = vi.fn()
    const view = render(<DropZone onDrop={onDrop} multiple />)
    const zone = view.querySelector('.mr-drop-zone') as HTMLDivElement

    const file1 = new File(['a'], 'a.png', { type: 'image/png' })
    const file2 = new File(['b'], 'b.jpg', { type: 'image/jpeg' })
    const fileList = [file1, file2] as unknown as FileList

    act(() => {
      zone.dispatchEvent(createDragEvent('drop', fileList))
    })

    expect(onDrop).toHaveBeenCalledWith([file1, file2])
  })

  it('limits to one file when multiple is false (default)', () => {
    const onDrop = vi.fn()
    const view = render(<DropZone onDrop={onDrop} />)
    const zone = view.querySelector('.mr-drop-zone') as HTMLDivElement

    const file1 = new File(['a'], 'a.png', { type: 'image/png' })
    const file2 = new File(['b'], 'b.jpg', { type: 'image/jpeg' })
    const fileList = [file1, file2] as unknown as FileList

    act(() => {
      zone.dispatchEvent(createDragEvent('drop', fileList))
    })

    expect(onDrop).toHaveBeenCalledWith([file1])
  })

  it('filters files by accept string', () => {
    const onDrop = vi.fn()
    const view = render(<DropZone onDrop={onDrop} accept=".png" multiple />)
    const zone = view.querySelector('.mr-drop-zone') as HTMLDivElement

    const png = new File(['a'], 'a.png', { type: 'image/png' })
    const jpg = new File(['b'], 'b.jpg', { type: 'image/jpeg' })
    const fileList = [png, jpg] as unknown as FileList

    act(() => {
      zone.dispatchEvent(createDragEvent('drop', fileList))
    })

    expect(onDrop).toHaveBeenCalledWith([png])
  })

  it('filters files by accept array', () => {
    const onDrop = vi.fn()
    const view = render(<DropZone onDrop={onDrop} accept={['image/png', 'image/jpeg']} multiple />)
    const zone = view.querySelector('.mr-drop-zone') as HTMLDivElement

    const png = new File(['a'], 'a.png', { type: 'image/png' })
    const txt = new File(['b'], 'b.txt', { type: 'text/plain' })
    const fileList = [png, txt] as unknown as FileList

    act(() => {
      zone.dispatchEvent(createDragEvent('drop', fileList))
    })

    expect(onDrop).toHaveBeenCalledWith([png])
  })

  it('filters files by wildcard accept (image/*)', () => {
    const onDrop = vi.fn()
    const view = render(<DropZone onDrop={onDrop} accept="image/*" multiple />)
    const zone = view.querySelector('.mr-drop-zone') as HTMLDivElement

    const png = new File(['a'], 'a.png', { type: 'image/png' })
    const jpg = new File(['b'], 'b.jpg', { type: 'image/jpeg' })
    const txt = new File(['c'], 'c.txt', { type: 'text/plain' })
    const fileList = [png, jpg, txt] as unknown as FileList

    act(() => {
      zone.dispatchEvent(createDragEvent('drop', fileList))
    })

    expect(onDrop).toHaveBeenCalledWith([png, jpg])
  })

  it('disabled prevents drop', () => {
    const onDrop = vi.fn()
    const view = render(<DropZone onDrop={onDrop} disabled />)
    const zone = view.querySelector('.mr-drop-zone') as HTMLDivElement

    const file = new File(['content'], 'test.png', { type: 'image/png' })
    const fileList = [file] as unknown as FileList

    act(() => {
      zone.dispatchEvent(createDragEvent('drop', fileList))
    })

    expect(onDrop).not.toHaveBeenCalled()
  })

  it('disabled adds mr-drop-zone--disabled class', () => {
    const view = render(<DropZone disabled />)
    const zone = view.querySelector('.mr-drop-zone')
    expect(zone?.className).toContain('mr-drop-zone--disabled')
  })

  it('disabled does not set dragover on dragover', () => {
    const view = render(<DropZone disabled />)
    const zone = view.querySelector('.mr-drop-zone') as HTMLDivElement

    act(() => {
      zone.dispatchEvent(createDragEvent('dragover'))
    })

    expect(zone.className).not.toContain('mr-drop-zone--dragover')
  })

  it('sets aria-disabled when disabled', () => {
    const view = render(<DropZone disabled />)
    const zone = view.querySelector('.mr-drop-zone')
    expect(zone?.getAttribute('aria-disabled')).toBe('true')
  })

  it('does not set aria-disabled when not disabled', () => {
    const view = render(<DropZone />)
    const zone = view.querySelector('.mr-drop-zone')
    expect(zone?.getAttribute('aria-disabled')).toBeNull()
  })

  it('sets role="region"', () => {
    const view = render(<DropZone />)
    const zone = view.querySelector('.mr-drop-zone')
    expect(zone?.getAttribute('role')).toBe('region')
  })

  it('sets aria-label="Drop zone"', () => {
    const view = render(<DropZone />)
    const zone = view.querySelector('.mr-drop-zone')
    expect(zone?.getAttribute('aria-label')).toBe('Drop zone')
  })

  it('forwards ref to div element', () => {
    const ref = createRef<HTMLDivElement>()
    render(<DropZone ref={ref} />)
    expect(ref.current?.tagName).toBe('DIV')
    expect(ref.current?.getAttribute('role')).toBe('region')
  })

  it('passes through additional HTML props', () => {
    const view = render(<DropZone data-testid="drop-zone" id="my-zone" />)
    const zone = view.querySelector('.mr-drop-zone')
    expect(zone?.getAttribute('data-testid')).toBe('drop-zone')
    expect(zone?.id).toBe('my-zone')
  })

  it('data-dragging attribute set when dragging', () => {
    const view = render(<DropZone />)
    const zone = view.querySelector('.mr-drop-zone') as HTMLDivElement

    act(() => {
      zone.dispatchEvent(createDragEvent('dragover'))
    })

    expect(zone.getAttribute('data-dragging')).toBe('true')
  })

  it('data-dragging attribute removed after dragleave', () => {
    const view = render(<DropZone />)
    const zone = view.querySelector('.mr-drop-zone') as HTMLDivElement

    act(() => {
      zone.dispatchEvent(createDragEvent('dragover'))
    })
    act(() => {
      zone.dispatchEvent(createDragEvent('dragleave'))
    })

    expect(zone.getAttribute('data-dragging')).toBeNull()
  })

  it('data-disabled attribute set when disabled', () => {
    const view = render(<DropZone disabled />)
    const zone = view.querySelector('.mr-drop-zone')
    expect(zone?.getAttribute('data-disabled')).toBe('true')
  })
})
