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
    pager: {
        ariaLabel: 'Documentation pagination',
        previous: 'Previous',
        next: 'Next',
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
        badge: 'Preview',
        properties: 'Dynamic properties',
        reset: 'Reset',
        resetLabel: 'Reset properties',
    },
    guides: {
        introduction: 'Introduction',
        installation: 'Installation',
    },
    categories: {
        actions: {
            title: 'Actions',
            description:
                'Buttons, icon triggers, copy controls, and toggleable command primitives.',
        },
        forms: {
            title: 'Forms & Inputs',
            description:
                'Accessible form controls, pickers, structured fields, and validation states.',
        },
        navigation: {
            title: 'Navigation',
            description:
                'Tabs, segmented controls, breadcrumbs, pagination, topbars, and app shells.',
        },
        overlays: {
            title: 'Overlays',
            description:
                'Dialogs, sheets, drawers, menus, command palettes, popovers, and tooltips.',
        },
        display: {
            title: 'Display',
            description: 'Cards, accordions, collapsibles, carousels, avatars, and color swatches.',
        },
        data: {
            title: 'Data',
            description: 'Structured tables, data lists, metric grids, stat cards, and timelines.',
        },
        feedback: {
            title: 'Feedback & Status',
            description: 'Badges, callouts, banners, alerts, skeletons, progress bars, and toasts.',
        },
        layout: {
            title: 'Layout',
            description: 'Grids, stacks, containers, sections, resizable panels, and scroll areas.',
        },
        typography: {
            title: 'Typography',
            description:
                'Semantic titles, body text, keyboard shortcut keys, and formatted code blocks.',
        },
        brand: {
            title: 'Brand',
            description: 'Official geometric Monority UI brand mark primitive.',
        },
        experimental: {
            title: 'Experimental',
            description: 'Progressive loading and specialized interaction primitives.',
        },
    },
}
