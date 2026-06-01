import { DocPage, type DocPageData } from "../DocPage"
import {
  KbdBasicExample,
  KbdKeysExample,
  KbdSizesExample,
} from './Kbd.examples'

const docData: DocPageData = {
  title: 'Kbd',
  description: 'Keyboard shortcut display component. Renders semantic <kbd> elements for shortcuts and key combinations.',
  importCode: "import { Kbd } from '@monority/ui'",
  usageCode: `<Kbd>Ctrl</Kbd>
<Kbd keys={["Ctrl", "C"]} />
<Kbd size="sm">Esc</Kbd>`,
  preview: () => <KbdBasicExample />,
  examples: [
    { title: 'Keys array', content: <KbdKeysExample /> },
    { title: 'Sizes', content: <KbdSizesExample /> },
  ],
  props: [
    { name: "children", type: "ReactNode", defaultValue: "-", description: "Key label content." },
    { name: "keys", type: "string[]", defaultValue: "-", description: "Array of keys to render with + separators." },
    { name: "size", type: "'sm' | 'md' | 'lg'", defaultValue: "'md'", description: "Size of the kbd element." },
  ],
  cssHooks: [
    '.mr-kbd', '.mr-kbd--sm', '.mr-kbd--md', '.mr-kbd--lg',
    '.mr-kbd__key', '.mr-kbd__separator',
  ],
  tokens: [
    '--mr-font-mono', '--mr-fg-muted', '--mr-bg-surface-strong',
    '--mr-border-subtle', '--mr-radius-xs', '--mr-radius-sm',
    '--mr-text-xs', '--mr-text-sm', '--mr-text-base',
  ],
  a11y: [
    'Native <kbd> element is semantic and announced correctly by screen readers.',
    'Use keys prop for multi-key shortcuts to ensure proper separation.',
  ],
}

export function KbdDocs() {
  return <DocPage doc={docData} />
}
