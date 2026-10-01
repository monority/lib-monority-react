import type { ComponentPropsWithoutRef } from 'react'
import type { ResolvedThemeName } from '../lib/constants'

/**
 * Les 7 thèmes résolvables, dérivés de `ThemeName`. `system` est une préférence
 * et `dim` un alias migré : ni l'un ni l'autre ne se rend dans un sous-arbre.
 */
export type ThemeScopeTheme = ResolvedThemeName
export type ThemeScopeBrand = 'studio'
export type ThemeScopeDensity = 'comfortable' | 'compact'

type ThemeScopeBaseProps = Omit<
    ComponentPropsWithoutRef<'div'>,
    'color' | 'data-brand' | 'data-density' | 'data-theme'
> & {
    density?: ThemeScopeDensity
}

export type ThemeScopeProps = ThemeScopeBaseProps &
    (
        | { brand: ThemeScopeBrand; theme: ThemeScopeTheme }
        | { brand?: undefined; theme?: ThemeScopeTheme }
    )

/** Limite un thème, une marque et une densité à un sous-arbre React. */
export function ThemeScope({ brand, children, density, theme, ...props }: ThemeScopeProps) {
    return (
        <div data-brand={brand} data-density={density} data-theme={theme} {...props}>
            {children}
        </div>
    )
}
