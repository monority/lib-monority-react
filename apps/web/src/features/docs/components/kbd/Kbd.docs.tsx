import { Kbd } from '@monority/ui/kbd'
import { ComponentPlayground } from '../ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import { KbdKeysExample, KbdSizesExample } from './Kbd.examples'

function KbdPlayground() {
    return (
        <ComponentPlayground
            componentName="Kbd"
            controls={[
                {
                    type: 'select',
                    prop: 'size',
                    label: 'Taille (size)',
                    defaultValue: 'md',
                    options: [
                        { value: 'sm', label: 'Petite (sm)' },
                        { value: 'md', label: 'Moyenne (md)' },
                        { value: 'lg', label: 'Grande (lg)' },
                    ],
                },
                {
                    type: 'select',
                    prop: 'shortcut',
                    label: 'Combinaison de touches',
                    defaultValue: 'command-k',
                    options: [
                        { value: 'command-k', label: '⌘ + K' },
                        { value: 'ctrl-shift-p', label: 'Ctrl + Shift + P' },
                        { value: 'escape', label: 'Échap (Esc)' },
                        { value: 'enter', label: 'Entrée (↵)' },
                    ],
                },
            ]}
            renderCode={(props) => {
                if (props.shortcut === 'command-k') {
                    return `<Kbd size="${props.size}" keys={['⌘', 'K']} />`
                }
                if (props.shortcut === 'ctrl-shift-p') {
                    return `<Kbd size="${props.size}" keys={['Ctrl', 'Shift', 'P']} />`
                }
                if (props.shortcut === 'escape') {
                    return `<Kbd size="${props.size}">Esc</Kbd>`
                }
                return `<Kbd size="${props.size}">↵ Enter</Kbd>`
            }}
        >
            {(props) => {
                const size = props.size as 'sm' | 'md' | 'lg'
                if (props.shortcut === 'command-k') {
                    return <Kbd size={size} keys={['⌘', 'K']} />
                }
                if (props.shortcut === 'ctrl-shift-p') {
                    return <Kbd size={size} keys={['Ctrl', 'Shift', 'P']} />
                }
                if (props.shortcut === 'escape') {
                    return <Kbd size={size}>Esc</Kbd>
                }
                return <Kbd size={size}>↵ Enter</Kbd>
            }}
        </ComponentPlayground>
    )
}

const docData: DocPageData = {
    title: 'Kbd',
    description: 'Semantic keyboard key label for shortcuts, command menus, and help text.',
    importCode: "import { Kbd } from '@monority/ui/kbd'",
    usageCode: `<Kbd>Ctrl</Kbd>
<Kbd keys={["Ctrl", "C"]} />
<Kbd size="sm">Esc</Kbd>`,
    playground: <KbdPlayground />,
    preview: () => <KbdPlayground />,
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
