export type HomeBadgeVariant = 'default' | 'primary' | 'success'

export const home = {
    seo: {
        title: 'Home',
        description:
            'Monority UI — A React 19 component system built around calm tokens, accessible primitives, and CSS @layer architecture.',
    },
    hero: {
        ariaLabel: 'Monority UI introduction',
        kicker: 'React 19 component library',
        title: 'Monority UI',
        description:
            'A precision component system for modern web products. Driven by CSS @layer architecture, runtime design tokens, strict contracts and accessible primitives.',
        docsCta: (componentCount: number) => `Documentation (${componentCount} components)`,
        studio: 'Design Studio',
        installation: 'Installation',
    },
    features: {
        title: 'Architectural foundation',
        description:
            'Built to serve as dependable infrastructure for modern design systems and production web applications.',
        items: [
            {
                title: (componentCount: number) => `${componentCount} stable primitives`,
                badge: 'Production-ready',
                badgeVariant: 'success',
                description:
                    'Every meaningful UI concept is componentized. From simple buttons to rich data tables, overlays and form controls with 100% parity.',
            },
            {
                title: 'CSS @layer architecture',
                badge: 'Zero collisions',
                badgeVariant: 'primary',
                description:
                    'Handcrafted layers (reset, base, tokens, themes, components, utilities). Clean consumer overrides without specificity hacks or !important.',
            },
            {
                title: 'Runtime design tokens',
                badge: 'Multi-theme',
                badgeVariant: 'default',
                description:
                    'Dynamic themes (light, dark, night, oled), customizable accents, radii and density modes switchable at runtime without CSS recompilation.',
            },
            {
                title: 'Accessibility contract',
                badge: 'WCAG 2.2 AA',
                badgeVariant: 'primary',
                description:
                    'Keyboard navigation, proper ARIA roles, focus management, visible focus rings and screen reader behavior treated as hard contracts.',
            },
        ] satisfies {
            title: string | ((componentCount: number) => string)
            badge: string
            badgeVariant: HomeBadgeVariant
            description: string
        }[],
    },
    liveTokens: {
        title: 'Live design tokens',
        description:
            'Tweak system parameters in real time. Notice how every control, surface, and feedback state inherits changes coherently.',
        accentPalette: 'Accent palette',
        geometry: 'Geometry (corner radius)',
        accentSwitcher: 'Accent switcher',
        radiusSwitcher: 'Radius switcher',
        accents: {
            neutral: 'Neutral',
            violet: 'Violet',
            emerald: 'Emerald',
            sky: 'Sky',
            amber: 'Amber',
        },
        radii: {
            none: 'Sharp',
            sm: 'Subtle',
            md: 'Balanced',
            lg: 'Round',
        },
        previewTitle: 'Live component preview',
        activeTheme: 'Active theme',
        inputLabel: 'Email address',
        inputPlaceholder: 'jane@company.com',
        progressLabel: 'Deployment pipeline',
        primaryAction: 'Primary action',
        secondaryAction: 'Secondary',
        subtleAction: 'Subtle',
    },
    showcase: {
        title: 'Component ecosystem',
        description:
            'From high-density operational telemetry dashboards to calm, accessible configuration forms.',
        telemetry: {
            title: 'Live telemetry',
            description: 'MetricGrid and StatCard primitives in action',
            uptime: 'UPTIME (30D)',
            latency: 'P99 LATENCY',
        },
        feedback: {
            title: 'Feedback & notices',
            description: 'Callout and status feedback',
            calloutTitle: 'All systems operational',
            calloutBody: (componentCount: number) =>
                `${componentCount} components tested and passing across the verification matrix.`,
            statLabel: 'PRODUCTION BUNDLE',
            statValue: 'Tree-shakable',
            statDescription: 'Modular entrypoints and zero unnecessary side-effects.',
        },
    },
}
