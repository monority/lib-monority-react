import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { THEME_STORAGE_KEY, ThemeName } from '../lib/constants'
import { getThemeScript } from './get-theme-script'

const REPO_ROOT = path.resolve(import.meta.dirname, '../../../..')

function setMatchMedia({ contrast = false, dark = false }: { contrast?: boolean; dark?: boolean }) {
    vi.stubGlobal(
        'matchMedia',
        vi.fn((query: string) => ({
            matches: query.includes('prefers-contrast')
                ? contrast
                : query.includes('dark')
                  ? dark
                  : false,
        }))
    )
}

function runScript(script: string) {
    new Function(script)()
}

describe('getThemeScript', () => {
    beforeEach(() => {
        localStorage.clear()
        delete document.documentElement.dataset.theme
        delete document.documentElement.dataset.themeChoice
        document.documentElement.style.colorScheme = ''
        setMatchMedia({})
    })

    afterEach(() => {
        vi.restoreAllMocks()
        vi.unstubAllGlobals()
    })

    it('reste sous 1 Ko et applique le thème stocké avant le rendu', () => {
        localStorage.setItem(THEME_STORAGE_KEY, 'dark')

        const script = getThemeScript()
        expect(new Blob([script]).size).toBeLessThan(1024)
        runScript(script)

        expect(document.documentElement.dataset.theme).toBe('dark')
        expect(document.documentElement.dataset.themeChoice).toBe('dark')
        expect(document.documentElement.style.colorScheme).toBe('dark')
    })

    it('migre dim vers dark et réécrit la valeur', () => {
        localStorage.setItem(THEME_STORAGE_KEY, 'dim')
        runScript(getThemeScript())

        expect(document.documentElement.dataset.theme).toBe('dark')
        expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark')
    })

    it('résout system vers high-contrast avec prefers-contrast: more', () => {
        localStorage.setItem(THEME_STORAGE_KEY, 'system')
        setMatchMedia({ contrast: true, dark: false })
        runScript(getThemeScript())

        expect(document.documentElement.dataset.theme).toBe('high-contrast')
        expect(document.documentElement.dataset.themeChoice).toBe('system')
    })

    it('utilise prefers-color-scheme quand le contraste élevé est absent', () => {
        localStorage.setItem(THEME_STORAGE_KEY, 'system')
        setMatchMedia({ contrast: false, dark: true })
        runScript(getThemeScript())

        expect(document.documentElement.dataset.theme).toBe('dark')
    })

    it('accepte une clé de stockage personnalisée', () => {
        localStorage.setItem('custom-theme', 'oled')
        runScript(getThemeScript({ storageKey: 'custom-theme' }))

        expect(document.documentElement.dataset.theme).toBe('oled')
    })

    it('utilise Dark comme thème par défaut quand aucun choix n’est stocké', () => {
        runScript(getThemeScript())
        expect(document.documentElement.dataset.theme).toBe('dark')
        expect(document.documentElement.dataset.themeChoice).toBe('dark')
    })

    it('accepte Ocean et Night', () => {
        for (const theme of ['ocean', 'night'] as const) {
            localStorage.setItem(THEME_STORAGE_KEY, theme)
            runScript(getThemeScript())
            expect(document.documentElement.dataset.theme).toBe(theme)
        }
    })

    it('se replie sur Dark si le stockage est inaccessible', () => {
        vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
            throw new Error('storage denied')
        })

        expect(() => runScript(getThemeScript())).not.toThrow()
        expect(document.documentElement.dataset.theme).toBe('dark')
    })
})

describe('getThemeScript — liste de thèmes', () => {
    /**
     * La liste est une chaîne à l'intérieur d'une chaîne de template : elle
     * n'apparaît dans aucun AST importable. On la récupère donc par la forme,
     * ce qui est précisément le piège que ce test documente.
     */
    function storedThemeList(): string[] {
        const script = getThemeScript()
        const found = /!(\[("[^"]+"(?:,"[^"]+")*)\])\.includes\(s\)/.exec(script)
        if (!found) throw new Error('liste de thèmes introuvable dans le script généré')
        return [...found[1].matchAll(/"([^"]+)"/g)].map((m) => m[1])
    }

    it('accepte tous les thèmes du disque', () => {
        const themesOnDisk = fs
            .readdirSync(path.join(REPO_ROOT, 'packages/tokens/src/themes'))
            .filter((f) => f.endsWith('.json'))
            .map((f) => f.replace(/\.json$/, ''))
            .sort()
        expect(themesOnDisk.length).toBeGreaterThan(0)
        for (const theme of themesOnDisk) {
            expect(storedThemeList(), `le thème « ${theme} » doit être stockable`).toContain(theme)
        }
    })

    it('n contient aucun nom hors de la constante ThemeName', () => {
        const autorises = new Set(Object.values(ThemeName))
        for (const nom of storedThemeList()) {
            expect(autorises.has(nom as ThemeName), `« ${nom} » n est pas un ThemeName`).toBe(true)
        }
    })

    it('traite system comme une préférence, jamais comme un thème', () => {
        // `system` est stockable...
        expect(storedThemeList()).toContain(ThemeName.SYSTEM)
        // ...mais il n'est pas un fichier de thème...
        expect(fs.readdirSync(path.join(REPO_ROOT, 'packages/tokens/src/themes'))).not.toContain(
            `${ThemeName.SYSTEM}.json`
        )
        // ...et il est résolu par la branche conditionnelle, jamais rendu tel quel.
        expect(getThemeScript()).toContain('==="system"?')
    })

    it('exclut dim de la liste stockable, la migration precedant le controle', () => {
        // `dim` est migré vers `dark` avant le test d'appartenance : le garder
        // dans la liste rendrait la migration inobservable.
        expect(storedThemeList()).not.toContain(ThemeName.DIM)
        expect(getThemeScript()).toContain('if(s==="dim")s="dark"')
    })
})
