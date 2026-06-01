import { act, createRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from './Field'

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

describe('Field', () => {
  it('renders with label, hint, and error', () => {
    const view = render(
      <Field label="Name" hint="Enter your name" error="Required">
        <input />
      </Field>,
    )
    expect(view.querySelector('.mr-field__label')?.textContent).toBe('Name')
    expect(view.querySelector('.mr-field__hint')?.textContent).toBe('Enter your name')
    expect(view.querySelector('.mr-field__error')?.textContent).toBe('Required')
  })

  it('shows required asterisk when required=true', () => {
    const view = render(<Field label="Email" required />)
    const required = view.querySelector('.mr-field__required')
    expect(required).not.toBeNull()
    expect(required?.textContent).toBe(' *')
  })

  it('does not show required asterisk when required=false', () => {
    const view = render(<Field label="Email" />)
    expect(view.querySelector('.mr-field__required')).toBeNull()
  })

  it('applies htmlFor to label', () => {
    const view = render(<Field label="Name" htmlFor="my-input" />)
    expect(view.querySelector('label')?.getAttribute('for')).toBe('my-input')
  })

  it('applies hintId and errorId', () => {
    const view = render(
      <Field hint="hint" error="err" hintId="h1" errorId="e1" />,
    )
    expect(view.querySelector('.mr-field__hint')?.id).toBe('h1')
    expect(view.querySelector('.mr-field__error')?.id).toBe('e1')
  })

  it('renders error with role=alert and aria-live=assertive', () => {
    const view = render(<Field error="Bad value" />)
    const error = view.querySelector('.mr-field__error')
    expect(error?.getAttribute('role')).toBe('alert')
    expect(error?.getAttribute('aria-live')).toBe('assertive')
  })

  it('applies custom className', () => {
    const view = render(<Field className="custom-class" />)
    expect(view.querySelector('.mr-field')?.classList.contains('custom-class')).toBe(true)
  })

  it('renders children', () => {
    const view = render(<Field><span data-testid="child">hello</span></Field>)
    expect(view.querySelector('[data-testid="child"]')?.textContent).toBe('hello')
  })

  it('omits label/hint/error when not provided', () => {
    const view = render(<Field />)
    expect(view.querySelector('.mr-field__label')).toBeNull()
    expect(view.querySelector('.mr-field__hint')).toBeNull()
    expect(view.querySelector('.mr-field__error')).toBeNull()
  })
})

describe('FieldLabel', () => {
  it('renders as label element', () => {
    const view = render(<FieldLabel>Test</FieldLabel>)
    expect(view.querySelector('label')).not.toBeNull()
  })

  it('shows required asterisk', () => {
    const view = render(<FieldLabel required>Required</FieldLabel>)
    expect(view.querySelector('.mr-field__required')?.textContent).toBe(' *')
  })

  it('forwards ref', () => {
    const ref = createRef<HTMLLabelElement>()
    render(<FieldLabel ref={ref}>Ref test</FieldLabel>)
    expect(ref.current?.tagName).toBe('LABEL')
  })
})

describe('FieldContent', () => {
  it('renders as div with content', () => {
    const view = render(<FieldContent><span>inner</span></FieldContent>)
    expect(view.querySelector('.mr-field__content')?.textContent).toBe('inner')
  })

  it('forwards ref', () => {
    const ref = createRef<HTMLDivElement>()
    render(<FieldContent ref={ref} />)
    expect(ref.current?.tagName).toBe('DIV')
  })
})

describe('FieldDescription', () => {
  it('renders as span with hint class', () => {
    const view = render(<FieldDescription>Help text</FieldDescription>)
    expect(view.querySelector('span.mr-field__hint')?.textContent).toBe('Help text')
  })

  it('forwards ref', () => {
    const ref = createRef<HTMLSpanElement>()
    render(<FieldDescription ref={ref} />)
    expect(ref.current?.tagName).toBe('SPAN')
  })
})

describe('FieldError', () => {
  it('renders with role=alert', () => {
    const view = render(<FieldError>Something went wrong</FieldError>)
    const el = view.querySelector('span.mr-field__error')
    expect(el?.getAttribute('role')).toBe('alert')
    expect(el?.getAttribute('aria-live')).toBe('assertive')
  })

  it('forwards ref', () => {
    const ref = createRef<HTMLSpanElement>()
    render(<FieldError ref={ref} />)
    expect(ref.current?.tagName).toBe('SPAN')
  })
})

describe('FieldGroup', () => {
  it('renders with column direction by default', () => {
    const view = render(<FieldGroup><span>a</span><span>b</span></FieldGroup>)
    const el = view.querySelector('.mr-field__group')
    expect(el?.classList.contains('mr-field__group--column')).toBe(true)
  })

  it('renders with row direction', () => {
    const view = render(<FieldGroup direction="row"><span>a</span></FieldGroup>)
    expect(view.querySelector('.mr-field__group--row')).not.toBeNull()
  })
})

describe('FieldLegend', () => {
  it('renders as legend element', () => {
    const view = render(<FieldLegend>Legend</FieldLegend>)
    expect(view.querySelector('legend')).not.toBeNull()
  })

  it('shows required asterisk', () => {
    const view = render(<FieldLegend required>Required</FieldLegend>)
    expect(view.querySelector('.mr-field__required')).not.toBeNull()
  })
})

describe('FieldSeparator', () => {
  it('renders as hr element', () => {
    const view = render(<FieldSeparator />)
    expect(view.querySelector('hr.mr-field__separator')).not.toBeNull()
  })
})

describe('FieldSet', () => {
  it('renders as fieldset element', () => {
    const view = render(<FieldSet><span>content</span></FieldSet>)
    expect(view.querySelector('fieldset.mr-field__set')).not.toBeNull()
  })
})

describe('FieldTitle', () => {
  it('renders as h3 by default', () => {
    const view = render(<FieldTitle>Title</FieldTitle>)
    expect(view.querySelector('h3.mr-field__title')).not.toBeNull()
  })

  it('renders as specified heading level', () => {
    const view = render(<FieldTitle as="h2">Title</FieldTitle>)
    expect(view.querySelector('h2.mr-field__title')).not.toBeNull()
  })
})
