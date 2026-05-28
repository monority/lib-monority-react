import { act, createRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { FormControl } from './FormControl'
import { useFormControl } from './useFormControl'

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

/* -- Helper component that reads context -- */

function ContextReader() {
  const ctx = useFormControl()
  return (
    <div data-testid="reader">
      <span data-testid="inputId">{ctx.inputId}</span>
      <span data-testid="hintId">{ctx.hintId ?? 'undefined'}</span>
      <span data-testid="errorId">{ctx.errorId ?? 'undefined'}</span>
      <span data-testid="describedBy">{ctx.describedBy ?? 'undefined'}</span>
      <span data-testid="size">{ctx.size}</span>
      <span data-testid="tone">{ctx.tone}</span>
      <span data-testid="isInvalid">{String(ctx.isInvalid)}</span>
      <span data-testid="isDisabled">{String(ctx.isDisabled)}</span>
      <span data-testid="isRequired">{String(ctx.isRequired)}</span>
    </div>
  )
}

describe('FormControl', () => {
  it('provides inputId, hintId, errorId, describedBy when hint/error are provided', () => {
    const view = render(
      <FormControl id="test" hint error>
        <ContextReader />
      </FormControl>,
    )
    expect(view.querySelector('[data-testid="inputId"]')?.textContent).toBe('test')
    expect(view.querySelector('[data-testid="hintId"]')?.textContent).toBe('test-hint')
    expect(view.querySelector('[data-testid="errorId"]')?.textContent).toBe('test-error')
    expect(view.querySelector('[data-testid="describedBy"]')?.textContent).toBe('test-hint test-error')
  })

  it('uses generated ID when id is not provided', () => {
    const view = render(
      <FormControl>
        <ContextReader />
      </FormControl>,
    )
    const inputId = view.querySelector('[data-testid="inputId"]')?.textContent
    expect(inputId).toBeTruthy()
    expect(inputId?.length).toBeGreaterThan(0)
  })

  it('uses provided ID when id is given', () => {
    const view = render(
      <FormControl id="my-custom-id">
        <ContextReader />
      </FormControl>,
    )
    expect(view.querySelector('[data-testid="inputId"]')?.textContent).toBe('my-custom-id')
  })

  it('hintId is undefined when hint=false', () => {
    const view = render(
      <FormControl id="test" hint={false}>
        <ContextReader />
      </FormControl>,
    )
    expect(view.querySelector('[data-testid="hintId"]')?.textContent).toBe('undefined')
  })

  it('errorId is undefined when error=false', () => {
    const view = render(
      <FormControl id="test" error={false}>
        <ContextReader />
      </FormControl>,
    )
    expect(view.querySelector('[data-testid="errorId"]')?.textContent).toBe('undefined')
  })

  it('describedBy combines hintId + errorId', () => {
    const view = render(
      <FormControl id="test" hint error>
        <ContextReader />
      </FormControl>,
    )
    expect(view.querySelector('[data-testid="describedBy"]')?.textContent).toBe('test-hint test-error')
  })

  it('describedBy is undefined when neither hint nor error', () => {
    const view = render(
      <FormControl id="test">
        <ContextReader />
      </FormControl>,
    )
    expect(view.querySelector('[data-testid="describedBy"]')?.textContent).toBe('undefined')
  })

  it('default values: size=md, tone=neutral, isInvalid=false, isDisabled=false, isRequired=false', () => {
    const view = render(
      <FormControl id="test">
        <ContextReader />
      </FormControl>,
    )
    expect(view.querySelector('[data-testid="size"]')?.textContent).toBe('md')
    expect(view.querySelector('[data-testid="tone"]')?.textContent).toBe('neutral')
    expect(view.querySelector('[data-testid="isInvalid"]')?.textContent).toBe('false')
    expect(view.querySelector('[data-testid="isDisabled"]')?.textContent).toBe('false')
    expect(view.querySelector('[data-testid="isRequired"]')?.textContent).toBe('false')
  })

  it('isInvalid = invalid ?? Boolean(error) — error=true, invalid not set → isInvalid=true', () => {
    const view = render(
      <FormControl id="test" error>
        <ContextReader />
      </FormControl>,
    )
    expect(view.querySelector('[data-testid="isInvalid"]')?.textContent).toBe('true')
  })

  it('isInvalid = invalid ?? Boolean(error) — invalid=true overrides error=false', () => {
    const view = render(
      <FormControl id="test" invalid error={false}>
        <ContextReader />
      </FormControl>,
    )
    expect(view.querySelector('[data-testid="isInvalid"]')?.textContent).toBe('true')
  })

  it('isInvalid = invalid ?? Boolean(error) — invalid=false overrides error=true', () => {
    const view = render(
      <FormControl id="test" invalid={false} error>
        <ContextReader />
      </FormControl>,
    )
    expect(view.querySelector('[data-testid="isInvalid"]')?.textContent).toBe('false')
  })

  it('can override size', () => {
    const view = render(
      <FormControl id="test" size="lg">
        <ContextReader />
      </FormControl>,
    )
    expect(view.querySelector('[data-testid="size"]')?.textContent).toBe('lg')
  })

  it('can override tone', () => {
    const view = render(
      <FormControl id="test" tone="danger">
        <ContextReader />
      </FormControl>,
    )
    expect(view.querySelector('[data-testid="tone"]')?.textContent).toBe('danger')
  })

  it('can override disabled', () => {
    const view = render(
      <FormControl id="test" disabled>
        <ContextReader />
      </FormControl>,
    )
    expect(view.querySelector('[data-testid="isDisabled"]')?.textContent).toBe('true')
  })

  it('can override required', () => {
    const view = render(
      <FormControl id="test" required>
        <ContextReader />
      </FormControl>,
    )
    expect(view.querySelector('[data-testid="isRequired"]')?.textContent).toBe('true')
  })
})

describe('useFormControl', () => {
  it('returns defaults outside provider', () => {
    const view = render(<ContextReader />)
    expect(view.querySelector('[data-testid="inputId"]')?.textContent).toBe('')
    expect(view.querySelector('[data-testid="hintId"]')?.textContent).toBe('undefined')
    expect(view.querySelector('[data-testid="errorId"]')?.textContent).toBe('undefined')
    expect(view.querySelector('[data-testid="describedBy"]')?.textContent).toBe('undefined')
    expect(view.querySelector('[data-testid="size"]')?.textContent).toBe('md')
    expect(view.querySelector('[data-testid="tone"]')?.textContent).toBe('neutral')
    expect(view.querySelector('[data-testid="isInvalid"]')?.textContent).toBe('false')
    expect(view.querySelector('[data-testid="isDisabled"]')?.textContent).toBe('false')
    expect(view.querySelector('[data-testid="isRequired"]')?.textContent).toBe('false')
  })
})
