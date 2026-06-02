import { DocPage, type DocPageData } from '../DocPage'
import {
    CheckboxBasicExample,
    CheckboxDisabledExample,
    CheckboxWithErrorExample,
    CheckboxWithDescriptionExample,
    CheckboxIndeterminateExample,
} from './Checkbox.examples'

const docData: DocPageData = {
    title: 'Checkbox',
    description: 'Selection control for independent choices, bulk actions, and optional settings.',
    importCode: "import { Checkbox } from '@monority/ui'",
    usageCode: `<Checkbox label="Send weekly summary" />
<Checkbox label="Include failed jobs" defaultChecked />`,
    preview: () => <CheckboxBasicExample />,
    examples: [
        { title: 'Disabled', content: <CheckboxDisabledExample /> },
        { title: 'Error state', content: <CheckboxWithErrorExample /> },
        { title: 'With description', content: <CheckboxWithDescriptionExample /> },
        { title: 'Indeterminate', content: <CheckboxIndeterminateExample /> },
    ],
    props: [
        { name: 'label', type: `string`, defaultValue: '-', description: 'Checkbox label.' },
        {
            name: 'checked',
            type: `boolean`,
            defaultValue: 'false',
            description: 'Controlled checked state.',
        },
        { name: 'onChange', type: `function`, defaultValue: '-', description: 'Change callback.' },
    ],
    cssHooks: [
        '.mr-checkbox',
        '.mr-checkbox__control',
        '.mr-checkbox__dot',
        '.mr-checkbox__label',
        '.mr-checkbox__description',
        '[data-size]',
        '[data-disabled]',
        '[data-invalid]',
        '[data-checked]',
        '[data-indeterminate]',
    ],
    tokens: [
        '--mr-accent',
        '--mr-accent-contrast',
        '--mr-border-subtle',
        '--mr-bg-control',
        '--mr-fg-base',
        '--mr-text-sm',
        '--mr-checkbox-size',
    ],
    a11y: [
        'Native checkbox input.',
        'Supports indeterminate mixed state.',
        'Keep the label associated with the input.',
        'Visible focus ring.',
    ],
}

export function CheckboxDocs() {
    return <DocPage doc={docData} />
}
