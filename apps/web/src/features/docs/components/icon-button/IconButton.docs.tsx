import { DocPage, type DocPageData } from '../DocPage'
import {
    IconButtonBasicPreview,
    IconButtonTonesExample,
    IconButtonSizesExample,
    IconButtonStatesExample,
} from './IconButton.examples'

const docData: DocPageData = {
    title: 'IconButton',
    description:
        'A compact, square button designed exclusively for icon triggers with mandatory accessible labels.',
    importCode: "import { IconButton } from '@monority/ui/icon-button'",
    usageCode: '<IconButton label="Close"><CloseIcon /></IconButton>',
    preview: () => <IconButtonBasicPreview />,
    examples: [
        { title: 'Tones', content: <IconButtonTonesExample /> },
        { title: 'Sizes', content: <IconButtonSizesExample /> },
        { title: 'States', content: <IconButtonStatesExample /> },
    ],
    props: [
        {
            name: 'label',
            type: 'string',
            defaultValue: '-',
            description: 'Required accessible label passed directly to aria-label.',
        },
        {
            name: 'children',
            type: 'ReactNode',
            defaultValue: '-',
            description: 'The icon element to render inside the button.',
        },
        {
            name: 'tone',
            type: "'neutral' | 'accent' | 'danger'",
            defaultValue: "'neutral'",
            description: 'Visual semantic tone of the button.',
        },
        {
            name: 'size',
            type: "'sm' | 'md' | 'lg'",
            defaultValue: "'md'",
            description: 'Dimensions and padding density.',
        },
        {
            name: 'disabled',
            type: 'boolean',
            defaultValue: 'false',
            description: 'Disables user interactions.',
        },
        {
            name: 'loading',
            type: 'boolean',
            defaultValue: 'false',
            description: 'Displays a loading indicator and marks the button busy.',
        },
    ],
    cssHooks: ['.mr-btn', '[data-tone]', '[data-size]'],
    tokens: ['--mr-radius-md', '--mr-space-2', '--mr-space-3', '--mr-border-base'],
    a11y: [
        'Requires a descriptive label prop mapped to aria-label.',
        'Icon contents should have aria-hidden="true" to avoid screen reader clutter.',
        'Visible focus indicator conforms to WCAG 2.4.7.',
    ],
}

export function IconButtonDocs() {
    return <DocPage doc={docData} />
}
