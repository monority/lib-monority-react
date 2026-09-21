import { act } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { Input } from '../components/forms/input/Input'
import { Textarea } from '../components/forms/textarea/Textarea'
import { Select } from '../components/forms/select/Select'
import { Checkbox } from '../components/forms/checkbox/Checkbox'
import { Switch } from '../components/forms/switch/Switch'
import { RadioGroup } from '../components/forms/radio-group/RadioGroup'
import { Slider } from '../components/forms/slider/Slider'
import { Accordion } from '../components/display/accordion/Accordion'
import { Avatar } from '../components/display/avatar/Avatar'
import { Progress } from '../components/feedback/progress/Progress'

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

// ─────────────────────────────────────────────────────────────────────────────
// Step 09 contract tests — lock the audited public API decisions in place.
// ─────────────────────────────────────────────────────────────────────────────

describe('Step 09 · void-element controls do not accept children', () => {
  it('Input drops children instead of crashing on the <input> void element', () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {})
    let threw: unknown
    try {
      // Cast on purpose: JS consumers can still pass children, the component
      // must stay safe rather than throw a React void-element error.
      render(<Input {...({ children: 'should-not-render' } as object)} />)
    } catch (e) {
      threw = e
    }
    const messages = error.mock.calls.map((call) => String(call[0])).join('\n')
    error.mockRestore()

    expect(threw).toBeUndefined()
    expect(messages).not.toContain('void element')
    expect(container?.querySelector('input')).toBeTruthy()
    expect(container?.textContent).toBe('')
  })
})

describe('Step 09 · form family shares the invalid contract', () => {
  it('Input marks aria-invalid from invalid without an error message', () => {
    const view = render(<Input invalid />)
    expect(view.querySelector('input')?.getAttribute('aria-invalid')).toBe('true')
    expect(view.querySelector('input')?.getAttribute('data-invalid')).toBe('true')
  })

  it('Textarea marks aria-invalid from invalid without an error message', () => {
    const view = render(<Textarea invalid />)
    expect(view.querySelector('textarea')?.getAttribute('aria-invalid')).toBe('true')
  })

  it('Select marks aria-invalid from invalid without an error message', () => {
    const view = render(<Select invalid />)
    expect(view.querySelector('select')?.getAttribute('aria-invalid')).toBe('true')
  })

  it('Checkbox marks aria-invalid from invalid without an error message', () => {
    const view = render(<Checkbox invalid />)
    expect(view.querySelector('input')?.getAttribute('aria-invalid')).toBe('true')
  })

  it('Switch marks aria-invalid from invalid without an error message', () => {
    const view = render(<Switch invalid />)
    expect(view.querySelector('input')?.getAttribute('aria-invalid')).toBe('true')
  })

  it('Slider marks aria-invalid from invalid without an error message', () => {
    const view = render(<Slider invalid />)
    expect(view.querySelector('input[type="range"]')?.getAttribute('aria-invalid')).toBe('true')
    expect(view.querySelector('input[type="range"]')?.className).toContain('mr-slider--error')
  })

  it('RadioGroup marks aria-invalid from invalid without an error message', () => {
    const view = render(<RadioGroup invalid items={[{ value: 'a', label: 'A' }]} />)
    expect(view.querySelector('[role="radiogroup"]')?.getAttribute('aria-invalid')).toBe('true')
  })
})

describe('Step 09 · native prop forwarding', () => {
  it('Input forwards name, placeholder, disabled, required, aria and data props', () => {
    const view = render(
      <Input
        name="email"
        placeholder="you@acme.dev"
        disabled
        required
        aria-describedby="hint"
        data-track="signup"
      />,
    )
    const input = view.querySelector('input')
    expect(input?.getAttribute('name')).toBe('email')
    expect(input?.getAttribute('placeholder')).toBe('you@acme.dev')
    expect(input?.disabled).toBe(true)
    expect(input?.required).toBe(true)
    expect(input?.getAttribute('aria-describedby')).toContain('hint')
    expect(input?.getAttribute('data-track')).toBe('signup')
  })

  it('Textarea forwards name, placeholder, rows and maxLength', () => {
    const view = render(<Textarea name="bio" placeholder="Tell us" rows={4} maxLength={120} />)
    const textarea = view.querySelector('textarea')
    expect(textarea?.getAttribute('name')).toBe('bio')
    expect(textarea?.getAttribute('placeholder')).toBe('Tell us')
    expect(textarea?.getAttribute('rows')).toBe('4')
    expect(textarea?.getAttribute('maxlength')).toBe('120')
  })
})

describe('Step 09 · resolved data-size styling hooks', () => {
  it('Accordion always emits a data-size, defaulting to md', () => {
    const view = render(<Accordion items={[{ value: 'a', title: 'A', content: 'a' }]} />)
    expect(view.querySelector('.mr-accordion')?.getAttribute('data-size')).toBe('md')
  })

  it('Accordion emits the requested data-size', () => {
    const view = render(
      <Accordion size="lg" items={[{ value: 'a', title: 'A', content: 'a' }]} />,
    )
    expect(view.querySelector('.mr-accordion')?.getAttribute('data-size')).toBe('lg')
  })

  it('Avatar always emits a data-size, defaulting to md', () => {
    const view = render(<Avatar name="Avery Stone" />)
    expect(view.querySelector('.mr-avatar')?.getAttribute('data-size')).toBe('md')
  })

  it('Avatar emits the requested data-size', () => {
    const view = render(<Avatar name="Avery Stone" size="lg" />)
    expect(view.querySelector('.mr-avatar')?.getAttribute('data-size')).toBe('lg')
  })
})

describe('Step 09 · Progress accessible name', () => {
  it('links a ReactNode label through aria-labelledby instead of "Progress"', () => {
    const view = render(<Progress value={40} label={<span>Upload</span>} />)
    const bar = view.querySelector('[role="progressbar"]')
    const label = view.querySelector('.mr-progress__label')
    expect(label?.id).toBeTruthy()
    expect(bar?.getAttribute('aria-labelledby')).toBe(label?.id)
    expect(bar?.getAttribute('aria-label')).toBeNull()
  })

  it('falls back to a generic name when no label is provided', () => {
    const view = render(<Progress value={40} showValue={false} />)
    const bar = view.querySelector('[role="progressbar"]')
    expect(bar?.getAttribute('aria-labelledby')).toBeNull()
    expect(bar?.getAttribute('aria-label')).toBe('Progress')
  })
})
