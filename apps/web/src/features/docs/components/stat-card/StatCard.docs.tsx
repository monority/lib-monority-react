import { DocPage, type DocPageData } from '../DocPage'
import {
    StatCardBasicExample,
    StatCardTonesExample,
    StatCardWithIconExample,
    StatCardWithFooterExample,
    StatCardLongTextExample,
} from './StatCard.examples'

const docData: DocPageData = {
    title: 'StatCard',
    description: 'Compact KPI card for dashboard metrics, trend context, and supporting notes.',
    importCode: "import { StatCard } from '@monority/ui/stat-card'",
    usageCode: `<StatCard label="Net revenue" value="$128,420" trend="+8.4% vs last month" trendTone="success" />`,
    preview: () => <StatCardBasicExample />,
    examples: [
        {
            title: 'Trend tones',
            content: <StatCardTonesExample />,
            code: `<StatCard label="Pipeline" value="$842k" trend="+14 qualified deals" trendTone="success" />
<StatCard label="Overdue tasks" value="23" trend="+6 since Friday" trendTone="warning" />
<StatCard label="Failed jobs" value="17" trend="+3 in 24h" trendTone="danger" />`,
        },
        {
            title: 'With icon',
            content: <StatCardWithIconExample />,
            code: `<StatCard label="Active seats" value="1,284" trend="+72 this week" trendTone="success" icon={<UsersIcon />} />`,
        },
        {
            title: 'With footer',
            content: <StatCardWithFooterExample />,
            code: `<StatCard label="Open reviews" value="46" description="Pull requests waiting for owner approval." footer={<span>Updated 5 minutes ago</span>} />`,
        },
        {
            title: 'Long text',
            content: <StatCardLongTextExample />,
            code: `<StatCard label="Quarterly recognized revenue" value="$1,234,567.89" trend="+23.5% vs previous quarter" trendTone="success" />`,
        },
    ],
    props: [
        { name: 'label', type: `string`, defaultValue: '-', description: 'Metric label.' },
        { name: 'value', type: `string`, defaultValue: '-', description: 'Metric value.' },
        { name: 'trend', type: `string`, defaultValue: '-', description: 'Trend indicator text.' },
        { name: 'trendTone', type: `string`, defaultValue: '-', description: 'Trend visual tone.' },
        {
            name: 'description',
            type: `string`,
            defaultValue: '-',
            description: 'Supporting description.',
        },
        { name: 'icon', type: `ReactNode`, defaultValue: '-', description: 'Optional icon.' },
        {
            name: 'footer',
            type: `ReactNode`,
            defaultValue: '-',
            description: 'Optional footer content.',
        },
    ],
    cssHooks: [
        '.mr-stat-card',
        '.mr-stat-card__header',
        '.mr-stat-card__header-end',
        '.mr-stat-card__value',
        '.mr-stat-card__label',
        '.mr-stat-card__trend',
        '.mr-stat-card__trend-marker',
        '.mr-stat-card__icon',
        '.mr-stat-card__description',
        '.mr-stat-card__footer',
        '[data-trend-tone]',
    ],
    tokens: [
        '--mr-fg-base',
        '--mr-fg-muted',
        '--mr-text-*',
        '--mr-space-*',
        '--mr-success',
        '--mr-warning',
        '--mr-danger-text',
    ],
    a11y: [
        'Summary/statistics pattern.',
        'aria-label for metric groups.',
        'Trend direction announced via text (not just color).',
    ],
}

export function StatCardDocs() {
    return <DocPage doc={docData} />
}
