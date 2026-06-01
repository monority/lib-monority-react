import { act } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { ToggleGroup } from './ToggleGroup'

const sampleItems = [
  { value: 'bold', label: 'Bold' },
  { value: 'italic', label: 'Italic' },
  { value: 'underline', label: 'Underline' },
]

let container: HTMLDivElement | null = null
let root: Root | null = null

function render(ui: ReactElement) {
  container = document.createElement('div')
  document.body.appendChild(container)
  root = createRoot(container)

  act(() => {
    root?.render(ui)
  })

  return container
}

afterEach(() => {
  act(() => {
    root?.unmount()
  })
  container?.remove()
  root = null
  container = null
})

describe('ToggleGroup', () => {
  it('renders items from the items prop', () => {
    const view = render(<ToggleGroup items={sampleItems} />)
    const buttons = view.querySelectorAll('button')

    expect(buttons.length).toBe(3)
    expect(buttons[0]?.textContent).toBe('Bold')
    expect(buttons[1]?.textContent).toBe('Italic')
    expect(buttons[2]?.textContent).toBe('Underline')
  })

  it('renders with role="group" for single type', () => {
    const view = render(<ToggleGroup items={sampleItems} type="single" />)
    const group = view.querySelector('[role="group"]')

    expect(group).not.toBeNull()
    expect(group?.getAttribute('data-orientation')).toBe('horizontal')
  })

  it('renders with role="toolbar" for multiple type', () => {
    const view = render(<ToggleGroup items={sampleItems} type="multiple" />)
    const toolbar = view.querySelector('[role="toolbar"]')

    expect(toolbar).not.toBeNull()
  })

  it('single selection mode toggles one item at a time', () => {
    const onValueChange = vi.fn()
    const view = render(
      <ToggleGroup items={sampleItems} type="single" onValueChange={onValueChange} />,
    )
    const buttons = view.querySelectorAll('button')

    act(() => {
      buttons[0]?.click()
    })

    expect(onValueChange).toHaveBeenCalledWith('bold')
    expect(buttons[0]?.getAttribute('aria-pressed')).toBe('true')
    expect(buttons[1]?.getAttribute('aria-pressed')).toBe('false')

    act(() => {
      buttons[1]?.click()
    })

    expect(onValueChange).toHaveBeenCalledWith('italic')
    expect(buttons[0]?.getAttribute('aria-pressed')).toBe('false')
    expect(buttons[1]?.getAttribute('aria-pressed')).toBe('true')
  })

  it('single selection deselects when clicking the same item', () => {
    const onValueChange = vi.fn()
    const view = render(
      <ToggleGroup items={sampleItems} type="single" onValueChange={onValueChange} />,
    )
    const buttons = view.querySelectorAll('button')

    act(() => {
      buttons[0]?.click()
    })
    expect(onValueChange).toHaveBeenCalledWith('bold')

    act(() => {
      buttons[0]?.click()
    })
    expect(onValueChange).toHaveBeenCalledWith('')
    expect(buttons[0]?.getAttribute('aria-pressed')).toBe('false')
  })

  it('multiple selection mode allows multiple items', () => {
    const onValueChange = vi.fn()
    const view = render(
      <ToggleGroup items={sampleItems} type="multiple" onValueChange={onValueChange} />,
    )
    const buttons = view.querySelectorAll('button')

    act(() => {
      buttons[0]?.click()
    })
    expect(onValueChange).toHaveBeenCalledWith(['bold'])

    act(() => {
      buttons[2]?.click()
    })
    expect(onValueChange).toHaveBeenCalledWith(['bold', 'underline'])

    expect(buttons[0]?.getAttribute('aria-pressed')).toBe('true')
    expect(buttons[1]?.getAttribute('aria-pressed')).toBe('false')
    expect(buttons[2]?.getAttribute('aria-pressed')).toBe('true')
  })

  it('multiple selection deselects an already selected item', () => {
    const onValueChange = vi.fn()
    const view = render(
      <ToggleGroup items={sampleItems} type="multiple" onValueChange={onValueChange} />,
    )
    const buttons = view.querySelectorAll('button')

    act(() => {
      buttons[0]?.click()
    })
    act(() => {
      buttons[1]?.click()
    })
    expect(onValueChange).toHaveBeenLastCalledWith(['bold', 'italic'])

    act(() => {
      buttons[0]?.click()
    })
    expect(onValueChange).toHaveBeenLastCalledWith(['italic'])
  })

  it('respects defaultValue in single mode', () => {
    const view = render(
      <ToggleGroup items={sampleItems} type="single" defaultValue="italic" />,
    )
    const buttons = view.querySelectorAll('button')

    expect(buttons[0]?.getAttribute('aria-pressed')).toBe('false')
    expect(buttons[1]?.getAttribute('aria-pressed')).toBe('true')
    expect(buttons[2]?.getAttribute('aria-pressed')).toBe('false')
  })

  it('respects defaultValue in multiple mode', () => {
    const view = render(
      <ToggleGroup items={sampleItems} type="multiple" defaultValue={['bold', 'underline']} />,
    )
    const buttons = view.querySelectorAll('button')

    expect(buttons[0]?.getAttribute('aria-pressed')).toBe('true')
    expect(buttons[1]?.getAttribute('aria-pressed')).toBe('false')
    expect(buttons[2]?.getAttribute('aria-pressed')).toBe('true')
  })

  it('controlled value works in single mode', () => {
    const onValueChange = vi.fn()
    const view = render(
      <ToggleGroup items={sampleItems} type="single" value="bold" onValueChange={onValueChange} />,
    )
    const buttons = view.querySelectorAll('button')

    expect(buttons[0]?.getAttribute('aria-pressed')).toBe('true')

    act(() => {
      buttons[1]?.click()
    })

    expect(onValueChange).toHaveBeenCalledWith('italic')
    // Value stays 'bold' because it's controlled
    expect(buttons[0]?.getAttribute('aria-pressed')).toBe('true')
    expect(buttons[1]?.getAttribute('aria-pressed')).toBe('false')
  })

  it('controlled value works in multiple mode', () => {
    const onValueChange = vi.fn()
    const view = render(
      <ToggleGroup
        items={sampleItems}
        type="multiple"
        value={['bold']}
        onValueChange={onValueChange}
      />,
    )
    const buttons = view.querySelectorAll('button')

    expect(buttons[0]?.getAttribute('aria-pressed')).toBe('true')

    act(() => {
      buttons[1]?.click()
    })

    expect(onValueChange).toHaveBeenCalledWith(['bold', 'italic'])
    // Value stays ['bold'] because it's controlled
    expect(buttons[0]?.getAttribute('aria-pressed')).toBe('true')
    expect(buttons[1]?.getAttribute('aria-pressed')).toBe('false')
  })

  it('group-level disabled prevents all interactions', () => {
    const onValueChange = vi.fn()
    const view = render(
      <ToggleGroup items={sampleItems} disabled onValueChange={onValueChange} />,
    )
    const buttons = view.querySelectorAll('button')

    buttons.forEach(btn => {
      expect(btn?.disabled).toBe(true)
    })

    act(() => {
      buttons[0]?.click()
    })

    expect(onValueChange).not.toHaveBeenCalled()
  })

  it('individual item disabled prop works', () => {
    const itemsWithDisabled = [
      { value: 'bold', label: 'Bold' },
      { value: 'italic', label: 'Italic', disabled: true },
      { value: 'underline', label: 'Underline' },
    ]
    const view = render(<ToggleGroup items={itemsWithDisabled} />)
    const buttons = view.querySelectorAll('button')

    expect(buttons[0]?.disabled).toBe(false)
    expect(buttons[1]?.disabled).toBe(true)
    expect(buttons[2]?.disabled).toBe(false)
  })

  it('applies horizontal orientation by default', () => {
    const view = render(<ToggleGroup items={sampleItems} />)
    const group = view.querySelector('[data-orientation="horizontal"]')

    expect(group).not.toBeNull()
    expect(group?.className).toContain('mr-toggle-group--horizontal')
  })

  it('applies vertical orientation', () => {
    const view = render(<ToggleGroup items={sampleItems} orientation="vertical" />)
    const group = view.querySelector('[data-orientation="vertical"]')

    expect(group).not.toBeNull()
    expect(group?.className).toContain('mr-toggle-group--vertical')
  })

  it('passes variant to toggle items', () => {
    const view = render(<ToggleGroup items={sampleItems} variant="outline" />)
    const buttons = view.querySelectorAll('button')

    buttons.forEach(btn => {
      expect(btn?.getAttribute('data-variant')).toBe('outline')
    })
  })

  it('passes size to toggle items', () => {
    const view = render(<ToggleGroup items={sampleItems} size="lg" />)
    const buttons = view.querySelectorAll('button')

    buttons.forEach(btn => {
      expect(btn?.getAttribute('data-size')).toBe('lg')
    })
  })

  it('renders empty items array without error', () => {
    const view = render(<ToggleGroup items={[]} />)
    const buttons = view.querySelectorAll('button')

    expect(buttons.length).toBe(0)
  })

  it('forwards refs to the root div', () => {
    const ref = { current: null as HTMLDivElement | null }

    render(<ToggleGroup items={sampleItems} ref={ref} />)

    expect(ref.current?.tagName).toBe('DIV')
  })

  it('applies custom className', () => {
    const view = render(<ToggleGroup items={sampleItems} className="custom-class" />)
    const group = view.querySelector('.mr-toggle-group')

    expect(group?.className).toContain('custom-class')
  })
})
