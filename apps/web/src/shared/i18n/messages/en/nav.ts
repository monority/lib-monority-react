export const nav = {
    brand: 'Monority UI home',
    primaryNavigation: 'Main navigation',
    links: {
        docs: 'Docs',
        moodboard: 'Moodboard',
    },
    search: {
        open: 'Search components or actions (Ctrl+K)',
        placeholder: 'Search components…',
        dialogPlaceholder: 'Search a component, a guide, a theme…',
        empty: 'No component or action matches your search.',
    },
    banner: {
        eyebrow: 'Wave 7',
        description: (componentCount: number) =>
            `Motion system, calibrated focus rings, interactive documentation across ${componentCount} components, and WCAG 2.1 AA conformance.`,
        cta: 'View the changelog',
    },
    changelog: {
        trigger: 'Latest changes',
        title: 'Changelog',
        tag: 'V7',
        badge: 'Wave 7',
        waves: [
            {
                title: 'Wave 7 — Motion, Focus & Documentation',
                items: [
                    'Dynamic interactive playgrounds',
                    'Tokenized motion system and calibrated focus rings',
                    'WCAG 2.1 AA accessibility certification (0 Axe violations)',
                ],
            },
            {
                title: 'Wave 6 — Advanced Components & Quality',
                items: [
                    'CommandPalette, FileUpload, SidebarLayout, Combobox compound',
                    'Declarative composition with full backwards compatibility',
                    'Complete removal of Unicode emojis across the repository',
                    'AppHeader: Banner compound integration',
                ],
            },
            {
                title: 'Wave 5 — Modal Windows & Drawers',
                items: ['Modal, Dialog, Sheet, Drawer: compound architecture'],
            },
            {
                title: 'Wave 4 — Data & Collections',
                items: ['Table, Tabs, Pagination: compound architecture'],
            },
            {
                title: 'Wave 3 — Overlays & Dynamic UI',
                items: [
                    'Calendar, Popover, HoverCard, Tooltip, Collapsible, Avatar, Carousel compound',
                ],
            },
            {
                title: 'Wave 2 — Menus & Navigation',
                items: ['NavigationMenu, Menubar and Stepper compound'],
            },
            {
                title: 'Wave 1 — Forms & Data',
                items: ['Select, DropdownMenu, ContextMenu, Accordion compound'],
            },
        ],
    },
    commandGroups: {
        pages: 'Guides & views',
        themes: 'Themes & atmospheres',
        components: (category: string) => `Components (${category})`,
    },
    commands: {
        introduction: {
            label: 'Introduction',
            description: 'Founding principles, CSS architecture and installation',
        },
        installation: {
            label: 'Installation',
            description: 'npm package and CSS layer configuration',
        },
        moodboard: {
            label: 'Moodboard (Studio)',
            description: 'Interactive dashboard and customization sandbox',
        },
        home: {
            label: 'Monority UI home',
            description: 'Landing page and library manifesto',
        },
        component: (category: string) => `${category} component`,
    },
    theme: {
        current: (label: string) => `Theme: ${label}`,
        active: 'Active',
        fallback: 'Theme',
        names: {
            light: 'Light',
            dark: 'Dark',
            slate: 'Slate',
            ocean: 'Ocean',
            night: 'Night (Tokyo)',
            oled: 'OLED (Pure black)',
            highContrast: 'High contrast',
            system: 'System',
        },
        commands: {
            light: { label: 'Light theme', description: 'Switch to the pure light theme' },
            dark: { label: 'Dark theme', description: 'Switch to the neutral dark theme' },
            slate: { label: 'Slate theme', description: 'Switch to the technical blue-grey theme' },
            oled: { label: 'OLED theme', description: 'Switch to infinite 0-nit contrast' },
            ocean: { label: 'Ocean theme', description: 'Switch to the aquatic theme' },
            night: { label: 'Night theme', description: 'Switch to the warm nocturnal theme' },
        },
    },
    motion: {
        on: 'Motion: On',
        off: 'Motion: Off',
        enable: 'Motion is reduced. Click to enable motion.',
        disable: 'Motion is enabled. Click to reduce motion.',
    },
    language: {
        label: 'Language',
        switchTo: (language: string) => `Switch to ${language}`,
        current: (language: string) => `Current language: ${language}`,
    },
    github: 'GitHub repository',
}
