export const nav = {
    brand: 'Monority UI home',
    primaryNavigation: 'Main navigation',
    links: {
        docs: 'Docs',
    },
    search: {
        open: 'Search components or actions (Ctrl+K)',
        placeholder: 'Search components…',
        dialogPlaceholder: 'Search a component, a guide, a theme…',
        empty: 'No component or action matches your search.',
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
