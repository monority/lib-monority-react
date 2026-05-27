import { DocPage, type DocPageData } from '../DocPage'
import { Tooltip } from '@monority/ui'
import { TooltipBasicExample } from './Tooltip.examples'

const docData: DocPageData = {
  title: 'Tooltip',
  description: "CSS-based tooltip that appears on hover.",
  importCode: "import { Tooltip } from '@monority/ui'",
  usageCode: `<Tooltip content="Tooltip text">
  <Button>Hover me</Button>
</Tooltip>`,
  preview: () => <TooltipBasicExample />,
  props: [
    { name: 'content', type: `ReactNode`, defaultValue: "-", description: "Tooltip content." },
    { name: 'children', type: `ReactNode`, defaultValue: "-", description: "Trigger element." }
  ],
}

export function TooltipDocs() {
  return <DocPage doc={docData} />
}
