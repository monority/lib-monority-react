import { DocPage, type DocPageData } from '../DocPage'
import { PreCodeBasicExample, PreCodeSizesExample, PreCodeWrapExample } from './PreCode.examples'

const docData: DocPageData = {
    title: 'PreCode',
    description: 'Preformatted code block with size and wrapping controls.',
    importCode: "import { PreCode } from '@monority/ui/pre-code'",
    usageCode: `<PreCode language="tsx">const value = 1</PreCode>`,
    preview: () => <PreCodeBasicExample />,
    examples: [
        { title: 'Sizes', content: <PreCodeSizesExample /> },
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
    tokens: ['--mr-font-mono', '--mr-text-xs', '--mr-text-sm'],
    a11y: [
        'Renders native <pre><code> markup.',
        'Keep code readable at 375px: prefer wrap for long lines.',
    ],
}

export function PreCodeDocs() {
    return <DocPage doc={docData} />
}
