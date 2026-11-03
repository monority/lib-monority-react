export type HomeBadgeVariant = 'default' | 'primary' | 'success' | 'warning'

export const home = {
    seo: {
        title: 'Home',
        description:
            'Monority UI — The accessible React 19 component library engineered for high-density production. Powered by CSS @layer, runtime OKLCH theming, and zero runtime CSS overhead.',
    },
    hero: {
        ariaLabel: 'Monority UI hero',
        kicker: 'v0.3 • React 19 Design System',
        title: 'The component library engineered for high-density production.',
        description:
            '83 accessible primitives, native CSS @layer isolation, and runtime OKLCH theming. Built for complex dashboards, data-dense interfaces, and software that scales.',
        docsCta: 'Explore Components',
        githubCta: 'GitHub',
        installCommand: 'npm i @monority/ui',
        copied: 'Copied to clipboard!',
        monolithAriaLabel:
            'Interactive 3D Monority logo reacting to live OKLCH theme tokens and pointer movement',
        matrixAriaLabel:
            'Interactive Monority UI component showcase demonstrating live ThemeScope theming, density scaling, and accessible React 19 primitives',
    },
    matrix: {
        scopeLabel: 'ThemeScope',
        themeGroupAria: 'Preview theme scope',
        densityGroupAria: 'Preview layout density',
        themes: {
            dark: 'Dark',
            slate: 'Slate',
            ocean: 'Ocean',
            night: 'Night',
            light: 'Light',
        },
        densities: {
            compact: 'Compact',
            comfortable: 'Default',
            spacious: 'Spacious',
        },
        telemetry: {
            title: 'Cluster Performance',
            subtitle: 'Edge routing across 3 active regions',
            status: 'Operational · 99.99%',
            throughputLabel: 'Throughput',
            latencyLabel: 'P99 Latency',
            filterPlaceholder: 'Filter regions (fra, iad, hnd)...',
            filterAria: 'Filter edge regions',
            clearFilter: 'Clear region filter',
            loadAria: (regionCode: string) => `${regionCode} capacity load`,
            emptyRegions: 'No matching edge region.',
            regions: [
                {
                    id: 'fra-01',
                    code: 'fra-01',
                    city: 'Frankfurt',
                    zone: 'eu-central',
                    baseLoad: 64,
                    baseLatency: 11.4,
                    baseRps: 48.2,
                },
                {
                    id: 'iad-02',
                    code: 'iad-02',
                    city: 'Virginia',
                    zone: 'us-east',
                    baseLoad: 52,
                    baseLatency: 14.8,
                    baseRps: 61.5,
                },
                {
                    id: 'hnd-01',
                    code: 'hnd-01',
                    city: 'Tokyo',
                    zone: 'ap-northeast',
                    baseLoad: 38,
                    baseLatency: 19.2,
                    baseRps: 34.6,
                },
            ],
        },
        policy: {
            title: 'Routing Policy',
            subtitle: 'Live primitives inside @layer mr.components',
            badge: 'v2.4',
            strategyLabel: 'Traffic strategy',
            strategies: {
                balanced: 'Balanced',
                latency: 'Low latency',
                failover: 'Failover',
            },
            concurrencyLabel: 'Concurrency limit',
            cacheLabel: 'Smart edge caching',
            cacheHint: 'Serve stale-while-revalidate responses at POP edge.',
            isolationLabel: 'Strict @layer isolation',
            isolationHint: 'Keep host overrides deterministic with zero !important.',
            statusReady: 'Ready · 0 !important',
            statusSynced: 'Policy synced · 0ms',
            reset: 'Reset',
            apply: 'Apply policy',
            applied: 'Applied',
        },
        figcaption:
            'Live interactive Monority UI surface rendered with real Card, StatCard, SegmentedControl, Slider, Switch, Input, Progress, Badge, and Button primitives inside an isolated ThemeScope.',
    },
    frameworks: {
        label: 'Supported Ecosystem & Stack',
        items: [
            { name: 'React 19', note: 'Native ref' },
            { name: 'TypeScript 5', note: 'Strict types' },
            { name: 'Vite 6', note: 'Instant HMR' },
            { name: 'Next.js 15', note: 'App Router' },
            { name: 'CSS @layer', note: 'Zero specificity wars' },
            { name: 'OKLCH Theming', note: 'Perceptual uniformity' },
        ],
    },
    pillars: {
        title: 'Architectural Foundations',
        description:
            'Engineered from the ground up for high-density enterprise software. No runtime CSS overhead, zero specificity friction, and total accessibility compliance.',
        layerCard: {
            title: 'Native CSS @layer Isolation',
            badge: 'Zero Specificity Wars',
            description:
                'All 84 primitives are isolated inside standard @layer mr.* cascades. Consumer application styles always win naturally without !important or selector hacks.',
            layers: [
                'Consumer Application CSS',
                'mr.utilities',
                'mr.components',
                'mr.themes',
                'mr.tokens',
                'mr.base',
                'mr.reset',
            ],
        },
        themingCard: {
            title: 'OKLCH Runtime Theming',
            badge: '0ms DOM Recalculation',
            description:
                'Switch between 7 crafted themes or customize accents in real time. Driven entirely through CSS variables in perceptual OKLCH color space without React virtual DOM re-renders.',
            accentLabel: 'Live Accent Swatch:',
        },
        primitivesCard: {
            title: '84 Accessible Primitives',
            badge: 'Production Ready',
            description:
                'Built for mission-critical software, telemetry consoles, and dense workflows. 100% strict TypeScript types, native React 19 ref support, and WCAG 2.1 AA compliance.',
            primitives: [
                'Button',
                'Select',
                'Switch',
                'Dialog',
                'CommandPalette',
                'DataTable',
                'Tabs',
                'DropdownMenu',
                'Tooltip',
                'Badge',
            ],
        },
    },
    features: {
        title: 'Architectural Excellence',
        description:
            'Engineered as foundational infrastructure for demanding enterprise products. No compromises between developer experience, design fidelity, and runtime performance.',
        items: [
            {
                title: 'CSS @layer Architecture',
                badge: 'Zero Specificity Wars',
                badgeVariant: 'primary',
                description:
                    'All library styles are declared inside standard @layer mr.* cascades. Consumer styles always win naturally without !important or artificial specificity.',
            },
            {
                title: 'OKLCH Color Space & Theming',
                badge: '7 Crafted Themes',
                badgeVariant: 'default',
                description:
                    'Switch between Light, Dark, OLED, Ocean, Slate, Night, and High Contrast in 0ms without re-rendering the React virtual DOM tree.',
            },
            {
                title: '83 Production Primitives',
                badge: 'WCAG 2.1 AA Compliant',
                badgeVariant: 'success',
                description:
                    'From atomic buttons and input masks to virtualized data tables, command palettes, and animated sheets, every component has 100% typing parity.',
            },
            {
                title: 'React 19 Native',
                badge: 'Direct ref Props',
                badgeVariant: 'primary',
                description:
                    'Built specifically for React 19 with native ref prop passing (zero deprecated forwardRef wrappers), React Server Components compatibility, and clean "use client" boundaries.',
            },
            {
                title: 'High-Density Ergonomics',
                badge: 'Compact & Normal',
                badgeVariant: 'default',
                description:
                    'Engineered for telemetry consoles, data tables, and professional tooling where screen real estate and visual hierarchy are paramount.',
            },
            {
                title: 'Zero Runtime CSS Overhead',
                badge: 'Pure CSS Modules',
                badgeVariant: 'success',
                description:
                    'No runtime styled-components or Emotion injectors. Styles are clean, tree-shakable static CSS compiled at build time for instant hydration.',
            },
        ] satisfies {
            title: string
            badge: string
            badgeVariant: HomeBadgeVariant
            description: string
        }[],
    },
    codeExperience: {
        title: 'Developer Experience',
        description: 'Clean composition, clear props, and zero boilerplate.',
        tabComponent: 'Dashboard.tsx',
        tabTheme: 'theme.config.ts',
        tabHtml: 'index.html',
    },
}
