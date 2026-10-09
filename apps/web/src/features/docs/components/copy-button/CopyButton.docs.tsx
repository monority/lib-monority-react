import { DocPage, type DocPageData } from '../DocPage'
import {
    CopyButtonBasicPreview,
    CopyButtonVariantsExample,
    CopyButtonSizesExample,
    CopyButtonCustomFeedbackExample,
    CopyButtonDisabledExample,
} from './CopyButton.examples'

const docData: DocPageData = {
    title: 'CopyButton',
    description:
        'A dedicated action button that copies text to the clipboard with accessible visual feedback.',
    importCode: "import { CopyButton } from '@monority/ui/copy-button'",
    usageCode: '<CopyButton value="https://example.com" label="Share Link" />',
    preview: () => <CopyButtonBasicPreview />,
    examples: [
        { title: 'Variants', content: <CopyButtonVariantsExample /> },
        { title: 'Sizes', content: <CopyButtonSizesExample /> },
        { title: 'Custom Feedback', content: <CopyButtonCustomFeedbackExample /> },
        { title: 'Disabled', content: <CopyButtonDisabledExample /> },
    ],
    props: [
        {
            name: 'value',
            type: 'string',
            defaultValue: '-',
            description: 'The text copied to the clipboard when clicked.',
        },
        {
            name: 'label',
            type: 'string',
            defaultValue: '-',
            description: 'Initial label displayed on the button.',
        },
        {
            name: 'copiedLabel',
            type: 'string',
            defaultValue: "'Copied!'",
            description: 'Label displayed temporarily after copying.',
        },
        {
            name: 'duration',
            type: 'number',
            defaultValue: '2000',
            description: 'Duration in milliseconds for the copied state.',
        },
        {
            name: 'variant',
            type: "'subtle' | 'outline' | 'solid'",
            defaultValue: "'subtle'",
            description: 'Visual presentation variant.',
        },
        {
            name: 'size',
            type: "'sm' | 'md' | 'lg'",
            defaultValue: "'md'",
            description: 'Button size density.',
        },
        {
            name: 'disabled',
            type: 'boolean',
            defaultValue: 'false',
            description: 'Disables button interactions.',
        },
    ],
    cssHooks: ['.mr-btn', '[data-variant]', '[data-size]'],
    tokens: [
        '--mr-bg-accent',
        '--mr-fg-on-accent',
        '--mr-border-base',
        '--mr-radius-md',
        '--mr-space-2',
    ],
    a11y: [
        'Native button element with keyboard activation (Space and Enter).',
        'Clear feedback text upon successful copy.',
        'Accessible focus indicators via focus-visible.',
    ],
}

export function CopyButtonDocs() {
    return <DocPage doc={docData} />
}
