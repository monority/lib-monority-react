import { NavigationMenu } from '@monority/ui/navigation-menu'
import { Text } from '@monority/ui/text'

export function NavigationMenuBasicExample() {
    return (
        <NavigationMenu>
            <NavigationMenu.List>
                <NavigationMenu.Item>
                    <NavigationMenu.Link href="/overview">Overview</NavigationMenu.Link>
                </NavigationMenu.Item>
                <NavigationMenu.Item value="components">
                    <NavigationMenu.Trigger>Components</NavigationMenu.Trigger>
                    <NavigationMenu.Content>
                        <NavigationMenu.Link
                            href="/components/inputs"
                            description="Fields and validation patterns"
                        >
                            Inputs
                        </NavigationMenu.Link>
                        <NavigationMenu.Link
                            href="/components/navigation"
                            description="Menus, tabs, and shells"
                        >
                            Navigation
                        </NavigationMenu.Link>
                    </NavigationMenu.Content>
                </NavigationMenu.Item>
                <NavigationMenu.Item>
                    <NavigationMenu.Link href="/changelog">Changelog</NavigationMenu.Link>
                </NavigationMenu.Item>
            </NavigationMenu.List>
        </NavigationMenu>
    )
}

export function NavigationMenuWithSubItemsExample() {
    return (
        <NavigationMenu>
            <NavigationMenu.List>
                <NavigationMenu.Item>
                    <NavigationMenu.Link href="/overview">Overview</NavigationMenu.Link>
                </NavigationMenu.Item>
                <NavigationMenu.Item value="components">
                    <NavigationMenu.Trigger>Components</NavigationMenu.Trigger>
                    <NavigationMenu.Content>
                        <NavigationMenu.Link
                            href="/components/inputs"
                            description="Fields, validation, and entry patterns."
                        >
                            Inputs
                        </NavigationMenu.Link>
                        <NavigationMenu.Link
                            href="/components/navigation"
                            description="Menus, tabs, pagination, and shells."
                        >
                            Navigation
                        </NavigationMenu.Link>
                        <NavigationMenu.Link
                            href="/components/feedback"
                            description="Banners, callouts, toasts, and empty states."
                        >
                            Feedback
                        </NavigationMenu.Link>
                    </NavigationMenu.Content>
                </NavigationMenu.Item>
                <NavigationMenu.Item value="resources">
                    <NavigationMenu.Trigger>Resources</NavigationMenu.Trigger>
                    <NavigationMenu.Content>
                        <NavigationMenu.Link
                            href="/guidelines"
                            description="Layout, spacing, and content hierarchy rules."
                        >
                            Guidelines
                        </NavigationMenu.Link>
                        <NavigationMenu.Link
                            href="/examples"
                            description="Reference compositions for product surfaces."
                        >
                            Examples
                        </NavigationMenu.Link>
                    </NavigationMenu.Content>
                </NavigationMenu.Item>
                <NavigationMenu.Item>
                    <NavigationMenu.Link href="/changelog">Changelog</NavigationMenu.Link>
                </NavigationMenu.Item>
            </NavigationMenu.List>
        </NavigationMenu>
    )
}

export function NavigationMenuWithIconsExample() {
    return (
        <NavigationMenu>
            <NavigationMenu.List>
                <NavigationMenu.Item>
                    <NavigationMenu.Link href="/library" icon={<Text.Span>L</Text.Span>}>
                        Library
                    </NavigationMenu.Link>
                </NavigationMenu.Item>
                <NavigationMenu.Item>
                    <NavigationMenu.Link href="/themes" icon={<Text.Span>T</Text.Span>}>
                        Themes
                    </NavigationMenu.Link>
                </NavigationMenu.Item>
                <NavigationMenu.Item value="settings">
                    <NavigationMenu.Trigger icon={<Text.Span>S</Text.Span>}>
                        Settings
                    </NavigationMenu.Trigger>
                    <NavigationMenu.Content>
                        <NavigationMenu.Link
                            href="/settings/brand"
                            icon={<Text.Span>B</Text.Span>}
                            description="Logos, color roles, and typography."
                        >
                            Brand
                        </NavigationMenu.Link>
                        <NavigationMenu.Link
                            href="/settings/publishing"
                            icon={<Text.Span>P</Text.Span>}
                            description="Release flow, versions, and package visibility."
                        >
                            Publishing
                        </NavigationMenu.Link>
                    </NavigationMenu.Content>
                </NavigationMenu.Item>
            </NavigationMenu.List>
        </NavigationMenu>
    )
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
