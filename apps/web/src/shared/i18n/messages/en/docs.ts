export const docs = {
    sidebar: {
        kicker: 'Monority UI',
        title: 'Docs',
        searchPlaceholder: 'Search components',
        searchLabel: 'Search components',
        empty: (query: string) => `No components match "${query}".`,
        clearSearch: 'Clear search',
        navigation: 'Documentation',
        openMenu: 'Open documentation menu',
        closeMenu: 'Close documentation menu',
        mobileNavigation: 'Documentation navigation',
    },
    toc: {
        label: 'Table of contents',
        title: 'On this page',
    },
    hero: {
        kicker: 'Component',
        loading: 'Loading...',
        notFoundTitle: 'Not found',
        notFoundDescription: 'No documentation found for this component.',
        backToComponents: 'Back to the component list',
    },
    sections: {
        overview: {
            title: 'Overview',
            description: 'Interactive demonstration and integration code.',
        },
        examples: {
            title: 'Examples',
            description: 'Variants and common usage patterns.',
        },
        api: {
            title: 'Props & API',
            description: 'Interface contract and TypeScript typing for accepted options.',
        },
        styling: {
            title: 'Customization & Tokens',
            description: 'Documented CSS classes and related design variables.',
        },
        keyboard: {
            title: 'Keyboard navigation',
            description: 'WAI-ARIA compliant keyboard shortcuts and behaviors.',
        },
        accessibility: {
            title: 'Accessibility & guidelines',
            description: 'WAI-ARIA behaviors, roles and screen reader handling.',
        },
        cssHooks: 'CSS hooks',
        tokens: 'Tokens',
    },
    table: {
        prop: 'Prop',
        type: 'Type',
        defaultValue: 'Default',
        description: 'Description',
        key: 'Key / shortcut',
        behavior: 'Behavior',
        context: 'Context',
        global: 'Global',
    },
    playground: {
        badge: 'Playground',
        properties: 'Dynamic properties',
        reset: 'Reset',
        resetLabel: 'Reset properties',
    },
    guides: {
        introduction: 'Introduction',
        installation: 'Installation',
    },
}
