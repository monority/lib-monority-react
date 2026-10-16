import { useState } from 'react'
import { MetricGrid } from '@monority/ui/metric-grid'
import { ComponentPlayground } from '../../components/ComponentPlayground/ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import {
    MetricGridBasicExample,
    MetricGridChildrenExample,
    MetricGridHealthExample,
    MetricGridRevenueExample,
    MetricGridRiskExample,
} from './MetricGrid.examples'

function MetricGridPlayground() {
    const [count, setCount] = useState<'2' | '3' | '4'>('3')
    const [trendTone, setTrendTone] = useState<'success' | 'warning' | 'danger'>('success')

    const allItems = [
        {
            key: 'm1',
            label: 'Chiffre d’affaires',
            value: '45 680 €',
            trend: '+14.2%',
            trendTone: trendTone,
            description: 'Facturation mensuelle consolidée',
        },
        {
            key: 'm2',
            label: 'Nouveaux clients',
            value: '1 240',
            trend: '+8.1%',
            trendTone: 'success' as const,
            description: 'Souscriptions confirmées',
        },
        {
            key: 'm3',
            label: 'Taux de rétention',
            value: '98.4%',
            trend: '+0.6%',
            trendTone: 'neutral' as const,
            description: 'Moyenne mobile sur 90 jours',
        },
        {
            key: 'm4',
            label: 'Tickets ouverts',
            value: '18',
            trend: '-4',
            trendTone: 'success' as const,
            description: 'Délai moyen de résolution : 12 min',
        },
    ]

    const selectedItems = allItems.slice(0, Number(count))

    const snippet = `<MetricGrid
  items={[
${selectedItems.map((item) => `    { key: '${item.key}', label: '${item.label}', value: '${item.value}', trend: '${item.trend}', trendTone: '${item.trendTone}' }`).join(',\n')}
  ]}
/>`

    return (
        <ComponentPlayground
            controls={[
                {
                    type: 'select',
                    label: 'Nombre d’indicateurs',
                    value: count,
                    options: [
                        { value: '2', label: '2 colonnes' },
                        { value: '3', label: '3 colonnes' },
                        { value: '4', label: '4 colonnes' },
                    ],
                    onChange: (v) => setCount(v as '2' | '3' | '4'),
                },
                {
                    type: 'select',
                    label: 'Tendance KPI 1',
                    value: trendTone,
                    options: [
                        { value: 'success', label: 'Positive (success)' },
                        { value: 'warning', label: 'Alerte (warning)' },
                        { value: 'danger', label: 'Négative (danger)' },
                    ],
                    onChange: (v) => setTrendTone(v as 'success' | 'warning' | 'danger'),
                },
            ]}
            codeSnippet={snippet}
        >
            <div style={{ width: '100%' }}>
                <MetricGrid items={selectedItems} />
            </div>
        </ComponentPlayground>
    )
}

const docData: DocPageData = {
    title: 'MetricGrid',
    description: 'Grid layout for StatCard items — renders a responsive grid of KPI cards.',
    importCode: "import { MetricGrid } from '@monority/ui'",
    usageCode: `<MetricGrid items={[
  { label: 'Revenue', value: '$12,340', trend: '+12%', trendTone: 'success' },
  { label: 'Users', value: '1,234', trend: '+8%', trendTone: 'success' },
]} />`,
    preview: () => <MetricGridPlayground />,
    examples: [
        {
            title: 'Declarative children',
            content: <MetricGridChildrenExample />,
            code: `<MetricGrid>
  <StatCard label="Conversion rate" value="4.6%" trend="+0.8%" trendTone="success" description="Organic funnel" />
  <StatCard label="API uptime" value="99.98%" trend="Stable" trendTone="neutral" description="Past 90 days" />
</MetricGrid>`,
        },
        {
            title: 'Revenue item',
            content: <MetricGridRevenueExample />,
            code: `<MetricGrid items={[
  { key: 'revenue', label: 'Revenue', value: '$45,678', trend: '+18%', trendTone: 'success', description: 'Net revenue after refunds' },
]} />`,
        },
        {
            title: 'Risk item',
            content: <MetricGridRiskExample />,
            code: `<MetricGrid items={[
  { key: 'churn', label: 'Churn risk', value: '2.1%', trend: '+0.3%', trendTone: 'danger', description: 'Accounts requiring follow-up' },
]} />`,
        },
        {
            title: 'Health item',
            content: <MetricGridHealthExample />,
            code: `<MetricGrid items={[
  { key: 'nps', label: 'NPS score', value: '72', trend: '+5', trendTone: 'success', description: 'Latest survey window' },
]} />`,
        },
    ],
    props: [
        {
            name: 'items',
            type: `{ key: string; label: ReactNode; value: ReactNode; trend?: ReactNode; trendTone?: 'neutral' | 'success' | 'warning' | 'danger'; description?: ReactNode; icon?: ReactNode; footer?: ReactNode }[]`,
            defaultValue: '[]',
            description: 'KPI card data.',
        },
    ],
    cssHooks: ['.mr-metric-grid', '[data-direction]'],
    tokens: [
        '--mr-text-primary',
        '--mr-text-secondary',
        '--mr-text-*',
        '--mr-space-*',
        '--mr-success',
        '--mr-danger',
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
