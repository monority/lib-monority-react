import { DocPage, type DocPageData } from '../DocPage'
import {
    PreCodeBasicExample,
    PreCodeScrollExample,
    PreCodeSizesExample,
    PreCodeWrapExample,
} from './PreCode.examples'

const docData: DocPageData = {
    title: 'PreCode',
    description:
        'Preformatted code block with horizontal scrolling, optional wrapping, and readable theme-aware syntax colors.',
    importCode: "import { PreCode } from '@monority/ui/pre-code'",
    usageCode: `<PreCode language="tsx">const value = 1</PreCode>`,
    preview: () => <PreCodeBasicExample />,
    examples: [
        { title: 'Sizes', content: <PreCodeSizesExample /> },
        { title: 'Horizontal scrolling', content: <PreCodeScrollExample /> },
        { title: 'Wrapping', content: <PreCodeWrapExample /> },
    ],
    props: [
        {
            name: 'children',
            type: 'ReactNode',
            defaultValue: '-',
            description: 'Code text.',
        },
        {
            name: 'language',
            type: 'string',
            defaultValue: '-',
            description: 'Language hint, applied as a language-* class on <code>.',
        },
        {
            name: 'size',
            type: "'sm' | 'md'",
            defaultValue: "'md'",
            description: 'Code block size.',
        },
        {
            name: 'wrap',
            type: 'boolean',
            defaultValue: 'false',
            description: 'Wrap long lines instead of scrolling.',
        },
        {
            name: 'codeClassName',
            type: 'string',
            defaultValue: '-',
            description: 'Additional class for the inner <code> element.',
        },
    ],
    cssHooks: ['.mr-pre-code', '.mr-pre-code--sm', '.mr-pre-code--md', '.mr-pre-code--wrap'],
    tokens: [
        '--mr-font-mono',
        '--mr-text-xs',
        '--mr-text-sm',
        '--mr-space-3',
        '--mr-space-4',
        '--mr-radius-sm',
        '--mr-radius-md',
        '--mr-bg-surface-strong',
        '--mr-fg-base',
        '--mr-code-bg',
        '--mr-code-fg',
        '--mr-code-scrollbar',
        '--mr-code-shadow',
    ],
    a11y: [
        'Renders native <pre><code> markup.',
        'Default mode scrolls long lines horizontally without widening the page.',
        'Use wrap when line wrapping is preferred.',
    ],
}

export function PreCodeDocs() {
    return <DocPage doc={docData} />
}
