import type { ComponentPropsWithoutRef } from 'react'

export type ThemeScopeTheme =
    | 'light'
    | 'dark'
    | 'dim'
    | 'slate'
    | 'oled'
    | 'ocean'
    | 'night'
    | 'high-contrast'
export type ThemeScopeBrand = 'studio'
export type ThemeScopeDensity = 'comfortable' | 'compact' | 'spacious' | 'default'

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
    const resolvedDensity = density === 'default' ? 'comfortable' : density
    return (
        <div data-brand={brand} data-density={resolvedDensity} data-theme={theme} {...props}>
            {children}
        </div>
    )
}
