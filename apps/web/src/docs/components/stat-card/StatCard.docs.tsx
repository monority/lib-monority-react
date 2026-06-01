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
  description: "KPI / statistic card with label, value, trend, icon, and footer.",
  importCode: "import { StatCard } from '@monority/ui'",
  usageCode: `<StatCard label="Revenue" value="$12,340" trend="+12%" trendTone="success" />`,
  preview: () => <StatCardBasicExample />,
  examples: [
    { title: 'Trend tones', content: <StatCardTonesExample />, code: `<StatCard label="Revenue" value="$12,340" trend="+12%" trendTone="success" />
<StatCard label="Churn" value="2.1%" trend="+0.3%" trendTone="danger" />
<StatCard label="Stable" value="1,234" trend="0%" trendTone="neutral" />` },
    { title: 'With icon', content: <StatCardWithIconExample />, code: `<StatCard label="Users" value="1,234" trend="+8%" trendTone="success" icon={<UserIcon />} />` },
    { title: 'With footer', content: <StatCardWithFooterExample />, code: `<StatCard label="Orders" value="456" description="Last 30 days" footer={<span>Updated 5 min ago</span>} />` },
    { title: 'Long text', content: <StatCardLongTextExample />, code: `<StatCard label="Total Revenue" value="$1,234,567.89" trend="+23.5%" trendTone="success" />` },
  ],
  props: [
    { name: 'label', type: `string`, defaultValue: "-", description: "Metric label." },
    { name: 'value', type: `string`, defaultValue: "-", description: "Metric value." },
    { name: 'trend', type: `string`, defaultValue: "-", description: "Trend indicator text." },
    { name: 'trendTone', type: `string`, defaultValue: "-", description: "Trend visual tone." },
    { name: 'description', type: `string`, defaultValue: "-", description: "Supporting description." },
    { name: 'icon', type: `ReactNode`, defaultValue: "-", description: "Optional icon." },
    { name: 'footer', type: `ReactNode`, defaultValue: "-", description: "Optional footer content." }
  ],
  cssHooks: [
    '.mr-stat-card', '.mr-stat-card__value', '.mr-stat-card__label', '.mr-stat-card__change',
    '[data-direction]',
  ],
  tokens: [
    '--mr-fg-base', '--mr-fg-muted', '--mr-text-*', '--mr-space-*',
    '--mr-success', '--mr-danger',
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
