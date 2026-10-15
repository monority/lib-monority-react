import { DocPage, type DocPageData } from '../DocPage'
import {
    TabsBasicExample,
    TabsTonesExample,
    TabsSizesExample,
    TabsDisabledExample,
    TabsFullWidthExample,
    TabsCompoundExample,
} from './Tabs.examples'

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
    a11y: [
        'Root uses role="tablist" with aria-label.',
        'Each tab uses role="tab" with aria-selected and roving tabIndex.',
        'Roving tabIndex keeps the active tab in the keyboard flow.',
        'Arrow keys, Home, and End move across tabs.',
    ],
}

export function TabsDocs() {
    return <DocPage doc={docData} />
}
