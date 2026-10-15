import { DocPage, type DocPageData } from '../DocPage'
import { KbdBasicExample, KbdKeysExample, KbdSizesExample } from './Kbd.examples'

const docData: DocPageData = {
    title: 'Kbd',
    description: 'Semantic keyboard key label for shortcuts, command menus, and help text.',
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
        {
            name: 'children',
            type: 'ReactNode',
            defaultValue: '-',
            description: 'Single key label.',
        },
        {
            name: 'keys',
            type: 'string[]',
            defaultValue: '-',
            description: 'Ordered shortcut keys rendered with separators.',
        },
        {
            name: 'size',
            type: "'sm' | 'md' | 'lg'",
            defaultValue: "'md'",
            description: 'Key size.',
        },
    ],
    cssHooks: [
        '.mr-kbd',
        '.mr-kbd--sm',
        '.mr-kbd--md',
        '.mr-kbd--lg',
        '[data-size]',
        '.mr-kbd__key',
        '.mr-kbd__separator',
    ],
    tokens: [
        '--mr-font-mono',
        '--mr-text-primary',
        '--mr-bg-surface',
        '--mr-border-subtle',
        '--mr-radius-xs',
        '--mr-radius-sm',
        '--mr-font-size-xs',
        '--mr-font-size-sm',
        '--mr-font-size-sm',
    ],
    a11y: [
        'Renders native <kbd> markup.',
        'Use keys for multi-key shortcuts so combinations stay consistently separated.',
    ],
}

export function KbdDocs() {
    return <DocPage doc={docData} />
}
