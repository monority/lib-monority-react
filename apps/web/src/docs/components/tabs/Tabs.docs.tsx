import { DocPage, type DocPageData } from '../DocPage'
import {
    TabsBasicExample,
    TabsTonesExample,
    TabsSizesExample,
    TabsDisabledExample,
    TabsFullWidthExample,
} from './Tabs.examples'

const docData: DocPageData = {
    title: 'Tabs',
    description:
        'A compact local navigation control for switching between adjacent views, filters, or content groups.',
    importCode: "import { Tabs } from '@monority/ui/tabs'",
    usageCode: `const [value, setValue] = useState('overview')

<Tabs
    items={[
        { value: 'overview', label: 'Overview' },
        { value: 'activity', label: 'Activity' },
    ]}
    value={value}
    onChange={setValue}
/>`,
    preview: () => <TabsBasicExample />,
    examples: [
        { title: 'Tones', content: <TabsTonesExample /> },
        { title: 'Sizes', content: <TabsSizesExample /> },
        { title: 'Disabled', content: <TabsDisabledExample /> },
        { title: 'Full width', content: <TabsFullWidthExample /> },
    ],
    props: [
        {
            name: 'items',
            type: `{ value: string; label: ReactNode }[]`,
            defaultValue: '[]',
            description: 'Tab definitions',
        },
        {
            name: 'value',
            type: `string`,
            defaultValue: '-',
            description: 'Currently selected value',
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
        '.mr-tabs__tab--active',
        '.mr-tabs--neutral',
        '.mr-tabs--accent',
        '.mr-tabs--danger',
        '.mr-tabs--full-width',
        '.mr-tabs--sm',
        '.mr-tabs--md',
        '.mr-tabs--lg',
        '[data-tone]',
        '[data-size]',
        '[data-disabled]',
        '[data-full-width]',
        '[data-active]',
    ],
    tokens: [
        '--mr-border-subtle',
        '--mr-bg-control',
        '--mr-bg-surface-elevated',
        '--mr-bg-surface-strong',
        '--mr-fg-muted',
        '--mr-fg-strong',
        '--mr-accent',
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
