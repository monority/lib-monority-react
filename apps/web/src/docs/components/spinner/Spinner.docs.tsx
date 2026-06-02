import { DocPage, type DocPageData } from '../DocPage'
import {
    SpinnerBasicExample,
    SpinnerSizesExample,
    SpinnerTonesExample,
    SpinnerWithTextExample,
} from './Spinner.examples'

const docData: DocPageData = {
    title: 'Spinner',
    description:
        'Compact loading indicator for short waits, background actions, and inline status feedback.',
    importCode: "import { Spinner } from '@monority/ui'",
    usageCode: `<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />`,
    preview: () => <SpinnerBasicExample />,
    examples: [
        { title: 'Sizes', content: <SpinnerSizesExample /> },
        { title: 'Tones', content: <SpinnerTonesExample /> },
        { title: 'With text', content: <SpinnerWithTextExample /> },
    ],
    props: [
        {
            name: 'size',
            type: `'sm' | 'md' | 'lg'`,
            defaultValue: "'md'",
            description: 'Size of the spinner.',
        },
        {
            name: 'tone',
            type: `'base' | 'muted' | 'inverse'`,
            defaultValue: "'base'",
            description: 'Color tone of the spinner.',
        },
    ],
    cssHooks: ['.mr-spinner', '.mr-spinner__ring', '[data-size]', '[data-tone]'],
    tokens: ['--mr-accent', '--mr-fg-muted', '--mr-bg-base'],
    a11y: [
        'The component exposes role="status" with an accessible loading label.',
        'Add visible text nearby when the operation needs extra context.',
    ],
}

export function SpinnerDocs() {
    return <DocPage doc={docData} />
}
