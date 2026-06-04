import { createRef } from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Section } from './Section'

describe('Section', () => {
  it('renders a section element by default', () => {
    const { container } = render(<Section />)
    expect(container.querySelector('section')).toBeTruthy()
  })

  it('renders children', () => {
    render(<Section><span data-testid="child">content</span></Section>)
    expect(screen.getByTestId('child')).toBeTruthy()
  })

  it('applies default spacing md', () => {
    const { container } = render(<Section />)
    expect(container.querySelector('.mr-section--md')).toBeTruthy()
  })

  it('applies spacing variants', () => {
    const spacings = ['sm', 'md', 'lg', 'xl'] as const
    for (const s of spacings) {
      const { container, unmount } = render(<Section spacing={s} />)
      expect(container.querySelector(`.mr-section--${s}`)).toBeTruthy()
      unmount()
    }
  })

  it('applies variant classes', () => {
    const variants = ['bordered', 'muted', 'card'] as const
    for (const v of variants) {
      const { container, unmount } = render(<Section variant={v} />)
      expect(container.querySelector(`.mr-section--${v}`)).toBeTruthy()
      unmount()
    }
  })

  it('forwards ref', () => {
    const ref = createRef<HTMLElement>()
    render(<Section ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLElement)
  })

  it('renders as polymorphic element', () => {
    const { container } = render(<Section as="article" />)
    expect(container.querySelector('article')).toBeTruthy()
  })

  it('renders as div when as="div"', () => {
    const { container } = render(<Section as="div" />)
    expect(container.querySelector('div')).toBeTruthy()
  })

  it('renders title', () => {
    render(<Section title="My Title" />)
    expect(screen.getByText('My Title')).toBeTruthy()
  })

  it('does not render title when not provided', () => {
    const { container } = render(<Section>No title</Section>)
    expect(container.querySelector('h2')).toBeNull()
  })

  it('merges className', () => {
    const { container } = render(<Section className="custom-class" />)
    const el = container.firstChild as HTMLElement
    expect(el.className).toContain('custom-class')
    expect(el.className).toContain('mr-section')
  })

  it('sets data-spacing attribute', () => {
    const { container } = render(<Section spacing="lg" />)
    expect(container.querySelector('[data-spacing="lg"]')).toBeTruthy()
  })

  it('sets data-variant attribute', () => {
    const { container } = render(<Section variant="card" />)
    expect(container.querySelector('[data-variant="card"]')).toBeTruthy()
  })

  it('renders as aside when as="aside"', () => {
    const { container } = render(<Section as="aside" />)
    expect(container.querySelector('aside')).toBeTruthy()
  })

  it.each(['sm', 'md', 'lg', 'xl'] as const)(
    'sets data-spacing="%s" for spacing="%s"',
    (spacing) => {
      const { container } = render(<Section spacing={spacing} />)
      expect((container.firstChild as HTMLElement).getAttribute('data-spacing')).toBe(spacing)
    },
  )

  it.each(['default', 'bordered', 'muted', 'card'] as const)(
    'sets data-variant="%s" for variant="%s"',
    (variant) => {
      const { container } = render(<Section variant={variant} />)
      expect((container.firstChild as HTMLElement).getAttribute('data-variant')).toBe(variant)
    },
  )

  it('renders title as h3 when titleAs="h3"', () => {
    render(<Section title="Section" titleAs="h3" />)
    const heading = screen.getByText('Section')
    expect(heading.tagName).toBe('H3')
  })

  it('does not set role by default', () => {
    const { container } = render(<Section />)
    const el = container.firstChild as HTMLElement
    expect(el.hasAttribute('role')).toBe(false)
  })
})
