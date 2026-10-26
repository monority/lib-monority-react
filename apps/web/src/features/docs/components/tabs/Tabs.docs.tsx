import { Tabs } from '@monority/ui/tabs'
import { useState } from 'react'
import { ComponentPlayground } from '../ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import { tabsI18n } from './Tabs.messages'
import {
    TabsBasicExample,
    TabsCompoundExample,
    TabsDisabledExample,
    TabsFullWidthExample,
    TabsSizesExample,
    TabsTonesExample,
} from './Tabs.examples'

function TabsPlaygroundDemo(props: {
    tone: 'neutral' | 'accent' | 'danger'
    size: 'sm' | 'md' | 'lg'
    fullWidth: boolean
    disabled: boolean
}) {
    const [value, setValue] = useState('overview')
    const items = [
        { value: 'overview', label: 'Overview' },
        { value: 'deployments', label: 'Deployments' },
        { value: 'settings', label: 'Settings' },
    ]

    return (
        <div
            style={{
                width: '100%',
                maxWidth: '520px',
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--mr-space-4)',
            }}
        >
            <Tabs
                items={items}
                value={value}
                onChange={setValue}
                tone={props.tone}
                size={props.size}
                fullWidth={props.fullWidth}
                disabled={props.disabled}
                aria-label="Project navigation"
            />
            <div
                style={{
                    padding: 'var(--mr-space-4)',
                    background: 'var(--mr-bg-surface-strong)',
                    border: '1px solid var(--mr-border-subtle)',
                    borderRadius: 'var(--mr-radius-md)',
                    color: 'var(--mr-text-primary)',
                    fontSize: 'var(--mr-font-size-sm)',
                }}
            >
                Active panel: <strong>{value}</strong>
            </div>
        </div>
    )
}

const tabsPlayground = (
    <ComponentPlayground<{
        tone: 'neutral' | 'accent' | 'danger'
        size: 'sm' | 'md' | 'lg'
        fullWidth: boolean
        disabled: boolean
    }>
        componentName="Tabs"
        importCode="import { Tabs } from '@monority/ui/tabs'"
        getCode={(p) => {
            const propsStr = [
                `  items={[\n    { value: 'overview', label: 'Vue d ensemble' },\n    { value: 'deployments', label: 'Deploiements' },\n    { value: 'settings', label: 'Configuration' }\n  ]}`,
                '  value={value}',
                '  onChange={setValue}',
                p.tone !== 'neutral' ? `  tone="${p.tone}"` : '',
                p.size !== 'md' ? `  size="${p.size}"` : '',
                p.fullWidth ? '  fullWidth' : '',
                p.disabled ? '  disabled' : '',
                '  aria-label="Project navigation"',
            ]
                .filter(Boolean)
                .join('\n')

            return `import { useState } from 'react'\nimport { Tabs } from '@monority/ui/tabs'\n\nconst [value, setValue] = useState('overview')\n\n<Tabs\n${propsStr}\n/>`
        }}
        controls={[
            {
                name: 'tone',
                type: 'select',
                label: 'Visual tone',
                defaultValue: 'neutral',
                options: [
                    { value: 'neutral', label: 'Neutral' },
                    { value: 'accent', label: 'Accent' },
                    { value: 'danger', label: 'Danger' },
                ],
            },
            {
                name: 'size',
                type: 'select',
                label: 'Size',
                defaultValue: 'md',
                options: [
                    { value: 'sm', label: 'Small' },
                    { value: 'md', label: 'Medium' },
                    { value: 'lg', label: 'Large' },
                ],
            },
            {
                name: 'fullWidth',
                type: 'boolean',
                label: 'Full width',
                defaultValue: false,
            },
            {
                name: 'disabled',
                type: 'boolean',
                label: 'Disabled',
                defaultValue: false,
            },
        ]}
        render={(props) => <TabsPlaygroundDemo {...props} />}
    />
)

const docData: DocPageData = {
    title: 'Tabs',
    description:
        'A compact local navigation control for switching between adjacent views, filters, or content groups.',
    importCode: "import { Tabs } from '@monority/ui/tabs'",
    usageCode: `// Declarative Compound API
<Tabs defaultValue="overview">
    <Tabs.List>
        <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
        <Tabs.Trigger value="activity">Activity</Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content value="overview">Overview panel...</Tabs.Content>
    <Tabs.Content value="activity">Activity panel...</Tabs.Content>
</Tabs>`,
    preview: () => <TabsBasicExample />,
    playground: tabsPlayground,
    examples: [
        { title: 'Compound syntax', content: <TabsCompoundExample /> },
        { title: 'Tones', content: <TabsTonesExample /> },
        { title: 'Sizes', content: <TabsSizesExample /> },
        { title: 'Disabled', content: <TabsDisabledExample /> },
        { title: 'Full width', content: <TabsFullWidthExample /> },
    ],
    props: [
        {
            name: 'items',
            type: `{ value: string; label: ReactNode; disabled?: boolean }[]`,
            defaultValue: '[]',
            description:
                'Tab definitions. Set disabled per item to skip it in keyboard navigation.',
        },
        {
            name: 'value',
            type: `string`,
            defaultValue: '-',
            description: 'Controlled selected value.',
        },
        {
            name: 'defaultValue',
            type: `string`,
            defaultValue: 'first item',
            description: 'Uncontrolled initial value.',
        },
        {
            name: 'onChange',
            type: `(value: string) => void`,
            defaultValue: '-',
            description: 'Tab change callback',
        },
        {
            name: 'tone',
            type: `'neutral' | 'accent' | 'danger'`,
            defaultValue: "'neutral'",
            description: 'Visual tone for the active tab',
        },
        {
            name: 'size',
            type: `'sm' | 'md' | 'lg'`,
            defaultValue: "'md'",
            description: 'Tab size variant',
        },
        {
            name: 'disabled',
            type: `boolean`,
            defaultValue: 'false',
            description: 'Disables all tabs',
        },
        {
            name: 'fullWidth',
            type: `boolean`,
            defaultValue: 'false',
            description: 'Tabs stretch to fill container width',
        },
        {
            name: 'aria-label',
            type: `string`,
            defaultValue: "'Tabs'",
            description: 'Accessible label for the tablist',
        },
    ],
    cssHooks: [
        '.mr-tabs',
        '.mr-tabs__tab',
        '[data-tone]',
        '[data-size]',
        '[data-disabled]',
        '[data-full-width]',
        '[data-active]',
    ],
    tokens: [
        '--mr-border-subtle',
        '--mr-bg-surface',
        '--mr-bg-raised',
        '--mr-bg-surface-strong',
        '--mr-text-secondary',
        '--mr-text-primary',
        '--mr-accent-solid',
        '--mr-danger',
    ],
    keyboardNavigation: [
        {
            key: ['ArrowRight', 'ArrowLeft'],
            action: 'Moves focus horizontally between interactive tabs.',
            context: 'Tab list (tablist)',
        },
        {
            key: 'Home',
            action: 'Moves focus to the first available tab.',
            context: 'Tab list (tablist)',
        },
        {
            key: 'End',
            action: 'Moves focus to the last available tab.',
            context: 'Tab list (tablist)',
        },
        {
            key: ['Enter', 'Space'],
            action: 'Activates and selects the focused tab.',
            context: 'Target tab',
        },
        {
            key: 'Tab',
            action: 'Moves focus to the associated content panel or to the next interactive element.',
            context: 'Active tab',
        },
    ],
    a11y: [
        'Root uses role="tablist" with aria-label.',
        'Each tab uses role="tab" with aria-selected and roving tabIndex.',
        'Roving tabIndex keeps the active tab in the keyboard flow.',
        'Arrow keys, Home, and End move across tabs.',
    ],
    i18n: tabsI18n,
}

export function TabsDocs() {
    return <DocPage doc={docData} />
}
