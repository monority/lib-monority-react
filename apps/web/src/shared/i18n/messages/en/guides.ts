export type ArchitecturePillarIcon = 'layers' | 'tokens' | 'accessibility' | 'modular'

export interface ArchitecturePillar {
    icon: ArchitecturePillarIcon
    tag: string
    title: string
    description: string
}

export const guides = {
    introduction: {
        hero: {
            kicker: 'Monority UI',
            title: 'Introduction',
            description:
                'A React 19 component infrastructure powered by native CSS cascade layers and OKLCH design tokens. Build calm, accessible, runtime-themeable interfaces without specificity debt.',
            installCta: 'Installation guide',
            exploreCta: 'Browse components',
        },
        telemetry: {
            ariaLabel: 'Design system specifications',
            componentsLabel: 'Components',
            componentsDetail: '11 documented families',
            themesValue: '7',
            themesLabel: 'OKLCH themes',
            themesDetail: 'Runtime + high-contrast',
            layersValue: '6',
            layersLabel: 'CSS @layers',
            layersDetail: 'mr.reset to mr.utilities',
            reactValue: '19',
            reactLabel: 'React & strict TS',
            reactDetail: 'Native ref prop · WAI-ARIA',
        },
        architecture: {
            kicker: 'Engineering contracts',
            title: 'Core architecture',
            description:
                'Every primitive follows four non-negotiable foundations designed to scale across complex products without fighting the cascade.',
            pillars: [
                {
                    icon: 'layers',
                    tag: '@layer mr.*',
                    title: 'Deterministic CSS @layer cascade',
                    description:
                        'All library styles live inside six ordered layers (mr.reset through mr.utilities). Unlayered application styles naturally win with zero !important.',
                },
                {
                    icon: 'tokens',
                    tag: 'oklch() · ThemeScope',
                    title: 'Three-tier OKLCH token engine',
                    description:
                        'Brand primitives feed semantic surface, border, and contrast-verified text tokens across 7 themes, 3 densities, and isolated ThemeScope subtrees.',
                },
                {
                    icon: 'accessibility',
                    tag: 'WAI-ARIA · React 19',
                    title: 'Native semantics & keyboard contracts',
                    description:
                        'Built on semantic HTML first (<button>, <dialog>, popover), deliberate focus management, reduced-motion tokens, and direct React 19 ref props.',
                },
                {
                    icon: 'modular',
                    tag: 'exports["./*"]',
                    title: 'Composable API & subpath tree-shaking',
                    description:
                        'Compose compound primitives from the @monority/ui barrel for velocity, or import isolated @monority/ui/<slug> subpaths for surgical bundles.',
                },
            ] as ArchitecturePillar[],
        },
        quickstart: {
            kicker: 'Live system',
            title: 'Quick start & scoped theming',
            description:
                'Install the single @monority/ui package, load the CSS foundation once, and compose theme-aware surfaces with zero runtime CSS-in-JS.',
            previewLabel: 'Interactive ThemeScope surface',
            themeControlLabel: 'Preview theme',
            densityControlLabel: 'Preview density',
            densities: {
                comfortable: 'Comfortable',
                compact: 'Compact',
            },
            themes: {
                dark: 'Dark',
                light: 'Light',
                ocean: 'Ocean',
                highContrast: 'High contrast',
            },
            sampleCard: {
                kicker: 'WORKSPACE POLICY',
                badge: 'Active',
                title: 'Runtime token isolation',
                description:
                    'Wrap any subtree in ThemeScope to override atmosphere or control density locally without leaking global styles.',
                switchLabel: 'Enforce strict contrast tokens',
                switchHint: 'Applies verified WCAG AA foreground and control borders.',
                primaryAction: 'Apply policy',
                secondaryAction: 'Inspect tokens',
            },
        },
        categories: {
            kicker: 'Catalog',
            title: 'Component directory',
            description:
                'Direct access to every documented primitive in the library, synchronized with the live component registry.',
            countUnit: (count: number) => (count === 1 ? '1 component' : `${count} components`),
        },
        pager: {
            nextDescription:
                'Install @monority/ui, load @layer styles, and wire ThemeProvider and SSR scripts.',
        },
    },
    installation: {
        hero: {
            kicker: 'Getting started',
            title: 'Installation',
            description:
                'Integrate @monority/ui into a React 19 application, load the layered CSS foundation, configure root providers, and eliminate first-paint theme flashes.',
        },
        telemetry: {
            ariaLabel: 'Runtime prerequisites',
            reactValue: '19+',
            reactLabel: 'Peer dependencies',
            reactDetail: 'react ^19.0.0 · react-dom ^19.0.0',
            tsValue: '5.7+',
            tsLabel: 'TypeScript',
            tsDetail: 'moduleResolution: "bundler"',
            cssValue: '@layer',
            cssLabel: 'CSS foundation',
            cssDetail: 'Native Cascade Layers & OKLCH',
            bundleValue: 'ESM',
            bundleLabel: 'Package format',
            bundleDetail: 'sideEffects: ["*.css"]',
        },
        install: {
            kicker: 'Step 01',
            title: 'Install the package',
            description:
                '@monority/ui is the single published package. It ships React 19 primitives, strict TypeScript declarations, icons, and compiled CSS tokens and recipes.',
        },
        styles: {
            kicker: 'Step 02',
            title: 'Load the CSS foundation & @layer order',
            description:
                'Import the stylesheet once at your root entrypoint. Every rule is encapsulated inside mr.* cascade layers so your unlayered CSS always takes precedence.',
            entrypointsLabel: 'PUBLIC CSS ENTRYPOINTS',
            entrypoints: [
                {
                    path: '@monority/ui/styles.css',
                    badge: 'Recommended',
                    description:
                        'Complete foundation: layer order, reset, base typography, OKLCH tokens, all 7 themes, component recipes, and utilities.',
                },
                {
                    path: '@monority/ui/index.css',
                    badge: 'Alias',
                    description:
                        'Exact alias for @monority/ui/styles.css when bundler conventions prefer index.css.',
                },
                {
                    path: '@monority/ui/reset.css',
                    badge: 'Modular',
                    description:
                        'Standalone @layer mr.reset stylesheet for advanced host integrations.',
                },
                {
                    path: '@monority/ui/utilities.css',
                    badge: 'Modular',
                    description: 'Standalone @layer mr.utilities helpers.',
                },
            ],
            layerNoteTitle: 'Coexisting with host CSS layers or Tailwind CSS v4',
            layerNoteDescription:
                'If your application declares its own @layer blocks, declare the mr.* layer sequence first so your application layers sit later in the cascade without !important.',
        },
        providers: {
            kicker: 'Step 03',
            title: 'Configure ThemeProvider & ToastProvider',
            description:
                'Wrap your application root with ThemeProvider (to synchronize data-theme, color-scheme, and useTheme) and ToastProvider (to host accessible toast viewports).',
            contracts: [
                {
                    tag: 'ThemeProvider',
                    description:
                        'Reads the active theme via useSyncExternalStore without blocking render, persists preferences, and exposes { theme, resolvedTheme, setTheme } via useTheme().',
                },
                {
                    tag: 'Static HTML',
                    description:
                        'If your product uses a single fixed atmosphere without runtime switching, set data-theme="dark" and data-density="comfortable" directly on <html>.',
                },
                {
                    tag: 'ThemeScope',
                    description:
                        'Use <ThemeScope theme="ocean" density="compact"> anywhere in the tree to scope an atmosphere, studio brand, or density locally.',
                },
            ],
        },
        ssr: {
            kicker: 'Step 04',
            title: 'Prevent first-paint theme flash (SSR & SPA)',
            description:
                'Inject getThemeScript() from @monority/ui/get-theme-script inside <head> so the browser resolves localStorage, prefers-contrast, and prefers-color-scheme before painting the first frame.',
        },
        imports: {
            kicker: 'Step 05',
            title: 'Import components, tree-shake & configure TypeScript',
            description:
                'Import from the main @monority/ui entry point for rapid composition or through dedicated @monority/ui/<slug> subpaths for granular bundle boundaries.',
            calloutTitle: 'Keep styles.css imported once at the root',
            calloutDescription:
                'Component JavaScript modules do not import global CSS by side effect. Whether you use @monority/ui or @monority/ui/button, load @monority/ui/styles.css once at your application entrypoint.',
            tsconfigLabel: 'RECOMMENDED TSCONFIG.JSON',
        },
        frameworks: {
            kicker: 'Step 06',
            title: 'Framework quickstarts',
            description:
                'Complete, copy-ready entrypoints combining styles, anti-flash head script, and root client providers.',
            tabsAriaLabel: 'Framework templates',
            viteTab: 'Vite + React',
            nextTab: 'Next.js App Router',
            viteDescription:
                'Place the synchronous theme script in index.html and mount AppProviders in src/main.tsx.',
            nextDescription:
                'Isolate ThemeProvider and ToastProvider inside a "use client" boundary while keeping app/layout.tsx as a Server Component with suppressHydrationWarning.',
        },
        pager: {
            prevDescription:
                'Review the core architecture, live ThemeScope preview, and full component directory.',
            nextDescription:
                'Explore the first interactive action primitive, its variants, props, and keyboard contract.',
        },
    },
}
