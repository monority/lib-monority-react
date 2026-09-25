import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { DesignProvider } from './design-provider'
import { DEFAULT_DESIGN_CONFIG } from '../lib/design-config'

describe('DesignProvider', () => {
  it('applies the selected axes as data attributes and CSS variables', () => {
    render(
      <DesignProvider config={{ ...DEFAULT_DESIGN_CONFIG, accent: 'violet', radius: 'sharp', spacing: 'airy' }}>
        <span data-testid="content">Preview</span>
      </DesignProvider>,
    )
    const root = screen.getByTestId('content').parentElement as HTMLElement
    expect(root.getAttribute('data-design-accent')).toBe('violet')
    expect(root.getAttribute('data-design-radius')).toBe('sharp')
    expect(root.getAttribute('data-design-spacing')).toBe('airy')
    expect(root.style.getPropertyValue('--mr-brand-hue')).toBe('295')
    expect(root.style.getPropertyValue('--mr-radius-control')).toBe('2px')
    expect(root.style.getPropertyValue('--mr-spacing-4')).toBe('20px')
  })
})
