import { DocPage, type DocPageData } from '../DocPage'
import {
  StatCardBasicExample,
  StatCardTonesExample,
  StatCardWithIconExample,
  StatCardWithFooterExample,
} from './StatCard.examples'

const docData: DocPageData = {
  title: 'StatCard',
  description: "KPI / statistic card with label, value, trend, icon, and footer.",
  importCode: "import { StatCard } from '@monority/ui'",
  usageCode: `<StatCard label="Revenue" value="$12,340" trend="+12%" trendTone="success" />`,
  preview: () => <StatCardBasicExample />,
  examples: [
    { title: 'Trend tones', content: <StatCardTonesExample /> },
    { title: 'With icon', content: <StatCardWithIconExample /> },
    { title: 'With footer', content: <StatCardWithFooterExample /> },
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
