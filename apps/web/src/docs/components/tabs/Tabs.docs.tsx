import { DocPage, type DocPageData } from '../DocPage'
import { Tabs } from '@monority/ui'
import { TabsBasicExample } from './Tabs.examples'

const docData: DocPageData = {
  title: 'Tabs',
  description: "A set of layered sections of content that display one panel at a time.",
  importCode: "import { Tabs } from '@monority/ui'",
  usageCode: `const [value, setValue] = useState('tab1')

<Tabs
    items={[
        { value: 'tab1', label: 'Tab 1' },
        { value: 'tab2', label: 'Tab 2' },
    ]}
    value={value}
    onChange={setValue}
/>`,
  preview: () => <TabsBasicExample />,
  props: [
    { name: 'items', type: `{ value: string; label: string }[]`, defaultValue: "[]", description: "Tab definitions" },
    { name: 'value', type: `string`, defaultValue: "-", description: "Currently selected value" },
    { name: 'onChange', type: `(value: string) => void`, defaultValue: "-", description: "Tab change callback" },
    { name: 'tone', type: `'neutral' | 'accent' | 'danger'`, defaultValue: "'neutral'", description: "Visual tone for the active indicator" },
    { name: 'size', type: `'sm' | 'md' | 'lg'`, defaultValue: "'md'", description: "Tab size variant" },
    { name: 'disabled', type: `boolean`, defaultValue: "false", description: "Disables all tabs" },
    { name: 'fullWidth', type: `boolean`, defaultValue: "false", description: "Tabs stretch to fill container width" },
    { name: 'aria-label', type: `string`, defaultValue: "'Tabs'", description: "Accessible label for the tablist" }
  ],
  cssHooks: [
    '.mr-tabs', '.mr-tabs__tab', '.mr-tabs__tab--active',
    '.mr-tabs--neutral', '.mr-tabs--accent', '.mr-tabs--danger',
    '.mr-tabs--full-width', '.mr-tabs--sm', '.mr-tabs--md', '.mr-tabs--lg',
    '[data-tone]', '[data-size]', '[data-disabled]', '[data-full-width]', '[data-active]'
  ],
  tokens: [
    '--mr-border-subtle', '--mr-border-strong', '--mr-fg-muted', '--mr-fg-base',
    '--mr-fg-strong', '--mr-accent', '--mr-danger',
    '--mr-text-xs', '--mr-text-sm', '--mr-text-md',
    '--mr-dur-150', '--mr-ease-in-out'
  ],
  a11y: [
    'Root uses role="tablist" with aria-label.',
    'Each tab uses role="tab" with aria-selected and aria-controls.',
    'Roving tabIndex: active tab is focusable (tabIndex=0), others are -1.',
    'ArrowLeft/Right navigates between tabs.',
    'Home focuses the first tab, End focuses the last tab.',
    'Disabled tabs are not focusable and have data-disabled.'
  ],
}

export function TabsDocs() {
  return <DocPage doc={docData} />
}
