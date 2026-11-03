import { describe, expect, it } from 'vitest'
import { getLocaleFromPath, localizeHref, localizePath, stripLocaleFromPath } from './locales'

describe('locale paths', () => {
    it('detects the French locale only on the /fr prefix', () => {
        expect(getLocaleFromPath('/fr')).toBe('fr')
        expect(getLocaleFromPath('/fr/')).toBe('fr')
        expect(getLocaleFromPath('/fr/docs')).toBe('fr')
        expect(getLocaleFromPath('/france')).toBe('en')
        expect(getLocaleFromPath('/')).toBe('en')
        expect(getLocaleFromPath('/docs/button')).toBe('en')
    })

    it('strips the locale prefix while preserving the route', () => {
        expect(stripLocaleFromPath('/fr')).toBe('/')
        expect(stripLocaleFromPath('/fr/docs/button')).toBe('/docs/button')
        expect(stripLocaleFromPath('/docs/button')).toBe('/docs/button')
        expect(stripLocaleFromPath('/france')).toBe('/france')
    })

    it('localizes paths idempotently', () => {
        expect(localizePath('/', 'en')).toBe('/')
        expect(localizePath('/', 'fr')).toBe('/fr')
        expect(localizePath('/docs/button', 'fr')).toBe('/fr/docs/button')
        expect(localizePath('/fr/docs/button', 'fr')).toBe('/fr/docs/button')
        expect(localizePath('/fr/docs/button', 'en')).toBe('/docs/button')
    })

    it('preserves query strings and hashes', () => {
        expect(localizeHref('/docs/button', 'fr', '?tab=api', '#props')).toBe(
            '/fr/docs/button?tab=api#props'
        )
        expect(localizeHref('/fr/docs/button', 'en', '?tab=api', '#props')).toBe(
            '/docs/button?tab=api#props'
        )
    })
})
