import { act, createRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { RadioGroup } from './RadioGroup'

let container: HTMLDivElement | null = null
let root: Root | null = null

function render(ui: ReactElement) {
  container = document.createElement('div')
  document.body.appendChild(container)
  root = createRoot(container)
  act(() => { root?.render(ui) })
  return container
}

afterEach(() => {
  act(() => { root?.unmount() })
  container?.remove()
  root = null
  container = null
})

const items = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
]

describe('RadioGroup', () => {
  it('renders with accent tone by default', () => {
    const view = render(<RadioGroup label="Choose" items={items} />)
    const group = view.querySelector('[role="radiogroup"]')
    expect(group?.getAttribute('data-tone')).toBe('accent')
    expect(group?.className).toContain('mr-radio-group--accent')
  })

  it('renders all radio items with correct labels', () => {
    const view = render(<RadioGroup items={items} />)
    expect(view.querySelectorAll('.mr-radio__label')).toHaveLength(2)
    expect(view.querySelectorAll('.mr-radio__label')[0].textContent).toBe('Yes')
  })

  it('renders radio inputs with type="radio" and shared name', () => {
    const view = render(<RadioGroup items={items} />)
    const inputs = view.querySelectorAll('input[type="radio"]')
    expect(inputs).toHaveLength(2)
    expect(inputs[0].getAttribute('name')).toBe(inputs[1].getAttribute('name'))
  })

  it('uses defaultValue to pre-select an item', () => {
    const view = render(<RadioGroup items={items} defaultValue="no" />)
    const inputs = view.querySelectorAll('input[type="radio"]')
    expect(inputs[0].checked).toBe(false)
    expect(inputs[1].checked).toBe(true)
  })

  it('respects controlled value over defaultValue', () => {
    const view = render(<RadioGroup items={items} value="yes" defaultValue="no" />)
    const inputs = view.querySelectorAll('input[type="radio"]')
    expect(inputs[0].checked).toBe(true)
    expect(inputs[1].checked).toBe(false)
  })

  it('marks checked item with data-checked and class', () => {
    const view = render(<RadioGroup items={items} value="yes" />)
    const labels = view.querySelectorAll('.mr-radio')
    expect(labels[0].getAttribute('data-checked')).toBe('true')
    expect(labels[0].className).toContain('mr-radio--checked')
    expect(labels[1].getAttribute('data-checked')).toBeNull()
  })

  it('applies disabled state to group and all items', () => {
    const view = render(<RadioGroup items={items} disabled />)
    const group = view.querySelector('[role="radiogroup"]')
    expect(group?.getAttribute('data-disabled')).toBe('true')
    expect(group?.className).toContain('mr-radio-group--disabled')
    view.querySelectorAll('input[type="radio"]').forEach(i => expect(i.disabled).toBe(true))
  })

  it('applies invalid state from explicit prop', () => {
    const view = render(<RadioGroup items={items} invalid />)
    const group = view.querySelector('[role="radiogroup"]')
    expect(group?.getAttribute('data-invalid')).toBe('true')
    expect(group?.getAttribute('aria-invalid')).toBe('true')
  })

  it('infers invalid from error prop', () => {
    const view = render(<RadioGroup items={items} error="Required" />)
    expect(view.querySelector('[role="radiogroup"]')?.getAttribute('data-invalid')).toBe('true')
  })

  it('applies tones', () => {
    expect(render(<RadioGroup tone="danger" items={items} />).querySelector('[role="radiogroup"]')?.getAttribute('data-tone')).toBe('danger')
    expect(render(<RadioGroup tone="neutral" items={items} />).querySelector('[role="radiogroup"]')?.getAttribute('data-tone')).toBe('neutral')
  })

  it('forwards ref to the radiogroup container div', () => {
    const ref = createRef<HTMLDivElement>()
    render(<RadioGroup ref={ref} items={items} />)
    expect(ref.current?.tagName).toBe('DIV')
    expect(ref.current?.getAttribute('role')).toBe('radiogroup')
  })

  it('sets aria-describedby when hint or error are provided', () => {
    const view = render(<RadioGroup items={items} hint="Select one" error="Required" />)
    const describedBy = view.querySelector('[role="radiogroup"]')?.getAttribute('aria-describedby')
    expect(describedBy).toContain('-hint')
    expect(describedBy).toContain('-error')
    expect(view.querySelector('.mr-field__hint')?.textContent).toBe('Select one')
    expect(view.querySelector('.mr-field__error')?.textContent).toBe('Required')
  })

  it('associates the group label with the radiogroup', () => {
    const view = render(<RadioGroup id="choice" label="Choose" items={items} />)
    const group = view.querySelector('[role="radiogroup"]')
    const label = view.querySelector('label')
    expect(group?.getAttribute('aria-labelledby')).toBe('choice-label')
    expect(label?.getAttribute('id')).toBe('choice-label')
    expect(label?.getAttribute('for')).toBe('choice-yes')
  })

  it('exposes disabled state on the group', () => {
    const view = render(<RadioGroup items={items} disabled />)
    expect(view.querySelector('[role="radiogroup"]')?.getAttribute('aria-disabled')).toBe('true')
  })

  it('calls onChange with the selected value', () => {
    let selected = ''
    const view = render(<RadioGroup items={items} onChange={(v) => { selected = v }} />)
    const input = view.querySelectorAll('input[type="radio"]')[1] as HTMLInputElement
    act(() => { input.click() })
    expect(selected).toBe('no')
  })

  it('renders item descriptions when provided', () => {
    const view = render(<RadioGroup items={[{ value: 'a', label: 'A', description: 'First' }, { value: 'b', label: 'B' }]} />)
    expect(view.querySelectorAll('.mr-radio__description')).toHaveLength(1)
    expect(view.querySelector('.mr-radio__description')?.textContent).toBe('First')
  })
})
