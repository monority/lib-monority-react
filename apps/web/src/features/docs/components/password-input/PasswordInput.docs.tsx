import { DocPage, type DocPageData } from '../DocPage'
import {
    PasswordInputBasicPreview,
    PasswordInputSizesExample,
    PasswordInputToggleExample,
    PasswordInputStatesExample,
} from './PasswordInput.examples'

const docData: DocPageData = {
    title: 'PasswordInput',
    description:
        'A specialized text input for passwords with an integrated visibility toggle and field metadata.',
    importCode: "import { PasswordInput } from '@monority/ui/password-input'",
    usageCode: '<PasswordInput label="Password" hint="8+ characters" />',
    preview: () => <PasswordInputBasicPreview />,
    examples: [
        { title: 'Sizes', content: <PasswordInputSizesExample /> },
        { title: 'Visibility Toggle', content: <PasswordInputToggleExample /> },
        { title: 'States', content: <PasswordInputStatesExample /> },
    ],
    props: [
        {
            name: 'label',
            type: 'ReactNode',
            defaultValue: '-',
            description: 'Label rendered above the input.',
        },
        {
            name: 'hint',
            type: 'ReactNode',
            defaultValue: '-',
            description: 'Helpful description rendered below the input.',
        },
        {
            name: 'error',
            type: 'ReactNode',
            defaultValue: '-',
            description: 'Error message that puts the field in an invalid state.',
        },
        {
            name: 'size',
            type: "'sm' | 'md' | 'lg'",
            defaultValue: "'md'",
            description: 'Height and font density.',
        },
        {
            name: 'showToggle',
            type: 'boolean',
            defaultValue: 'true',
            description: 'Controls whether the visibility toggle button is rendered.',
        },
        {
            name: 'disabled',
            type: 'boolean',
            defaultValue: 'false',
            description: 'Disables user interaction and dims the field.',
        },
        {
            name: 'required',
            type: 'boolean',
            defaultValue: 'false',
            description: 'Marks the field as required.',
        },
    ],
    cssHooks: ['.mr-password-input-field', '.mr-password-input', '[data-size]', '[data-invalid]'],
    tokens: [
        '--mr-bg-input',
        '--mr-fg-base',
        '--mr-border-base',
        '--mr-radius-md',
        '--mr-space-2',
        '--mr-space-3',
    ],
    a11y: [
        'Visibility toggle has accessible label toggling between show and hide.',
        'Proper autocomplete default for password managers.',
        'Field labels and error messages connected via aria-describedby.',
    ],
}

export function PasswordInputDocs() {
    return <DocPage doc={docData} />
}
