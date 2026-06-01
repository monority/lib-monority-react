import { DocPage, type DocPageData } from '../DocPage'
import {
  MetricGridBasicExample,
  MetricGridWithColorsExample,
  MetricGridWithDescriptionExample,
} from './MetricGrid.examples'

const docData: DocPageData = {
  title: 'MetricGrid',
  description: "Grid layout for StatCard items — renders a responsive grid of KPI cards.",
  importCode: "import { MetricGrid } from '@monority/ui'",
  usageCode: `<MetricGrid items={[
  { label: 'Revenue', value: '$12,340', trend: '+12%', trendTone: 'success' },
  { label: 'Users', value: '1,234', trend: '+8%', trendTone: 'success' },
]} />`,
  preview: () => <MetricGridBasicExample />,
  examples: [
    { title: 'With colors', content: <MetricGridWithColorsExample />, code: `<MetricGrid items={[
  { label: 'Revenue', value: '$45,678', trend: '+18%', trendTone: 'success' },
  { label: 'Churn', value: '2.1%', trend: '+0.3%', trendTone: 'danger' },
]} />` },
    { title: 'With descriptions', content: <MetricGridWithDescriptionExample />, code: `<MetricGrid items={[
  { label: 'Active Users', value: '12,345', trend: '+8%', trendTone: 'success', description: 'Last 30 days' },
  { label: 'Sessions', value: '45,678', trend: '+12%', trendTone: 'success', description: 'Last 30 days' },
]} />` },
  ],
  props: [
    { name: 'items', type: `{ key: string; label: ReactNode; value: ReactNode; trend?: ReactNode; trendTone?: 'neutral' | 'success' | 'warning' | 'danger'; description?: ReactNode; icon?: ReactNode; footer?: ReactNode }[]`, defaultValue: "[]", description: "KPI card data." }
  ],
  cssHooks: [
    '.mr-metric-grid', '[data-direction]',
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

export function MetricGridDocs() {
  return <DocPage doc={docData} />
}
