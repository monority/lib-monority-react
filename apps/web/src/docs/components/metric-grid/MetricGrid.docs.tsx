import { DocPage, type DocPageData } from '../DocPage'
import {
  MetricGridBasicExample,
  MetricGridHealthExample,
  MetricGridRevenueExample,
  MetricGridRiskExample,
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
    { title: 'Revenue item', content: <MetricGridRevenueExample />, code: `<MetricGrid items={[
  { key: 'revenue', label: 'Revenue', value: '$45,678', trend: '+18%', trendTone: 'success', description: 'Net revenue after refunds' },
]} />` },
    { title: 'Risk item', content: <MetricGridRiskExample />, code: `<MetricGrid items={[
  { key: 'churn', label: 'Churn risk', value: '2.1%', trend: '+0.3%', trendTone: 'danger', description: 'Accounts requiring follow-up' },
]} />` },
    { title: 'Health item', content: <MetricGridHealthExample />, code: `<MetricGrid items={[
  { key: 'nps', label: 'NPS score', value: '72', trend: '+5', trendTone: 'success', description: 'Latest survey window' },
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
