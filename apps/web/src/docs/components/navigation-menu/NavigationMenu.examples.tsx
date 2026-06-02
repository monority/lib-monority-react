import { NavigationMenu } from '@monority/ui/navigation-menu'

export function NavigationMenuBasicExample() {
    const items = [
        { label: 'Overview', href: '/overview' },
        { label: 'Components', href: '/components' },
        { label: 'Tokens', href: '/tokens' },
        { label: 'Changelog', href: '/changelog' },
    ]

    return <NavigationMenu items={items} />
}

export function NavigationMenuWithSubItemsExample() {
    const items = [
        { label: 'Overview', href: '/overview' },
        {
            label: 'Components',
            items: [
                {
                    label: 'Inputs',
                    href: '/components/inputs',
                    description: 'Fields, validation, and entry patterns.',
                },
                {
                    label: 'Navigation',
                    href: '/components/navigation',
                    description: 'Menus, tabs, pagination, and shells.',
                },
                {
                    label: 'Feedback',
                    href: '/components/feedback',
                    description: 'Banners, callouts, toasts, and empty states.',
                },
            ],
        },
        {
            label: 'Resources',
            items: [
                {
                    label: 'Guidelines',
                    href: '/guidelines',
                    description: 'Layout, spacing, and content hierarchy rules.',
                },
                {
                    label: 'Examples',
                    href: '/examples',
                    description: 'Reference compositions for product surfaces.',
                },
            ],
        },
        { label: 'Changelog', href: '/changelog' },
    ]

    return <NavigationMenu items={items} />
}

export function NavigationMenuWithIconsExample() {
    const items = [
        { label: 'Library', href: '/library', icon: <span>L</span> },
        { label: 'Themes', href: '/themes', icon: <span>T</span> },
        {
            label: 'Settings',
            icon: <span>S</span>,
            items: [
                {
                    label: 'Brand',
                    href: '/settings/brand',
                    icon: <span>B</span>,
                    description: 'Logos, color roles, and typography.',
                },
                {
                    label: 'Publishing',
                    href: '/settings/publishing',
                    icon: <span>P</span>,
                    description: 'Release flow, versions, and package visibility.',
                },
            ],
        },
    ]

    return <NavigationMenu items={items} />
}

export function NavigationMenuDisabledExample() {
    const items = [
        { label: 'Overview', href: '/overview' },
        { label: 'Beta', href: '/beta', disabled: true },
        {
            label: 'Labs',
            disabled: true,
            items: [
                { label: 'Experimental grid', href: '/labs/grid', description: 'Coming soon.' },
            ],
        },
        { label: 'Pricing', href: '/pricing' },
    ]

    return <NavigationMenu items={items} />
}
