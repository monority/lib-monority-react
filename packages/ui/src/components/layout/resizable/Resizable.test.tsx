import { act, createRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from './Resizable'

let containerEl: HTMLDivElement | null = null
let root: Root | null = null

function render(ui: ReactElement) {
  containerEl = document.createElement('div')
  document.body.appendChild(containerEl)
  root = createRoot(containerEl)
  act(() => root?.render(ui))
  return containerEl
}

afterEach(() => {
  act(() => root?.unmount())
  containerEl?.remove()
  root = null
  containerEl = null
})

describe('Resizable', () => {
  it('renders panel group with default horizontal direction', () => {
    const view = render(
      <ResizablePanelGroup>
        <ResizablePanel>Panel 1</ResizablePanel>
      </ResizablePanelGroup>,
    )
    const group = view.querySelector('.mr-resizable')
    expect(group).not.toBeNull()
    expect(group?.className).toContain('mr-resizable--horizontal')
  })

  it('renders panel group with vertical direction', () => {
    const view = render(
      <ResizablePanelGroup direction="vertical">
        <ResizablePanel>Panel 1</ResizablePanel>
      </ResizablePanelGroup>,
    )
    const group = view.querySelector('.mr-resizable')
    expect(group?.className).toContain('mr-resizable--vertical')
  })

  it('renders panels inside group', () => {
    const view = render(
      <ResizablePanelGroup>
        <ResizablePanel>Left</ResizablePanel>
        <ResizablePanel>Right</ResizablePanel>
      </ResizablePanelGroup>,
    )
    const panels = view.querySelectorAll('.mr-resizable__panel')
    expect(panels.length).toBe(2)
    expect(panels[0]?.textContent).toBe('Left')
    expect(panels[1]?.textContent).toBe('Right')
  })

  it('renders handle between panels', () => {
    const view = render(
      <ResizablePanelGroup>
        <ResizablePanel>Left</ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>Right</ResizablePanel>
      </ResizablePanelGroup>,
    )
    const handle = view.querySelector('.mr-resizable__handle')
    expect(handle).not.toBeNull()
    expect(handle?.getAttribute('role')).toBe('separator')
  })

  it('handle has correct aria-orientation for horizontal', () => {
    const view = render(
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel>Left</ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>Right</ResizablePanel>
      </ResizablePanelGroup>,
    )
    const handle = view.querySelector('.mr-resizable__handle')
    expect(handle?.getAttribute('aria-orientation')).toBe('horizontal')
  })

  it('handle has correct aria-orientation for vertical', () => {
    const view = render(
      <ResizablePanelGroup direction="vertical">
        <ResizablePanel>Top</ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>Bottom</ResizablePanel>
      </ResizablePanelGroup>,
    )
    const handle = view.querySelector('.mr-resizable__handle')
    expect(handle?.getAttribute('aria-orientation')).toBe('vertical')
  })

  it('withHandle renders SVG indicator', () => {
    const view = render(
      <ResizablePanelGroup>
        <ResizablePanel>Left</ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel>Right</ResizablePanel>
      </ResizablePanelGroup>,
    )
    const indicator = view.querySelector('.mr-resizable__handle-indicator')
    expect(indicator).not.toBeNull()
    const svg = indicator?.querySelector('svg')
    expect(svg).not.toBeNull()
  })

  it('panel has flexBasis style from defaultSize', () => {
    const view = render(
      <ResizablePanelGroup>
        <ResizablePanel defaultSize={30}>Panel</ResizablePanel>
      </ResizablePanelGroup>,
    )
    const panel = view.querySelector('.mr-resizable__panel')
    expect(panel?.style.flexBasis).toBe('30%')
  })

  it('panel has minWidth and maxWidth from minSize/maxSize', () => {
    const view = render(
      <ResizablePanelGroup>
        <ResizablePanel minSize={20} maxSize={80}>Panel</ResizablePanel>
      </ResizablePanelGroup>,
    )
    const panel = view.querySelector('.mr-resizable__panel')
    expect(panel?.style.minWidth).toBe('20%')
    expect(panel?.style.maxWidth).toBe('80%')
  })

  it('renders three panels with two handles', () => {
    const view = render(
      <ResizablePanelGroup>
        <ResizablePanel>Left</ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>Middle</ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>Right</ResizablePanel>
      </ResizablePanelGroup>,
    )
    const panels = view.querySelectorAll('.mr-resizable__panel')
    const handles = view.querySelectorAll('.mr-resizable__handle')
    expect(panels.length).toBe(3)
    expect(handles.length).toBe(2)
  })

  it('handle is focusable (tabIndex=0)', () => {
    const view = render(
      <ResizablePanelGroup>
        <ResizablePanel>Left</ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>Right</ResizablePanel>
      </ResizablePanelGroup>,
    )
    const handle = view.querySelector('.mr-resizable__handle')
    expect(handle?.getAttribute('tabindex')).toBe('0')
  })

  it('forwards ref to panel group', () => {
    const ref = createRef<HTMLDivElement>()
    render(
      <ResizablePanelGroup ref={ref}>
        <ResizablePanel>Panel</ResizablePanel>
      </ResizablePanelGroup>,
    )
    expect(ref.current?.tagName).toBe('DIV')
    expect(ref.current?.className).toContain('mr-resizable')
  })

  it('forwards ref to panel', () => {
    const ref = createRef<HTMLDivElement>()
    render(
      <ResizablePanelGroup>
        <ResizablePanel ref={ref}>Panel</ResizablePanel>
      </ResizablePanelGroup>,
    )
    expect(ref.current?.tagName).toBe('DIV')
    expect(ref.current?.className).toContain('mr-resizable__panel')
  })

  it('forwards ref to handle', () => {
    const ref = createRef<HTMLDivElement>()
    render(
      <ResizablePanelGroup>
        <ResizablePanel>Left</ResizablePanel>
        <ResizableHandle ref={ref} />
        <ResizablePanel>Right</ResizablePanel>
      </ResizablePanelGroup>,
    )
    expect(ref.current?.tagName).toBe('DIV')
    expect(ref.current?.className).toContain('mr-resizable__handle')
  })

  it('applies custom className to group', () => {
    const view = render(
      <ResizablePanelGroup className="custom-group">
        <ResizablePanel>Panel</ResizablePanel>
      </ResizablePanelGroup>,
    )
    const group = view.querySelector('.mr-resizable')
    expect(group?.className).toContain('custom-group')
  })

  it('applies custom className to panel', () => {
    const view = render(
      <ResizablePanelGroup>
        <ResizablePanel className="custom-panel">Panel</ResizablePanel>
      </ResizablePanelGroup>,
    )
    const panel = view.querySelector('.mr-resizable__panel')
    expect(panel?.className).toContain('custom-panel')
  })

  it('applies custom className to handle', () => {
    const view = render(
      <ResizablePanelGroup>
        <ResizablePanel>Left</ResizablePanel>
        <ResizableHandle className="custom-handle" />
        <ResizablePanel>Right</ResizablePanel>
      </ResizablePanelGroup>,
    )
    const handle = view.querySelector('.mr-resizable__handle')
    expect(handle?.className).toContain('custom-handle')
  })

  it('panel has data-size attribute', () => {
    const view = render(
      <ResizablePanelGroup>
        <ResizablePanel defaultSize={40}>Panel</ResizablePanel>
      </ResizablePanelGroup>,
    )
    const panel = view.querySelector('.mr-resizable__panel')
    expect(panel?.getAttribute('data-size')).toBe('40')
  })
})
