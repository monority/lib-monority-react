import { StatCard } from '@monority/ui/stat-card'
import { useState } from 'react'
import { ComponentPlayground } from '../../components/ComponentPlayground/ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import {
    StatCardCompoundExample,
    StatCardLongTextExample,
    StatCardTonesExample,
    StatCardWithFooterExample,
    StatCardWithIconExample,
} from './StatCard.examples'

function StatCardPlayground() {
    const [label, setLabel] = useState('Revenu net')
    const [value, setValue] = useState('128 420 €')
    const [trend, setTrend] = useState('+8.4% vs mois dernier')
    const [trendTone, setTrendTone] = useState<'success' | 'neutral' | 'warning' | 'danger'>(
        'success'
    )
    const [description, setDescription] = useState('Chiffre d’affaires récurrent après déductions.')

    const snippet = `<StatCard
  label="${label}"
  value="${value}"
  trend="${trend}"
  trendTone="${trendTone}"
  description="${description}"
/>`

    return (
        <ComponentPlayground
            controls={[
                {
                    type: 'text',
                    label: 'Label',
                    value: label,
                    onChange: setLabel,
                },
                {
                    type: 'text',
                    label: 'Valeur',
                    value: value,
                    onChange: setValue,
                },
                {
                    type: 'text',
                    label: 'Tendance',
                    value: trend,
                    onChange: setTrend,
                },
                {
                    type: 'select',
                    label: 'Ton de tendance',
                    value: trendTone,
                    options: [
                        { value: 'success', label: 'Success (positif)' },
                        { value: 'neutral', label: 'Neutral' },
                        { value: 'warning', label: 'Warning (alerte)' },
                        { value: 'danger', label: 'Danger (négatif)' },
                    ],
                    onChange: (v) =>
                        setTrendTone(v as 'success' | 'neutral' | 'warning' | 'danger'),
                },
                {
                    type: 'text',
                    label: 'Description',
                    value: description,
                    onChange: setDescription,
                },
            ]}
            codeSnippet={snippet}
        >
            <div style={{ maxWidth: 360, margin: '0 auto', width: '100%' }}>
                <StatCard
                    label={label}
                    value={value}
                    trend={trend}
                    trendTone={trendTone}
                    description={description}
                />
            </div>
        </ComponentPlayground>
    )
}

const docData: DocPageData = {
    title: 'StatCard',
    description: 'Compact KPI card for dashboard metrics, trend context, and supporting notes.',
    importCode: "import { StatCard } from '@monority/ui/stat-card'",
    usageCode: `<StatCard label="Net revenue" value="$128,420" trend="+8.4% vs last month" trendTone="success" />`,
    preview: () => <StatCardPlayground />,
    examples: [
        {
            title: 'Compound composition',
            content: <StatCardCompoundExample />,
            code: `<StatCard>
  <StatCard.Header>
    <StatCard.Label>Cloud Spend</StatCard.Label>
    <StatCard.HeaderEnd>
      <StatCard.Trend tone="danger">+24%</StatCard.Trend>
    </StatCard.HeaderEnd>
  </StatCard.Header>
  <StatCard.Metric>
    <StatCard.Value>$4,820</StatCard.Value>
  </StatCard.Metric>
  <StatCard.Description>Actual infrastructure compute for the current cycle</StatCard.Description>
  <StatCard.Footer>
    <Text.Small tone="muted">Refreshed automatically</Text.Small>
  </StatCard.Footer>
</StatCard>`,
        },
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
            code: `<StatCard label="Active seats" value="1,284" trend="+72 this week" trendTone="success" icon={<Text.Span aria-hidden="true">AS</Text.Span>} />`,
        },
        {
            title: 'With footer',
            content: <StatCardWithFooterExample />,
            code: `<StatCard label="Open reviews" value="46" description="Pull requests waiting for owner approval." footer={<Text.Small>Updated 5 minutes ago</Text.Small>} />`,
        },
        {
            title: 'Long text',
            content: <StatCardLongTextExample />,
            code: `<StatCard label="Quarterly recognized revenue" value="$1,234,567.89" trend="+23.5% vs previous quarter" trendTone="success" icon={<Text.Span>QR</Text.Span>} />`,
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
        '--mr-text-primary',
        '--mr-text-secondary',
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
