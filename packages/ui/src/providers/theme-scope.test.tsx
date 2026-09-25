import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ThemeScope } from './index'

describe('ThemeScope', () => {
  it('applique thème, marque et densité sur le conteneur', () => {
    render(
      <ThemeScope theme="dark" brand="studio" density="compact" data-testid="scope">
        <span>Contenu</span>
      </ThemeScope>,
    )

    const scope = screen.getByTestId('scope')
    expect(scope.tagName).toBe('DIV')
    expect(scope.dataset).toMatchObject({
      theme: 'dark',
      brand: 'studio',
      density: 'compact',
    })
  })

  it('accepte un sous-arbre sans marque', () => {
    render(
      <ThemeScope theme="high-contrast" density="comfortable" data-testid="scope">
        Contenu
      </ThemeScope>,
    )

    expect(screen.getByTestId('scope').dataset.theme).toBe('high-contrast')
    expect(screen.getByTestId('scope').dataset.brand).toBeUndefined()
  })

  it('exige un thème concret lorsque brand est fourni', () => {
    // @ts-expect-error brand sans theme est interdit par le contrat public
    render(<ThemeScope brand="studio">Contenu</ThemeScope>)
  })
})
