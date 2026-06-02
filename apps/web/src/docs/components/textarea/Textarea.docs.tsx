import { DocPage, type DocPageData } from '../DocPage'
import {
    TextareaBasicExample,
    TextareaWithLabelExample,
    TextareaWithErrorExample,
    TextareaDisabledExample,
    TextareaWithCharCountExample,
    TextareaResizableExample,
} from './Textarea.examples'

const docData: DocPageData = {
    title: 'Textarea',
    description: 'Multi-line text input with Field wrapper for label, hint, and error.',
    importCode: "import { Textarea } from '@monority/ui'",
    usageCode: `<Textarea label="Description" rows={5} />`,
    preview: () => <TextareaBasicExample />,
    examples: [
        { title: 'With label', content: <TextareaWithLabelExample /> },
        { title: 'Error state', content: <TextareaWithErrorExample /> },
        { title: 'Disabled', content: <TextareaDisabledExample /> },
        { title: 'Character count', content: <TextareaWithCharCountExample /> },
        { title: 'Resizable', content: <TextareaResizableExample /> },
    ],
    props: [
        { name: 'label', type: `ReactNode`, defaultValue: '-', description: 'Field label.' },
        { name: 'hint', type: `ReactNode`, defaultValue: '-', description: 'Helpful description.' },
        { name: 'error', type: `ReactNode`, defaultValue: '-', description: 'Error message.' },
        {
            name: 'required',
            type: `boolean`,
            defaultValue: 'false',
            description: 'Required field indicator.',
        },
        { name: 'rows', type: `number`, defaultValue: '5', description: 'Number of visible rows.' },
    ],
    cssHooks: ['.mr-textarea', '[data-disabled]', '[data-invalid]', '[data-required]'],
    tokens: [
        '--mr-border-subtle',
        '--mr-bg-control',
        '--mr-fg-base',
        '--mr-fg-muted',
        '--mr-radius-md',
        '--mr-text-sm',
        '--mr-danger',
    ],
    a11y: [
        'Native form element semantics.',
        'Supports disabled/required/aria-invalid.',
        'Visible focus ring.',
        'Associated label for screen readers.',
    ],
}

export function TextareaDocs() {
    return <DocPage doc={docData} />
}
