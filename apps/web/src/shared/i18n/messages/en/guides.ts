export type FeatureVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger'

export const guides = {
    introduction: {
        hero: {
            kicker: 'Monority UI',
            title: 'Introduction',
            description:
                'A modern, accessible React component library for building calm, consistent product interfaces with production-ready primitives, layouts, feedback surfaces, and overlays.',
        },
        features: {
            title: 'What the library offers',
            description: 'Stable, accessible and coherent foundations for every application.',
            items: [
                {
                    variant: 'primary',
                    title: 'System-first UI',
                    description:
                        'Shared tokens, recipes, and components that keep shells, forms, and content surfaces visually aligned.',
                },
                {
                    variant: 'success',
                    title: 'Composable architecture',
                    description:
                        'Use the main barrel for speed or sub-path imports when you want tighter bundle control.',
                },
                {
                    variant: 'warning',
                    title: 'Accessible defaults',
                    description:
                        'Keyboard support, ARIA patterns, and focus handling are built into the component layer.',
                },
                {
                    variant: 'primary',
                    title: 'Theme-ready styling',
                    description:
                        'CSS variable driven theming lets docs and products share the same visual language.',
                },
                {
                    variant: 'danger',
                    title: 'Broad coverage',
                    description:
                        'From small typography helpers to data-heavy layouts and overlays, the library covers daily product work.',
                },
                {
                    variant: 'default',
                    title: 'Typed end to end',
                    description:
                        'Strong TypeScript support keeps component APIs predictable as the design system grows.',
                },
            ] satisfies { variant: FeatureVariant; title: string; description: string }[],
        },
        quickstart: {
            title: 'Quick start',
            description: 'Install the package and import your first components in seconds.',
            cta: 'Read the full installation guide',
        },
        categories: {
            title: 'Component categories',
            description: 'Overview of the element families available in the library.',
            items: [
                {
                    label: 'Actions',
                    items: 'Button, ButtonLink, IconButton, CopyButton, Toggle, ToggleGroup',
                },
                {
                    label: 'Forms',
                    items: 'Input, InputOTP, Select, Textarea, Checkbox, RadioGroup, Switch, Slider, Rating, DatePicker',
                },
                {
                    label: 'Navigation',
                    items: 'Tabs, SegmentedControl, Stepper, Breadcrumb, Pagination, Toolbar, Topbar, SidebarLayout',
                },
                {
                    label: 'Overlays',
                    items: 'Modal, AlertDialog, Sheet, Drawer, Tooltip, Popover, DropdownMenu',
                },
                {
                    label: 'Data & display',
                    items: 'DataTable, DataList, Table, Card, MetricGrid, StatCard, Timeline',
                },
                {
                    label: 'Feedback',
                    items: 'Badge, BadgeDelta, Callout, InlineAlert, Banner, Progress, Spinner, Toast',
                },
                {
                    label: 'Layout',
                    items: 'Container, Grid, Stack, Section, Divider, Separator, ScrollArea',
                },
            ],
        },
    },
    installation: {
        hero: {
            kicker: 'Getting started',
            title: 'Installation',
            description:
                'Set up Monority UI in your project, load the shared styles, and start composing product-ready screens with the component system.',
        },
        steps: {
            title: 'Step-by-step guide',
            description: 'Integrate the library into your project in three simple steps.',
            install: {
                title: '1. Install the package',
                description: 'Choose your preferred package manager.',
            },
            css: {
                title: '2. Import the CSS foundation',
                description: 'Load the main stylesheet at your application entry point.',
            },
            compose: {
                title: '3. Compose your interfaces',
                description: 'Import from the main entry point or through optimized sub-paths.',
            },
        },
        prerequisites: {
            title: 'Prerequisites',
            description: 'Recommended runtime configuration.',
            items: [
                'React 19 or later',
                'React DOM 19 or later',
                'TypeScript 5.7+ for full type support',
            ],
        },
        nextSteps: {
            title: 'Next steps',
            description: 'Explore the ecosystem and start designing.',
            docsLabel: 'component documentation',
            moodboardLabel: 'Design Studio',
            browsePrefix: 'Browse the',
            testPrefix: 'Try your token combinations in the',
        },
    },
}
