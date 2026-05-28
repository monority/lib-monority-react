import { DocPage, type DocPageData } from '../DocPage'
import {
  ToolbarBasicExample,
  ToolbarWithButtonsExample,
  ToolbarWithDividerExample,
} from './Toolbar.examples'

const docData: DocPageData = {
  title: 'Toolbar',
  description: "Toolbar wrapper for grouping action controls in a horizontal layout.",
  importCode: "import { Toolbar } from '@monority/ui'",
  usageCode: `<Toolbar>
  <Button>Save</Button>
  <Button variant="ghost">Cancel</Button>
</Toolbar>`,
  preview: () => <ToolbarBasicExample />,
  examples: [
    { title: 'With buttons', content: <ToolbarWithButtonsExample /> },
    { title: 'With divider', content: <ToolbarWithDividerExample /> },
  ],
  props: [
    { name: 'children', type: `ReactNode`, defaultValue: "-", description: "Toolbar content." }
  ],
  cssHooks: [
    '.mr-toolbar', '[data-gap]',
  ],
  tokens: [
    '--mr-space-*', '--mr-border-subtle',
  ],
  a11y: [
    'Toolbar ARIA pattern (role="toolbar").',
    'aria-label for the toolbar.',
    'Focus management.',
  ],
}

export function ToolbarDocs() {
  return <DocPage doc={docData} />
}
