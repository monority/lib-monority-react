import { act, createRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { FileList } from './FileList'

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

const sampleFiles = [
  { name: 'document.pdf', size: 102400, type: 'application/pdf' },
  { name: 'photo.jpg', size: 2048576, type: 'image/jpeg' },
  { name: 'tiny.txt', size: 512 },
]

describe('FileList', () => {
  it('renders file names', () => {
    const view = render(<FileList files={sampleFiles} />)
    const names = view.querySelectorAll('.mr-file-list__name')
    expect(names).toHaveLength(3)
    expect(names[0]?.textContent).toBe('document.pdf')
    expect(names[1]?.textContent).toBe('photo.jpg')
    expect(names[2]?.textContent).toBe('tiny.txt')
  })

  it('renders sizes by default', () => {
    const view = render(<FileList files={sampleFiles} />)
    const sizes = view.querySelectorAll('.mr-file-list__size')
    expect(sizes).toHaveLength(3)
    expect(sizes[0]?.textContent).toBe('100.0 KB')
    expect(sizes[1]?.textContent).toBe('2.0 MB')
    expect(sizes[2]?.textContent).toBe('512 B')
  })

  it('renders remove buttons by default', () => {
    const view = render(<FileList files={sampleFiles} />)
    const buttons = view.querySelectorAll('.mr-file-list__remove')
    expect(buttons).toHaveLength(3)
  })

  it('calls onRemove with correct index when remove button clicked', () => {
    const onRemove = vi.fn()
    const view = render(<FileList files={sampleFiles} onRemove={onRemove} />)
    const buttons = view.querySelectorAll('.mr-file-list__remove')

    act(() => {
      ;(buttons[1] as HTMLButtonElement).click()
    })

    expect(onRemove).toHaveBeenCalledTimes(1)
    expect(onRemove).toHaveBeenCalledWith(1)
  })

  it('showSize=false hides sizes', () => {
    const view = render(<FileList files={sampleFiles} showSize={false} />)
    const sizes = view.querySelectorAll('.mr-file-list__size')
    expect(sizes).toHaveLength(0)
  })

  it('showRemove=false hides remove buttons', () => {
    const view = render(<FileList files={sampleFiles} showRemove={false} />)
    const buttons = view.querySelectorAll('.mr-file-list__remove')
    expect(buttons).toHaveLength(0)
  })

  it('returns null for empty files array', () => {
    const view = render(<FileList files={[]} />)
    expect(view.querySelector('.mr-file-list')).toBeNull()
  })

  it('returns null for undefined files', () => {
    const view = render(<FileList files={undefined as unknown as []} />)
    expect(view.querySelector('.mr-file-list')).toBeNull()
  })

  it('disabled mode hides remove buttons', () => {
    const onRemove = vi.fn()
    const view = render(<FileList files={sampleFiles} onRemove={onRemove} disabled />)
    const buttons = view.querySelectorAll('.mr-file-list__remove')
    expect(buttons).toHaveLength(0)
  })

  it('applies custom className', () => {
    const view = render(<FileList files={sampleFiles} className="my-custom-class" />)
    const list = view.querySelector('.mr-file-list')
    expect(list?.className).toContain('my-custom-class')
  })

  it('applies base class mr-file-list', () => {
    const view = render(<FileList files={sampleFiles} />)
    const list = view.querySelector('.mr-file-list')
    expect(list).not.toBeNull()
  })

  it('sets role="list" on container', () => {
    const view = render(<FileList files={sampleFiles} />)
    const list = view.querySelector('.mr-file-list')
    expect(list?.getAttribute('role')).toBe('list')
  })

  it('sets aria-label="Selected files" on container', () => {
    const view = render(<FileList files={sampleFiles} />)
    const list = view.querySelector('.mr-file-list')
    expect(list?.getAttribute('aria-label')).toBe('Selected files')
  })

  it('sets role="listitem" on each item', () => {
    const view = render(<FileList files={sampleFiles} />)
    const items = view.querySelectorAll('.mr-file-list__item')
    items.forEach((item) => {
      expect(item.getAttribute('role')).toBe('listitem')
    })
  })

  it('remove button has correct aria-label', () => {
    const view = render(<FileList files={sampleFiles} />)
    const buttons = view.querySelectorAll('.mr-file-list__remove')
    expect(buttons[0]?.getAttribute('aria-label')).toBe('Remove document.pdf')
    expect(buttons[1]?.getAttribute('aria-label')).toBe('Remove photo.jpg')
  })

  it('does not render size when file.size is undefined', () => {
    const filesWithoutSize = [{ name: 'unknown.bin' }]
    const view = render(<FileList files={filesWithoutSize} />)
    const sizes = view.querySelectorAll('.mr-file-list__size')
    expect(sizes).toHaveLength(0)
  })

  it('formatSize handles 0 bytes', () => {
    const view = render(<FileList files={[{ name: 'empty.txt', size: 0 }]} />)
    const size = view.querySelector('.mr-file-list__size')
    expect(size?.textContent).toBe('0 B')
  })

  it('formatSize handles large GB values', () => {
    const view = render(<FileList files={[{ name: 'huge.iso', size: 5368709120 }]} />)
    const size = view.querySelector('.mr-file-list__size')
    expect(size?.textContent).toBe('5.0 GB')
  })

  it('renders icon for each item', () => {
    const view = render(<FileList files={sampleFiles} />)
    const icons = view.querySelectorAll('.mr-file-list__icon')
    expect(icons).toHaveLength(3)
    expect(icons[0]?.getAttribute('aria-hidden')).toBe('true')
  })

  it('onRemove not called when disabled even if button somehow rendered', () => {
    const onRemove = vi.fn()
    const view = render(<FileList files={sampleFiles} onRemove={onRemove} disabled showRemove />)
    const buttons = view.querySelectorAll('.mr-file-list__remove')
    expect(buttons).toHaveLength(0)
    expect(onRemove).not.toHaveBeenCalled()
  })
})
