import { DocPage, type DocPageData } from '../DocPage'
import { StatCard } from '@monority/ui'
import { StatCardBasicExample } from './StatCard.examples'

const docData: DocPageData = {
  title: 'StatCard',
  description: "KPI / statistic card with label, value, trend, icon, and footer.",
  importCode: "import { StatCard } from '@monority/ui'",
  usageCode: `<StatCard label="Revenue" value="$12,340" trend="+12%" trendTone="success" />`,
  preview: () => <StatCardBasicExample />,
  props: [
    { name: 'label', type: `string`, defaultValue: "-", description: "Metric label." },
    { name: 'value', type: `string`, defaultValue: "-", description: "Metric value." },
    { name: 'trend', type: `string`, defaultValue: "-", description: "Trend indicator text." },
    { name: 'trendTone', type: `string`, defaultValue: "-", description: "Trend visual tone." },
    { name: 'description', type: `string`, defaultValue: "-", description: "Supporting description." },
    { name: 'icon', type: `ReactNode`, defaultValue: "-", description: "Optional icon." },
    { name: 'footer', type: `ReactNode`, defaultValue: "-", description: "Optional footer content." }
  ],
}

export function StatCardDocs() {
  return <DocPage doc={docData} />
}
